const express = require("express");
const TransactionMongo = require('../models/mongoose/Transaction');
const router = express.Router();


router.get("/", async (req, res) => {
   const averageTransaction = await TransactionMongo.aggregate([
        {$group:{_id:null,countAmount:{$sum:1},avgAmount: {$avg:'$amount'}}}
    ]) 
      .then(res.json(averageTransaction))
      .catch(err => {
        console.error(err);
        res.sendStatus(500);
      }) 
  })

module.exports = router;