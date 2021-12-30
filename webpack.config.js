const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = (env) => ({
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "app.js",
    clean: true,
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/utils/html/template.html",
      inject: "body",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-react", { runtime: "automatic" }]],
          }
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)/i,
        type: "asset/resource",
        generator: {
          filename: "static/assets/[hash][ext]",
        },
      },
      {
        test: /\.svg$/i,
        type: "asset/inline",
      },
    ],
  },
  devtool: env.development ? "inline-source-map" : false,
  devServer: {
    port: 9000,
    compress: true,
    static: ["./src/assets"],
  },
});
