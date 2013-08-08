require.config({
  baseUrl: "/f_fly/backbone/workspace/regexp/app/scripts",
  paths: {
    'jquery': 'vendor/jquery/jquery',
    'underscore': 'vendor/underscore-amd/underscore',
    'backbone': 'vendor/backbone-amd/backbone',
    'backbone.localStorage': 'vendor/backbone.localStorage/backbone.localStorage',
    'bootstrap': 'vendor/bootstrap/dist/js/bootstrap',
    // 'ace': 'vendor/ace/lib/ace/ace',
    'codemirror': 'vendor/codemirror/lib/codemirror',
    'codemirror.modejs': 'vendor/codemirror/mode/javascript/javascript'
  },
  shim: {
    'bootstrap': ["jquery"],
    'codemirror.modejs': ['codemirror']
  }
});


require(['app/index'], function(App) {
  new App();
});