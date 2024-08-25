// craco.config.js
const path = require("path");

module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `@import "assets/style/function.scss";`,
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src")],
        },
      },
    },
  },
};
