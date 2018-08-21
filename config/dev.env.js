'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ENDPOINT_GET: '"/api/sitecore/dashboard/getsettings"',
  API_ENDPOINT_SUBMIT: '"/api/sitecore/dashboard/submitchanges"',
})
