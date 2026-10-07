module.exports = function (config) {
  config.set({
    basePath: "",
    frameworks: ["jasmine"],
    files: [
      "js/validaciones.js",
      "js/carrito.js",
      "js/datos.js",
      "tests/**/*.spec.js"
    ],
    preprocessors: {
      "js/validaciones.js": ["coverage"],
      "js/carrito.js": ["coverage"]
    },
    reporters: ["progress", "coverage", "kjhtml"],
    coverageReporter: {
      type: "html",
      dir: "coverage/"
    },
    browsers: ["ChromeHeadless"],
    singleRun: true,
    colors: true,
    logLevel: config.LOG_INFO
  });
};