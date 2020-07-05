const MerchantMongo = require("../../mongoose/Merchant");

const denormalizeMerchant = async (ModelPG, merchantID, operation) => {
  // Delete in mongo
  await MerchantMongo.deleteOne({ id: merchantID });

  if (operation !== "delete") {
    // Get User with association in DB if not delete
    const dbMerchant = await ModelPG.findOne({
      where: { id: merchantID },
      include: [
        {all: true}
      ],
    });

    // Save in mongo
    const mongoMerchant = new MerchantMongo(dbMerchant.toJSON());
    await mongoMerchant.save();
  }
};

module.exports = denormalizeMerchant;
