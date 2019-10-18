const path = require("path");

module.exports = {
  entry: ["./index"],
  mode: "production",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "index.js"
  },
  //   target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  externals: [nodeExternals()]
};
