const express = require("express");
const TransactionMongo = require('../models/mongoose/Transaction');
const MerchantMongo = require('../models/mongoose/Merchant');
const { response } = require("express");
const router = express.Router();


router.get("/", async (req, res) => {
  try{
    //Average amount by transaction
    // Will return : [ { _id: null, countAmount: 2, avgAmount: 625 } ]
    const averageTransaction = await TransactionMongo.aggregate([
      {$group:{_id:null,countAmount:{$sum:1},avgAmount: {$avg:'$amount'}}}
    ])
    //Count merchant
    // Will return: [ { _id: null, countMerchant: 1 } ]
    const countMerchant = await MerchantMongo.aggregate([
      {$group:{_id:null, countMerchant:{$sum:1}}}
    ])
    //Count transaction by merchant
    // Will return : [ { _id: 'marchant', countTransactionByMerchant: 2 } ]
    const averageTransactionByMerchant = await TransactionMongo.aggregate([
      {$group:{_id:'$Merchant.name', countTransactionByMerchant:{$sum:1}}}
    ])
    //Average amount transaction by merchant
    // Will return : [ { _id: 'marchant', avgAmountByMerchant: 625 } ]
    const averageAmountByMerchant = await TransactionMongo.aggregate([
      {$group:{_id:'$Merchant.name', avgAmountByMerchant:{$avg:'$amount'}}}
    ])
    console.log(res.json({averageTransaction,countMerchant,averageTransactionByMerchant,averageAmountByMerchant}));
  } catch(e){
    res.sendStatus(500);
  }
  });
  
  module.exports = router;