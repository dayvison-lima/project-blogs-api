const express = require('express');
const userController = require('./controllers/user.controller');
const categoryController = require('./controllers/category.controller');
const { createUserMiddleware } = require('./middlewares/createUserMiddleware');
const { validadeJWT, validadeCategoryJWT } = require('./middlewares/validationJWT');

// ...

const app = express();

// não remova ou mova esse endpoint
// commit inicial
app.get('/', (_request, response) => {
  response.send();
});

app.use(express.json());

// ...

app.post('/login', userController.loginController);

app.post('/user', createUserMiddleware, userController.createUser);

app.get('/user', validadeJWT, userController.getUsers);

app.get('/user/:id', validadeJWT, userController.getUserById);

app.post('/categories', validadeCategoryJWT, categoryController.createCategory);

app.get('/categories', validadeJWT, categoryController.getCategories);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
