define(["backbone"], function(Backbone) {
  var Data = Backbone.Model.extend({
    defaults: {
      text: ""
    },
    initialize: function() {
      this.on("change", function() {
        if(!this.isValid()) {
          this.set(this.previousAttributes());
        }
      });
    },
    validate: function(data) {
      
    }
  });
  return Data;
})