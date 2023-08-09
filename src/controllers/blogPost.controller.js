const jwt = require('jsonwebtoken');
const { createPostService, getPostService } = require('../services/blogPost.service');

const extractUserIdFromToken = (token) => {
    try {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET || 'senha');
      if (decodedToken && decodedToken.data) {
        return decodedToken.data;
      }
      return null;
    } catch (error) {
      return null;
    }
  };

const createPost = async (req, res) => {
    try {
        const { title, content, categoryIds } = req.body;
        const token = req.headers.authorization.split(' ')[1]; // Extraia o token do cabeçalho
        const userId = extractUserIdFromToken(token);

        if (!title || !content || !categoryIds) {
            return res.status(400).json({ message: 'Some required fields are missing' });
          }

        const newPost = await createPostService(title, content, userId, categoryIds);
        return res.status(201).json(newPost);
    } catch (error) {
        console.log(error);
    }
};

const getAllPosts = async (req, res, next) => {
   try {
    const posts = await getPostService();
    return res.status(200).json(posts);
   } catch (error) {
    next(error);
   }
};

module.exports = {
    createPost,
    getAllPosts,
};