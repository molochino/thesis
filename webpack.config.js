const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // добавили плагин
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { main: './src/index.js', 
		   about: './src/about.js',
		   paper: './src/paper.js'
		 },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },  
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
	  {
		test: /\.css$/i,
		use: [
			(isDev ? 'style-loader' : {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        } 
      }),
			'css-loader', 
			'postcss-loader'
			]
		},      
	  {
    test: /\.(eot|ttf|woff|woff2)$/,
    use: [
      {
        loader: 'file-loader?name=[name].[ext]',
        options: {
          outputPath: 'vendor/'
        }
      }
    ]    
		},
	  {
		  test: /\.(png|jpg|gif|ico|svg)$/,
		  use: [
			'file-loader?name=./images/[name].[ext]', // указали папку, куда складывать изображения
		{
         loader: 'image-webpack-loader',
         options: {
          // publicPath: '../'
        }          
		}
		]
	   }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({  
      filename: './styles/[name].[contenthash].css',
    }),	
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      filename: 'index.html'
    }),
	new HtmlWebpackPlugin({
      inject: false,
      template: './src/about.html',
      filename: 'about.html'
    }),
	new HtmlWebpackPlugin({
      inject: false,
      template: './src/paper.html',
      filename: 'paper.html'
    }),
	new webpack.DefinePlugin({
		'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
	}),
	new OptimizeCssAssetsPlugin({
     assetNameRegExp: /\.css$/g,
     cssProcessor: require('cssnano'),
     cssProcessorPluginOptions: {
             preset: ['default'],
     },
     canPrint: true
	}),
    new WebpackMd5Hash()	
  ]
};