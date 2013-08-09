({
  baseUrl: "../scripts",
  name: 'main',
  mainConfigFile: '../scripts/main.js',
  paths: {
    requireLib: "./vendor/requirejs/require"
  },
  optimize: "none",
  out: "../../tmp/js/script.js",
  include: "requireLib",

})