const createToken = require("../lib/auth").createToken;
const express = require("express");
const router = express.Router();
const User = require("../models/sequelize/User");
const bcrypt = require("bcryptjs");
const handleValidationError = require("../helpers/handleValidationError");

// POST
router.post("/login_check", (req, res) => {
  const { username, password } = req.body;

  User.findOne({
    where: { username },
  })
    .then((data) => {
      if (!data) {
        return Promise.reject("invalid");
      } else {
        return bcrypt.compare(password, data.password).then((valid) => {
          if (!valid) {
            return Promise.reject("invalid");
          } else {
            return Promise.resolve(data);
          }
        });
      }
    })
    .then((user) =>
      createToken({ username: user.username }).then((token) =>
        res.json({ user, token })
      )
    )
    .catch((err) =>
      err === "invalid"
        ? res.send(400).json({
            username: "Invalid credentials",
            password: "Invalid credentials",
          })
        : res.sendStatus(500)
    );
});

// POST
router.post("/users", (req, res) => {
  User.create(req.body)
    .then((user) => res.status(201).json(user))
    .catch((err) => handleValidationError(res, err));
});

module.exports = router;
