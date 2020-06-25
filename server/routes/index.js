const SecurityRouter = require("./security");
const verifyToken = require("../middlewares/verifyToken");

const routerManager = (app) => {
  app.use("/", SecurityRouter);
  app.use(verifyToken);

};

module.exports = routerManager;
