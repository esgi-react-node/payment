const TransactionMongo = require("../../Transaction");
const Merchant = require("../Merchant");

const denormalize = async (ModelPG, transactionID, operation) => {
  // Delete in mongo
  await TransactionMongo.deleteOne({ id: transactionID });

  if (operation !== "delete") {
    // Get User with association in DB if not delete
    const dTransaction = await ModelPG.findOne({
      where: { id: transactionID },
      include: [
        Merchant
      ],
    });

    // Save in mongo
    const mTransaction = new TransactionMongo(dTransaction.toJSON());
    
    await mTransaction.save();
  }
};

module.exports = denormalize;
