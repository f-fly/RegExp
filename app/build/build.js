({
  // appDir: "../",
  baseUrl: "../scripts",
  // dir: "../../dist",
  name: 'main',
  mainConfigFile: '../scripts/main.js',
  paths: {
    requireLib: "./vendor/requirejs/require"
  },
  optimize: "none",
  out: "../../dist/js/script.js",
  include: "requireLib",

})