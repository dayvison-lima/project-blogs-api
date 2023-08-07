const express = require('express');
const userController = require('./controllers/user.controller');

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

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
