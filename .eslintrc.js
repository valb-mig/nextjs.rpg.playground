module.exports = {
  extends: ["next", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "off",
    "react-hooks/rules-of-hooks": "off",
  },
  ignorePatterns: ["node_modules/", "public/", "out/"],
};
