'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ENDPOINT_GET: '"https://saasxm.xcentium.com/api/sitecore/dashboard/getsettings"',
  API_ENDPOINT_SAVE: '"https://saasxm.xcentium.com/api/sitecore/dashboard/savechanges"'
})
