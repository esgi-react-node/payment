const denormalize = require("./denormalizationTransaction");
const Transaction = require("../Transaction");
const Merchant = require("../Merchant");

const onHookMerchant = (merchant) => denormalize(Transaction, merchant.transaction.id);
Merchant.addHook("afterCreate", onHookMerchant);
Merchant.addHook("afterUpdate", onHookMerchant);
Merchant.addHook("afterDestroy", onHookMerchant);