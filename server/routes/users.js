const express = require("express");
const User = require("../models/sequelize/User");
const { Op } = require("sequelize");
const handleValidationError = require("../helpers/handleValidationError");
const router = express.Router();

// CGET
router.get("/", (req, res) => {

  User.findAll({
    paranoid: false,
  })
    .then((data) => res.render('payment'))
    .catch((err) => res.sendStatus(500));
});

// GET
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id)
    .then((data) => (data ? res.json(data) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
});

// PUT
router.put("/:id", (req, res) => {
  User.update(req.body, { returning: true, where: { id: req.params.id } })
    .then(([nbUpdated, result]) =>
      nbUpdated ? res.json(result[0]) : res.sendStatus(404)
    )
    .catch((error) => {
      handleValidationError(res, error);
    });
});

// DELETE
router.delete("/:id", (req, res) => {
  User.destroy({
    where: { id: req.params.id },
  })
    .then((data) => (data ? res.sendStatus(204) : res.sendStatus(404)))
    .catch((err) => res.sendStatus(500));
});

module.exports = router;
