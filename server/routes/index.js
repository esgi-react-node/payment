const SecurityRouter = require("./security");
const TransactionRouter = require('./transactions');
const verifyToken = require("../middlewares/verifyToken");

const routerManager = (app) => {
  app.use("/", SecurityRouter);
  // app.use(verifyToken);
  app.use('/transactions', TransactionRouter)
};

module.exports = routerManager;
