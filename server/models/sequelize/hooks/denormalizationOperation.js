const OperationMongo = require("../../Operation");
const Rate = require("../Rate");
const Transaction = require("../Transaction");

const denormalizeOperation = async (ModelPG, operationID, operation) => {
  // Delete in mongo
  console.log("entite:"+ModelPG + " operationID"+operationID + " operation"+operation);
  await OperationMongo.deleteOne({ id: operationID });

  if (operation !== "delete") {
    // Get User with association in DB if not delete
    const dOperation = await ModelPG.findOne({
      where: { id: operationID },
      include: [
        {all: true}
      ],
    });
    console.log("************ PG :");
    console.log(dOperation);
    // Save in mongo
    const mOperation = new OperationMongo(dOperation.toJSON());
    await mOperation.save();
  }
};

module.exports = denormalizeOperation;
