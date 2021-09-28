const path = require( "path" );
const ESLintPlugin = require( "eslint-webpack-plugin" );

module.exports = {
  mode: "production",
  entry: "./src/speculate.js",
  output: {
    path: path.resolve( __dirname, "compiled" ),
    filename: "speculate.js"
  },
  plugins: [
    new ESLintPlugin( { files: "./src" } )
  ]
};

