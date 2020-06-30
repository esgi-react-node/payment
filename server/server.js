const express = require("express");
const { Currency } = require("./models/sequelize");
const RouterManager = require("./routes");
const mustacheExpress = require('mustache-express');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname+'/views');

app.use(express.json());

RouterManager(app);

app.listen(3000, () => console.log("listening..."));
