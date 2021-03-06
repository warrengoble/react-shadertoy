const path = require("path");

module.exports = {
  entry: ["./index"],
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist/"),
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
  },
  externals: {
    react: {
      root: "React",
      commonjs2: "react",
      commonjs: "react",
      amd: "react"
    },
    "react-dom": {
      root: "ReactDOM",
      commonjs2: "react-dom",
      commonjs: "react-dom",
      amd: "react-dom"
    }
  }
};
