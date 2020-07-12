const OperationMongo = require("../../mongoose/Operation");

const denormalizeOperation = async (ModelPG, operationID, operation) => {
  // Delete in mongo
  await OperationMongo.deleteOne({ id: operationID });

  if (operation !== "delete") {
    // Get User with association in DB if not delete
    const dbOperation = await ModelPG.findOne({
      where: { id: operationID },
      include: [
        {all: true}
      ],
    });

    // Save in mongo
    const mongoOperation = new OperationMongo(dbOperation.toJSON());
    await mongoOperation.save();
  }
};

module.exports = denormalizeOperation;
