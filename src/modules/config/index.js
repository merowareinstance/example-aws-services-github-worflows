/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */
const _ = require("lodash");

const { NODE_ENV: nodeEnv } = process.env;

const config = require(`./${nodeEnv}`);

function get(key) {
  return _.get(config, key);
}

function set(key, value) {
  _.set(config, key, value);
}

module.exports = {
  get,
  set,
};
