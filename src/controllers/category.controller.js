const { createCategoryService, getAllCategories } = require('../services/category.service');

const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }
    try {
        const category = await createCategoryService(name);
        return res.status(201).json(category);
    } catch (error) {
        console.log(error);
    }
};

const getCategories = async (_req, res) => {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
};

module.exports = {
    createCategory,
    getCategories,
};