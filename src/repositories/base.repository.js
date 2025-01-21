export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async getAll() {
    return await this.model.find({});
  }

  async getById(id) {
    return await this.model.findById(id);
  }

  async getByEmail(email) {
    return await this.model.findOne({ email });
  }

  async create(obj) {
    return await this.model.create(obj);
  }

  async update(id, obj) {
    return await this.model.findByIdAndUpdate(id, obj, { new: true });
  }

  async delete(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async deleteAll() {
    return await this.model.deleteMany({});
  }
}
