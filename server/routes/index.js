const SecurityRouter = require("./security");
const TransactionRouter = require('./transactions');
const ProcessRouter = require('./proccess');
const MerchantRouter = require('./merchants');
const UserRouter = require("./users");
const verifyToken = require("../middlewares/verifyToken");

const routerManager = (app) => {
  app.use("/", SecurityRouter);
  app.use("/process", ProcessRouter);
  app.use(verifyToken);
  app.use("/users", UserRouter);
  app.use('/transactions', TransactionRouter);
  app.use('/merchants', MerchantRouter);
};

module.exports = routerManager;
