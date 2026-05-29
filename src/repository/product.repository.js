const Product = require("../models/Product");

const create = async (data) => {
    return await Product.create(data);
};

const findAll = async () => {
    return await Product.find();
};

const findById = async (id) => {
    return await Product.findById(id);
};

const update = async (id, data) => {
    return await Product.findByIdAndUpdate(id, data);
};

const remove = async (id) => {
    return await Product.findByIdAndDelete(id);
};

module.exports = {
    create,
    findAll,
    findById,
    update,
    remove
};
