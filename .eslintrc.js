module.exports = {
  "env": {
    "browser": true,
    "commonjs": true,
    "es2021": true,
    "node": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12
  },
  "rules": {
    "eqeqeq": [ "error", "always" ],
    "indent": [ "error", 2 ],
    "no-control-regex": "off",
    "quotes": [ "error", "double" ],
    "semi": [ "error", "always" ]
  }
};
