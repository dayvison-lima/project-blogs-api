const { Category } = require('../models');

const createCategoryService = async (name) => {
    console.log('CONSOLE LOG SERVICE: ', name);

    const newCategory = await Category.create({ name });
    console.log('CONSOLE LOG SERVICE: ', newCategory);
    return newCategory;
};

const getAllCategories = async () => {
    const categories = await Category.findAll();
    return categories;
};

module.exports = {
    createCategoryService,
    getAllCategories,
};