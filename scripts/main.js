require.config({
  baseUrl: "scripts",
  waitSeconds: 300, // http://stackoverflow.com/questions/14279962/require-js-error-load-timeout-for-modules-backbone-jquerymobile
  paths: {
    'jquery': '../bower_components/jquery/jquery',
    'underscore': '../bower_components/underscore-amd/underscore',
    'backbone': '../bower_components/backbone-amd/backbone',
    'backbone.localStorage': '../bower_components/backbone.localStorage/backbone.localStorage',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap',
    'codemirror': '../bower_components/codemirror/lib/codemirror',
    'codemirror.modejs': '../bower_components/codemirror/mode/javascript/javascript'
  },
  shim: {
    'bootstrap': ["jquery"],
    'codemirror.modejs': ['codemirror']
  }
});


require(['app/index'], function(App) {
  new App();
});