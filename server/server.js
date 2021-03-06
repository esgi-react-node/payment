const express = require("express");
const { Currency } = require("./models/sequelize");
const mongo = require("./lib/db");
const RouterManager = require("./routes");
const mustacheExpress = require('mustache-express');
const cors = require('cors');

const app = express();

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views', __dirname+'/views');

app.use(express.json());
app.use(express.urlencoded())

app.use('/assets', express.static(__dirname + '/assets'));
app.use(cors());
RouterManager(app);

app.listen(3000, () => console.log("listening..."));
