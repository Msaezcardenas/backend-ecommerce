import { createResponse } from '../utils/utils.js';

export default class BaseController {
  constructor(service) {
    this.service = service;
  }

  getAll = async (req, res, next) => {
    try {
      const resources = await this.service.getAll();
      createResponse(res, 200, resources, 'Resources retrieved successfully.');
    } catch (error) {
      next(error);
    }
  };

  getById = async (req, res, next) => {
    try {
      const { id } = req.params;
      const data = await this.service.getById(id);
      createResponse(res, 200, data, `Resource with ID ${id} retrieved successfully.`);
    } catch (error) {
      next(error);
    }
  };

  create = async (req, res, next) => {
    try {
      const newResourceData = req.body;
      const newResource = await this.service.create(newResourceData);
      createResponse(res, 201, newResource, 'Resource has been successfully created.');
    } catch (error) {
      next(error);
    }
  };

  update = async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      const updatedResource = await this.service.update(id, updatedData);
      createResponse(res, 200, updatedResource, `The resource with ID ${id} has been successfully updated.`);
    } catch (error) {
      next(error);
    }
  };

  delete = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      createResponse(res, 200, null, `The resource with the provided ${id} has been successfully deleted`);
    } catch (error) {
      next(error);
    }
  };

  deleteAll = async (req, res, next) => {
    try {
      const result = await this.service.deleteAll();
      createResponse(res, 200, result, 'All resources have been successfully deleted.');
    } catch (error) {
      next(error);
    }
  };
}
