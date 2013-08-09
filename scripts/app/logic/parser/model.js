define(["backbone", "underscore"], function(Backbone, _) {
  var Parser = Backbone.Model.extend({
    defaults: {
      src: "this.write(this.item(0));",
      reg: "",
      name: "[unknown]"
    }
  });
  Parser.prototype.applyData = function(data) {
    var self = this
      , reg = self.get("reg")
      , result = []
      , globalData = {}
      , stream = []
      , func = function(){};
    try{
      func = new Function([], self.get("src"))
    }catch(e){
      
      self.trigger("invalid", e);
      return stream;
    }
      
    if(!reg.length) {
      data.forEach(function(item) {
        item.trigger("match", []);
      });
    }else{
      try {
        var reg_global = new RegExp(reg, "gi")
          , reg_line   = new RegExp(reg, "i");
          
        data.forEach(function(item) {
          var lines = item.get("text").match(reg_global) || [];
          lines.forEach(function(line) {
            result.push(line.match(reg_line));
          });
          item.trigger("match", lines);
        });
      }catch(e){
        self.trigger("invalid", e);
        return stream;
      }
    }
    try {
    
      result.forEach(function(item, n) {
        func.call({
          key: function() {
            return n;
          },
          item: function(k) {
            return item[k] || false;
          },
          data: function(index, value) {
            if(value !== undefined) {
              globalData[index] = value;
              return this;
            }
            return globalData[index];
          },
          length: function() {
            return result.length;
          },
          row: function(index) {
            return function(key) {
              if (result[index] && result[index][key]) return result[index][key];
              return false;
            }
          },
          write: function(text) {
            var escaped = _.escape(text);
            stream.push(escaped);
            self.trigger("write", escaped);
          }
        });
      });
    }catch(e){
      self.trigger("invalid", e);
      return stream;
    }
    return stream;

  }
  return Parser;
})