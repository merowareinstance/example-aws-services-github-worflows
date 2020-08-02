/**
 * Setup dynamo tables
 * NOTE: Should be setup for parallization similar to how we did with mysql example
 * Use any ORM or DynamoDb client for db connection. It all depends on yoru team.
 */

const dynogels = require("dynogels");
const models = require("../models");
const config = require("./config");

const awsConfig = config.get("aws.config");
dynogels.AWS.config.update(awsConfig);

dynogels.models = {};

// Initialize all models
Object.keys(models).forEach((key) => {
  dynogels.models[key] = models[key](dynogels);
});

module.exports = dynogels;
