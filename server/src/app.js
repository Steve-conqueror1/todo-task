const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const { routes } = require('./routes');

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/todostask');

app.use(cors('*'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes.forEach((item) => {
  app.use(`/api/v1/${item}`, require(`./routes/${item}`));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);
console.log(`Server running at ${PORT}`);
