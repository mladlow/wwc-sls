'use strict';

const utils = require('./utils');

module.exports.hello = async (event, context) => {
  return await utils.getUrls();
};
