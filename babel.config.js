/*
  https://goo.gl/5o9cw9 - Jest & Babel.

  This Babel config file is for testing.
  Webpack contains babel configs for running the app.

  Need these packages:
    * babel-jest
    * babel-core@^7.0.0-bridge.0
    * regenerator-runtime
*/


module.exports = function(api) {
  const presets = ['@babel/preset-env', '@babel/preset-react']
  const plugins = [
    '@babel/plugin-proposal-object-rest-spread', // https://goo.gl/LCHWnP
    '@babel/plugin-proposal-class-properties', // https://goo.gl/TE6TyG
    '@babel/plugin-syntax-dynamic-import' // https://goo.gl/ho4CDh
  ]

  api.cache(false)

  return {
    presets,
    plugins
  }
}
