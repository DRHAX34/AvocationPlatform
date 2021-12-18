/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require("fs");

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    https: {
      key: fs.readFileSync("./src/keystore/example.com+5-key.pem"),
      cert: fs.readFileSync("./src/keystore/example.com+5.pem"),
    },
    public: "https://localhost:8080/",
  },
};
