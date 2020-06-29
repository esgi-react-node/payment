const express = require("express");
const { Currency } = require("./models/sequelize");
const RouterManager = require("./routes");
const app = express();

app.use(express.json());

RouterManager(app);

app.listen(3000, () => console.log("listening..."));
