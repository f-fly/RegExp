define(["./data/collection", "./parser/collection"], function(data, parser) {
  var App = function() {
    this.data = data;
    this.parser = parser;
  }
  

  
  return App;
  
});