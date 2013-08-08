define(function(require) {
  var Index = function() {
    require("bootstrap");
    
    var $ = require("jquery")
      , app  = new (require("./logic/app"))()
      , content = new (require("./interface/content"))(app)
      , parser = new (require("./interface/parser"))(app);
  }
  return Index;
})