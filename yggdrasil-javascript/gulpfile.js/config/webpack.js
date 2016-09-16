var config = require("../config");
var webpack = require("webpack");
var AssetsPlugin = require("assets-webpack-plugin");
var path = require("path");

module.exports = function (env) {
  var webpackConfig = {
    context: config.jsSource,

    entry: {
      "page/basic": ["./page/basic.js"],
      "page/login": ["./page/login.js"],
      "page/game-window": ["./page/game-window.js"],
      "page/admin/dashboard": ["./page/admin/dashboard.js"],
      "page/phaser-tutorial": ["./page/phaser-tutorial.js"],
      "page/websocket-tutorial": ["./page/websocket-tutorial.js"],
    },

    output: {
      path: config.jsTarget,
      filename: "[name].[hash].js",
      chunkFilename: "[name].[id].[chunkhash].js"
    },

    plugins: [
      new webpack.optimize.OccurenceOrderPlugin(true),
      new AssetsPlugin({
        path: config.classpathTarget,
        filename: "assets.json"
      }), new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery"
      })
    ],

    resolve: {
      extensions: ["", ".js"],
      root: config.jsSource,
      alias: {
        "phaser-shim": "vendor/phaser-shim",
        "modernizr$": path.resolve(config.vendorSource, "modernizr/modernizrrc.json")
      }
    },

    node: {
      fs: "empty",
      net: "empty",
      tls: "empty"
    },

    module: {
      loaders: [
        {
          test: /modernizrrc.json$/,
          loader: "modernizr"
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader"
        },
        {
          test: /\.woff(\?.*)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.woff2(\?.*)?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff"
        },
        {
          test: /\.ttf(\?.*)?$/,
          loader: "file-loader?name=/fonts/[hash].[ext]"
        },
        {
          test: /\.eot(\?.*)?$/,
          loader: "file-loader?name=/fonts/[hash].[ext]"
        }, {
          test: /\.svg(\?.*)?$/,
          loader: "file-loader?name=images/[hash].[ext]"
        },
        {
          test: /\.png$/,
          loader: "file-loader?name=images/[hash].[ext]"
        },
        {
          test: /\.gif$/,
          loader: "file-loader?name=images/[hash].[ext]"
        },
        {
          test: /\.jpg$/,
          loader: "file-loader?name=images/[hash].[ext]"
        },
        {
          test: /\.hbs/,
          loader: "handlebars-loader"
        },
        {
          test: /(pixi|phaser).js/,
          loader: "script"
        }
      ]
    }
  };

  // Factor out common dependencies into a shared.js
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: "shared",
    filename: "[name].[hash].js"
  }));

  if (env === "development") {
    webpackConfig.devtool = "source-map";
    webpack.debug = true;
  }

  return webpackConfig;
};
