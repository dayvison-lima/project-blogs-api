const { Category } = require('../models');

const createCategoryService = async (name) => {
    console.log('CONSOLE LOG SERVICE: ', name);

    const newCategory = await Category.create({ name });
    console.log('CONSOLE LOG SERVICE: ', newCategory);
    return newCategory;
};

module.exports = {
    createCategoryService,
};