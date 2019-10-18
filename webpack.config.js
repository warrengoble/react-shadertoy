const path = require("path");

module.exports = {
  entry: ["./index"],
  mode: "production",
  output: {
    path: path.join(__dirname, "dist"),
    library: "ReactShadertoy",
    libraryTarget: "umd",
    filename: "index.js"
  },
  target: "web",
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
  }
};
