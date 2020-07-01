const SecurityRouter = require("./security");
const TransactionRouter = require('./transactions');
const ProcessRouter = require('./proccess');
const MerchantRouter = require('./merchants');
const verifyToken = require("../middlewares/verifyToken");

const routerManager = (app) => {
  app.use("/", SecurityRouter);
  // app.use(verifyToken);
  app.use("/process", ProcessRouter);
  app.use('/transactions', TransactionRouter);
  app.use('/merchants', MerchantRouter);
};

module.exports = routerManager;
