const { BlogPost, Category, User } = require('../models');

const createPostService = async (title, content, userId, categoryIds) => {
    const allCategories = await Category.findAll({
        where: {
            id: categoryIds,
        },
    });

    if (allCategories.length !== categoryIds.length) {
        throw new Error('One or more "categoryIds" not found');
    }

    const newPost = await BlogPost.create({
        title,
        content,
        userId,
    });

    await newPost.addCategories(allCategories);
    return newPost;
};

const getPostService = async () => {
    const posts = await BlogPost.findAll({
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } },
            { model: Category, as: 'categories', through: { attributes: [] } },
        ],
    });
    return posts;
};

module.exports = {
    createPostService,
    getPostService,
};