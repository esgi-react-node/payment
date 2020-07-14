const SecurityRouter = require("./security");
const TransactionRouter = require('./transactions');
const ProcessRouter = require('./proccess');
const MerchantRouter = require('./merchants');
const UserRouter = require("./users");
const DashboardRouter = require("./dashboard");
const verifyToken = require("../middlewares/verifyToken");
const verifiyMerchant = require("../middlewares/merchantAuthentication");

const routerManager = (app) => {

  app.use("/", SecurityRouter);
  app.use("/process", ProcessRouter);
  app.use(verifyToken);
  app.use("/users", UserRouter);
  app.use('/merchants', MerchantRouter);
  app.use('/dashboard',DashboardRouter);
  app.use(verifiyMerchant);
  app.use('/transactions', TransactionRouter);
};

module.exports = routerManager;
