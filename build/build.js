({
  // appDir: "../",
  baseUrl: "../scripts",
  // dir: "../../dist",
  name: 'main',
  mainConfigFile: '../scripts/main.js',
  paths: {
    requireLib: "../bower_components/requirejs/require"
  },
  optimize: "none",
  out: "tmp/script.js",
  include: "requireLib",

})