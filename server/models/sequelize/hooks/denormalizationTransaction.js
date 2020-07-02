const TransactionMongo = require("../../Transaction");
const Merchant = require("../Merchant");
const Address = require("../Address");

const denormalize = async (ModelPG, transactionID, operation) => {
  // Delete in mongo
  console.log(transactionID);
  await TransactionMongo.deleteOne({ id: transactionID });

  if (operation !== "delete") {
    // Get User with association in DB if not delete
    const dtransaction = await ModelPG.findOne({
      where: { id: transactionID },
      include: [
        Merchant,
        { model: Address, as: "billing" },
        { model: Address, as: "shipping" },
      ],
    });
    console.log(dtransaction);
    // Save in mongo
    const mTransaction = new TransactionMongo(dtransaction.toJSON());

    await mTransaction.save();
  }
};

module.exports = denormalize;
