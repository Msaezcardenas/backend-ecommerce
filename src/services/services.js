export default class Services {
  constructor(Repository) {
    this.repository = Repository;
  }

  async getAll() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  async getById(id) {
    try {
      return await this.repository.getById(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async create(obj) {
    try {
      return await this.repository.create(obj);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, obj) {
    try {
      return await this.repository.update(id, obj).populate('products.product');
    } catch (error) {
      throw new Error(error);
    }
  }

  async delete(id) {
    try {
      return await this.repository.delete(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteAll() {
    try {
      return await this.repository.deleteAll();
    } catch (error) {
      throw new Error(error);
    }
  }
}
