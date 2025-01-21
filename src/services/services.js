import mongoose from 'mongoose';
import { BadRequestError, NotFoundErrors } from '../errors/customErrors.js';

export default class Services {
  constructor(Repository) {
    this.repository = Repository;
  }

  async getAll() {
    const resources = await this.repository.getAll();
    if (!resources || resources.length === 0) {
      throw new NotFoundErrors('No resources found.');
    }
    return resources;
  }

  async getById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`The provided ID is not in a valid format`);
    }

    const resource = await this.repository.getById(id);
    if (!resource) {
      throw new NotFoundErrors(`Resource with ID ${id} not found`);
    }
    return resource;
  }

  async create(newResourceData) {
    const newResource = await this.repository.create(newResourceData);
    if (!newResource) {
      throw new Error('Failed to create the resource.');
    }

    return newResource;
  }

  async update(id, updatedData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`The provided ID is not in a valid format.`);
    }

    const resource = await this.repository.getById(id);
    if (!resource) {
      throw new NotFoundErrors(`Resource with ID ${id} not found.`);
    }

    const updatedResource = await this.repository.update(id, updatedData);
    if (!updatedResource) {
      throw new Error(`Failed to update resource with ID ${id}`);
    }

    return updatedResource;
  }

  async delete(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new BadRequestError(`The provided ID is not in a valid format`);
    }

    const result = await this.repository.delete(id);
    if (!result) {
      throw new NotFoundErrors(`Resource with ID ${id} not found`);
    }

    return result;
  }

  async deleteAll() {
    const result = await this.repository.deleteAll();
    if (!result || result.deletedCount === 0) {
      throw new NotFoundErrors('No resources found to delete.');
    }
    return result;
  }
}
