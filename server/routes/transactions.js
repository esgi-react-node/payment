const express = require("express");
const Transaction = require("../models/sequelize/Transaction");
const handleValidationError = require("../helpers/handleValidationError");
const { Currency } = require("../models/sequelize");
const router = express.Router();

// CGET
router.get("/", (req, res) => {
  Transaction.findAll({
    paranoid: false
  })
    .then((data) => res.json(data))
    .catch((err) => res.sendStatus(500));
});

// POST
router.post("/", async (req, res) => {
  const {amount, tag, currency, merchantId} = req.body;
  const dbCurrency = await Currency.findOne({where:{base: currency}});
  const transaction = {
    amount,
    tag,
    currency: dbCurrency.id,
    merchant: parseInt(merchantId)
  }
  Transaction.create(transaction)
    .then((data) => res.status(201).json(data))
    .catch((error) => {
      handleValidationError(res, error);
    });
});

// // GET
// router.get("/:id", (req, res) => {
//   Article.findByPk(req.params.id)
//     .then((data) => (data ? res.json(data) : res.sendStatus(404)))
//     .catch((err) => res.sendStatus(500));
// });

// // PUT
// router.put("/:id", (req, res) => {
//   Article.update(req.body, { returning: true, where: { id: req.params.id } })
//     .then(([nbUpdated, result]) =>
//       nbUpdated ? res.json(result[0]) : res.sendStatus(404)
//     )
//     .catch((error) => {
//       handleValidationError(res, error);
//     });
// });

// // DELETE
// router.delete("/:id", (req, res) => {
//   Article.destroy({
//     where: { id: req.params.id },
//   })
//     .then((data) => {
//       console.log(data);
//       return data ? res.sendStatus(204) : res.sendStatus(404)
//     })
//     .catch((err) => res.sendStatus(500));
// });

module.exports = router;
