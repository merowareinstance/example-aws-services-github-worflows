const Joi = require("joi");

module.exports = (db) =>
  db.define("Tree", {
    hashKey: "type",
    timestamps: true,
    schema: {
      age: Joi.number(),
      type: Joi.string(),
    },
    tableName: "tree",
  });
