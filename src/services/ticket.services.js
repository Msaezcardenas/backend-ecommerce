import Services from './services.js';
import TicketRepository from '../repositories/ticket.repository.js';
import { generateUniqueCode } from '../utils/utils.js';

const ticketRepository = new TicketRepository();

export default class TicketService extends Services {
  constructor() {
    super(ticketRepository);
  }

  async createTicket(purchaseData) {
    try {
      const { amount, purchaser } = purchaseData;
      const code = generateUniqueCode();

      // Crear el ticket con los datos proporcionados
      const ticket = {
        code,
        purchase_datetime: new Date(),
        amount,
        purchaser,
      };
      await this.repository.create(ticket);
      return ticket;
    } catch (error) {
      throw new Error('Error al crear el ticket: ' + error.message);
    }
  }
}
