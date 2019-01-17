const path = require('path')
const webpack = require('webpack')
const firebaseDevelopmentConfig = require('./config/firebase.config.development')
const firebaseProductionConfig = require('./config/firebase.config.production')

const { env } = process
const production = env.PRODUCTION

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    overlay: true,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      firebaseConfig: JSON.stringify(production ? firebaseProductionConfig : firebaseDevelopmentConfig)
    }),
  ]
}
