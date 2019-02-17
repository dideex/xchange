const {injectBabelPlugin} = require('react-app-rewired')
const rewireMobx = require('react-app-rewire-mobx')
const webpackBundleAnalyzer = require('react-app-rewire-webpack-bundle-analyzer')

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', {libraryName: 'antd', style: true}], config)
  config = injectBabelPlugin('babel-plugin-styled-components', config)
  config = injectBabelPlugin('emotion', config)
  config = rewireMobx(config, env)
  if (env === 'production') {
    config = webpackBundleAnalyzer(config, env, {
      analyzerMode: 'static',
      reportFilename: 'report.html',
    })
  }

  return config
}
