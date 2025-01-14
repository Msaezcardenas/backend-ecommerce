import Services from './services.js';
import CartRepostory from '../repositories/cart.repository.js';
import ProductRepository from '../repositories/product.repository.js';
import TicketService from './ticket.services.js';
import { transport } from '../../servicesEmail.js';
import { __dirname } from '../utils/utils.js';

const productRepository = new ProductRepository();
const ticketService = new TicketService();
const cartRepository = new CartRepostory();

export default class CartService extends Services {
  constructor() {
    super(cartRepository);
  }

  async addProductToCart(params) {
    const { id_user, id_product, quantity } = params;
    // Obtener el carrito del usuario (si no tiene, se crea uno)
    let cart = await this.repository.findCartByUserId(id_user);
    if (!cart) {
      cart = await this.repository.create({ user: id_user, products: [] });
    }
    // Verificar si el producto ya está en el carrito
    const productIndex = cart.products.findIndex((p) => p.product.toString() === id_product);

    if (productIndex > -1) {
      // Si el producto ya existe en el carrito, aumentar la cantidad
      cart.products[productIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agregarlo
      cart.products.push({ product: id_product, quantity });
    }
    return await this.repository.updateCart(cart._id, { products: cart.products });
  }

  async updateCart(req, res) {
    const { cid, pid } = req;
    const cartFinded = await this.repository.getById(cid);
    if (!cartFinded) res.status(404).json({ message: 'error' });
    const indexProd = cartFinded.products.findIndex((prod) => prod._id.toString() === pid);
    // Si el  producto no  existe se agrega
    if (indexProd === -1) {
      cartFinded.products.push({ product: pid, quantity: 1 });
    } else {
      // si existe se aumenta la  cantidad
      cartFinded.products[indexProd] = {
        product: cartFinded.products[indexProd].product,
        quantity: cartFinded.products[indexProd].quantity + 1,
      };
    }
    const cartUpdated = await this.repository.getPopulatedCartById(cid, cartFinded);
    return cartUpdated;
  }

  async purchase(cid) {
    try {
      const cart = await this.repository.getPopulatedCartById(cid);

      if (!cart) {
        throw new Error('Carrito no encontrado');
      }
      const productsToPurchase = [];
      const unavailableProducts = [];

      // 2. Recorrer productos del carrito y verificar el stock
      for (const item of cart.products) {
        const product = item.product;
        const quantity = item.quantity;

        if (product.stock >= quantity) {
          // 3. Si hay stock suficiente, agregar a la lista de productos comprados
          productsToPurchase.push({
            product: product._id,
            quantity,
            price: product.price,
          });
          // Restar la cantidad del stock
          product.stock -= quantity;

          const updatedProduct = { ...item.product, stock: product.stock };
          await productRepository.update(item.product.id, updatedProduct);
        } else {
          // 4. Si no hay suficiente stock, agregar a la lista de productos no disponibles
          unavailableProducts.push(product._id);
        }
      }

      // Generar ticket si hay productos comprados
      if (productsToPurchase.length > 0) {
        const totalAmount = productsToPurchase.reduce((acc, item) => acc + item.price * item.quantity, 0);

        // Llamar al servicio de tickets para crear el ticket
        const ticket = await ticketService.createTicket({
          amount: totalAmount,
          purchaser: cart.user.email,
        });

        // Filtrar los productos que no pudieron comprarse del carrito
        cart.products = unavailableProducts.map((productId) => cart.products.find((item) => item.product._id.equals(productId)));

        await this.sendMail(ticket);

        return { ticket, unavailableProducts };
      } else {
        return 'no hay stock';
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async sendMail(ticket) {
    const { purchase, amount } = ticket;
    try {
      await transport.sendMail({
        from: 'Ticket de Compra <msaezcardenas@gmail.com>',
        to: `${purchase}`,
        subject: 'Compra Exitosa!',
        html: `
        <div> 
            <p> Tu compra fue exitosa </p>
            <p> Total: ${amount} </p>
            <img src="cid:vegan-felino" width="200" height="200" />
        </div>
    `,
        attachments: [
          {
            filename: 'logo-vegan-felino.png',
            path: __dirname + '/images/logo-vegan-felino.png',
            cid: 'vegan-felino',
          },
        ],
      });
      return 'mensaje enviado!';
    } catch (error) {
      throw new Error(error);
    }
  }
}
