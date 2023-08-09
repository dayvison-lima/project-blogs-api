const { createCategoryService } = require('../services/category.service');

const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: '"name" is required' });
    }
    try {
        console.log('CONSOLE LOG CONTROLLER: ', name);
        const category = await createCategoryService(name);
        return res.status(201).json(category);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createCategory,
};