const path = require('path');
// import css from "application.css";

//creates bundle and configures server
module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path:path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  //configures the server
  devServer: {
    publicPath: '/build/',
    proxy: {
      '/api': 'http://localhost:3000',
      '/': 'http://localhost:3000',
      '/user': 'http://localhost:3000',
      '/signup': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']

          }
        }
      },
      {
        test: /\.scss$/,
        // use: [
        //   {loader: 'style-loader'},
        //   {loader: "css-loader"}, 
        //   {loader: "sass-loader"}
        // ],
        use: ['style-loader', 'css-loader', 'sass-loader'],
        }
    ]
  }
}


/*


*/