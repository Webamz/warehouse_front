// config-overrides.js

module.exports = function override(config, env) {
    // Find the devServer object in the webpack configuration
    const devServer = config.devServer;
  
    // Remove the deprecated options
    delete devServer.onAfterSetupMiddleware;
    delete devServer.onBeforeSetupMiddleware;
  
    // Add the new setupMiddlewares option
    devServer.setupMiddlewares = (middlewares) => {
      // Add your middleware setup logic here
      // For example:
      middlewares.use((req, res, next) => {
        // Custom middleware logic
        next();
      });
    };
  
    return config;
  };
  