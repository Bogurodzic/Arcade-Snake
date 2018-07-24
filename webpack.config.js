const webpackDashboard = require('webpack-dashboard/plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');

const devMode = process.env.NODE_ENV === 'development';

const productionPlugins = [
  new UglifyJsPlugin()
];

const basicPlugins = [
  new FriendlyErrorsWebpackPlugin(),
  new webpackDashboard(),
  new CleanWebpackPlugin('dist'),
  new HtmlWebpackPlugin(),
]


module.exports = {
  entry: [path.join(__dirname, './snake.js'), './styles.scss'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/')
  },
  module: {
    rules: [
      {
            test: /\.scss$/,
            use: [
                {
    							loader: 'file-loader',
    							options: {
    								name: 'styles.css',
    								outputPath: 'assets/css/'
    							}
    						},
                {
							     loader: "style-loader"
						    },
                {
                   loader: "css-loader"
                },
                {
                   loader: "sass-loader"
                }
            ]
        }
    ]
  },
  plugins: devMode ? basicPlugins : basicPlugins.concat(productionPlugins)
};
