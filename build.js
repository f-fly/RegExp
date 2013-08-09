({
  baseUrl: "scripts",
  name: 'main',
  mainConfigFile: 'scripts/main.js',
  paths: {
    requireLib: "../bower_components/requirejs/require"
  },
  optimize: "none",
  out: "build/script.js",
  include: "requireLib"
})