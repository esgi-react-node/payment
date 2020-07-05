const OperationMongo = require("../../Operation");
const Rate = require("../Rate");
const Transaction = require("../Transaction");

const denormalize = async (ModelPG, operationID, operation) => {
  // Delete in mongo
  await OperationMongo.deleteOne({ id: operationID });

  if (operation !== "delete") {
    // Get User with association in DB if not delete
    const dOperation = await ModelPG.findOne({
      where: { id: operationID },
      include: [
        Transaction,
        Rate     
      ],
    });
    // Save in mongo
    const mOperation = new OperationMongo(dOperation.toJSON());

    await mOperation.save();
  }
};

module.exports = denormalize;
