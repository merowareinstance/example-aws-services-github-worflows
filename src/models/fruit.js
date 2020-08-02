const Joi = require("joi");

module.exports = (db) =>
  db.define("Fruit", {
    hashKey: "type",
    timestamps: true,
    schema: {
      type: Joi.string(),
      name: Joi.string(),
      color: Joi.string(),
    },
    tableName: "fruit",
  });
