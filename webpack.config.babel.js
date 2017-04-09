const path = require('path')
const webpack = require('webpack')
const extractTextPlugin = require('extract-text-webpack-plugin')

const _project = 'vue-webpack-boilerplate'
const _src = 'src'
const _dist = 'dist'
const _stylesheets = 'stylesheets'
const _static = 'static'

module.exports = {
  entry: {
    app: `./${_src}/main.js`,
    vendor: ['vue', 'axios', 'vue-router', 'bulma', 'font-awesome/scss/font-awesome']
  },
  output: {
    path: path.resolve(__dirname, `./${_dist}`),
    publicPath: `/${_dist}/`,
    filename: 'js/[name].js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      path.join(__dirname, 'node_modules')
    ],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js' , '.scss' , '.vue']
  },
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(sass|scss)$/,
        loader: extractTextPlugin.extract('css-loader?minimize!sass-loader?minimize')
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: `file-loader?name=${_static}/[name].[ext]`
      },
      {
        test: /\.(svg|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
        loader: `file-loader?name=${_static}/[name].[ext]`
      },
      {
        test: /\.woff(\d+)?(\?v=\d+\.\d+\.\d+)?$/,
        loader: `file-loader?name=${_static}/[name].[ext]`
      }
    ]
  },
  plugins: [
      new extractTextPlugin(`${_stylesheets}/[name].css`),
      new webpack.ProvidePlugin({
        Vue: ['vue', 'default']
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      })
  ],
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  devtool: '#source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#eval'
  module.exports.output.publicPath = `/${_project}/${_dist}/`
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin()
  ])
}
