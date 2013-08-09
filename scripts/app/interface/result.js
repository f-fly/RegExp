define(function(require) {
  var _ = require("underscore");
  
  
  var Result = function() {
    
  };
  
  Result.prototype.write = function(write) {
    var html = (write || []).map(function(line){
      return _.escape(line);
    }).join("<br />");
    $("#result pre").empty().html(html);
  };
  
  return Result;
});