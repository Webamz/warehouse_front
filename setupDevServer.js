// setupDevServer.js

module.exports = function (devServer) {
    // Add your custom middleware setup logic here
    // For example:
    devServer.use((req, res, next) => {
      // Custom middleware logic
      next();
    });
  };
  