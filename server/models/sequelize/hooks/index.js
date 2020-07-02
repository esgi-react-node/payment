const denormalize = require("./denormalizationTransaction");
const Address = require("../Address");
const Merchant = require("../Merchant");
const Transaction = require("../Transaction");


const onHookMerchant = (merchant) => denormalize(Transaction, merchant.transaction.id);
Merchant.addHook("afterCreate", onHookMerchant);
Merchant.addHook("afterUpdate", onHookMerchant);
Merchant.addHook("afterDestroy", onHookMerchant);