const MerchantMongo = require("../../Merchant");
const Address = require("../Address");

const denormalizeMerchant = async (ModelPG, merchantID, operation) => {
  // Delete in mongo
  await MerchantMongo.deleteOne({ id: merchantID });

  if (operation !== "delete") {
    // Get User with association in DB if not delete
    const dMerchant = await ModelPG.findOne({
      where: { id: merchantID },
      include: [
        {all: true}
      ],
    });
    console.log("START :");
    console.log(dMerchant);
    console.log("END !!!!!!!");
    // Save in mongo
    const mMerchant = new MerchantMongo(dMerchant.toJSON());
    await mMerchant.save();
  }
};

module.exports = denormalizeMerchant;
