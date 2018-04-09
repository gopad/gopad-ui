var ExtractTextPlugin = require('extract-text-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var Webpack = require('webpack')

module.exports = {
  entry: {
    app: [
      './src/index.js'
    ]
  },

  output: {
    path: require('path').resolve(__dirname, 'dist', 'static'),
    filename: 'assets/scripts/gopad.js',
    publicPath: '/'
  },

  devtool: 'source-map',

  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: [
      '.js',
      '.vue'
    ]
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          "babel-loader"
        ]
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              fallback: 'vue-style-loader',
              use: [
                'css-loader',
                'less-loader'
              ]
            })
          }
        }
      },
      {
        test: /index\.html$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      },
      {
        test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '/assets/fonts/[name].[ext]',
          mimetype: 'application/font-woff'
        }
      },
      {
        test: /\.otf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '/assets/fonts/[name].[ext]',
          mimetype: 'application/x-font-opentype'
        }
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '/assets/fonts/[name].[ext]',
          mimetype: 'image/svg+xml'
        }
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '/assets/fonts/[name].[ext]',
          mimetype: 'application/octet-stream'
        }
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: '/assets/fonts/[name].[ext]',
          mimetype: 'application/vnd.ms-fontobject'
        }
      }
    ]
  },

  plugins: [
    new Webpack.ProvidePlugin({
      'jQuery': 'jquery',
      '$': 'jquery',
      'Tether': 'tether'
    }),
    new ExtractTextPlugin({
      filename: 'assets/styles/gopad.css'
    }),
    new CopyWebpackPlugin([{
      from: 'src/images',
      to: 'assets/images'
    }]),
    new HtmlWebpackPlugin({
      template: 'src/index.html.ejs',
      inject: false,
      minify: {
        html5: true,
        collapseWhitespace: true
      }
    }),
    new Webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(
        process.env.NODE_ENV || 'development'
      )
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'

  module.exports.plugins = (module.exports.plugins || []).concat([
    new Webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      minimize: true,
      output: {
        semicolons: false
      }
    })
  ])
}
