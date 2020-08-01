const {
  DynamoDbSchema,
  DynamoDbTable,
  embed,
} = require("@aws/dynamodb-data-mapper");
const { v4 } = require("uuid");
const FruitMetdata = require("./fruitMetadata");
const Fruit = require("./fruit");
const FruitMetadata = require("./fruitMetadata");

Object.defineProperty(FruitMetdata.prototype, DynamoDbSchema, {
  value: {
    draft: { type: "Boolean" },
    tags: {
      type: "Set",
      memberType: "String",
    },
  },
});

Object.defineProperties(Fruit.prototype, {
  [DynamoDbTable]: {
    value: "Fruits",
  },
  [DynamoDbSchema]: {
    value: {
      id: {
        type: "String",
        keyType: "HASH",
        defaultProvider: v4,
      },
      createdAt: {
        type: "Date",
        keyType: "RANGE",
      },
      authorUsername: { type: "String" },
      title: { type: "String" },
      metadata: embed(FruitMetadata),
    },
  },
});

module.exports = Fruit;
