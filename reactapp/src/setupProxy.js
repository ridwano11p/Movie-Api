const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  const appProxy = createProxyMiddleware("/Movie", {
    target: "https://localhost:7006",
    secure: false,
  });

  app.use(appProxy);
};
