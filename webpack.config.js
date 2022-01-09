let mode = 'development'; 
if (process.env.NODE_ENV === 'production')
mode = 'production'; 
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  // context:path.resolve(__dirname, 'src'), 
   mode: mode,  
   entry: {
        main: ["@babel/polyfill", "./src/js/index.js"],
    },
   output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].[contenthash].js',
        assetModuleFilename: "assets/[hash][ext][query]"
    },
     devtool: 'eval-source-map',
     resolve: {
        alias:{
           'framework':path.join(__dirname, 'src/js/framework'),
        }
     },
     plugins: [
        new HtmlWebpackPlugin({
           template: path.resolve(__dirname, './src/index.html'), // шаблон
                              
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
           filename:'[name].[contenthash].css'
        }),
    ],
    module: {
        rules: [
            {
               test: /\.(html)$/,
               use: 'html-loader',
            },

            {
               test: /\.(css)$/,
               use: [
                  (mode === 'development') ? 'style-loader': MiniCssExtractPlugin.loader,
                'css-loader',
                {loader: "postcss-loader"},
                "sass-loader",
               ],
            },
          
            {
               test: /\.(woff(2)?|eot|ttf|otf|json|)$/,
               type: 'asset/inline',
            },
             {
               test: /\.(?:ico|gif|png|jpg|jpeg|svg|wav|mp3|)$/i,
               type: 'asset/resource',
             },
             {
               test: /\.m?js$/,
               exclude: /(node_modules|bower_components)/,
               use: {
               loader: 'babel-loader',
                  options: {
                  presets: ['@babel/preset-env']
                  }
               }
             },
               
             
           
        ],
    }

}