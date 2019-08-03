const DbService = require('./db.service');

module.exports = class DbModelService {
  constructor(modelName) {
    if (!modelName) {
      throw new ReferenceError('ERR_MODEL_NAME_NOT_PROVIDED');
    }

    this._DbProvider = DbService;
    this._model = this._getRepository(modelName);
    this._modelName = modelName;
    this._CONSTANTS = {
      DEFAULT_SKIP: 0,
      DEFAULT_LIMIT: 20,
      MAX_LIM: 100,
    };
  }

  _getRepository(modelName) {
    return this._DbProvider.models(modelName);
  }

  _mapQueryOptions(options) {
    return {
      lean: !!(options && options.lean),
      select: options.select || '',
      skip: options.skip || this._CONSTANTS.DEFAULT_SKIP,
      limit: (options.limit && options.limit <= this._CONSTANTS.MAX_LIM) ? options.limit : this._CONSTANTS.DEFAULT_LIMIT,
      populate: options.populate || '',
      sort: options.sort || 'desc',
    };
  }

  createOne(data) {
    return new this._model(data).save();
  }

  findOne(query, options = {}) {
    const queryOptions = this._mapQueryOptions(options);
    return this._model.findOne(query).populate(queryOptions.populate).select(queryOptions.select).lean(queryOptions.lean);
  }

  findById(id, options = {}) {
    if (!id) {
      throw new ReferenceError('ERR_ID_NOT_PROVIDED');
    }

    const queryOptions = this._mapQueryOptions(options);

    return this._model.findById(id).populate(queryOptions.populate).select(queryOptions.select).lean(queryOptions.lean);
  }

  findMany({ query = {}, options = {} } = {}) {

    const queryOptions = this._mapQueryOptions(options);

    return this._model
      .find(query)
      .sort(queryOptions.sort)
      .limit(Number(queryOptions.limit))
      .skip(Number(queryOptions.skip))
      .populate(queryOptions.populate)
      .select(queryOptions.select)
      .lean(queryOptions.lean);
  }

  updateOne(updateData, { query = {}, options = {} }) {
    const mappedOptions = { ...options, new: true };
    return this._model.findOneAndUpdate(query, updateData, mappedOptions);
  }

  updateById(id, updateData, options) {
    if (!id) {
      throw new ReferenceError('ERR_ID_NOT_PROVIDED');
    }

    const mappedOptions = { ...options, new: true };

    return this._model.findOneAndUpdate({ _id: id }, updateData, mappedOptions);
  }
};
