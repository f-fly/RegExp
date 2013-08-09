define(["backbone", "./view_m"], function(Backbone, ModelView) {
  var Parser = Backbone.View.extend();
  Parser.prototype.render = function() {
    var self = this
      , $el = self.$el.empty();
      
    self.collection.forEach(function(parser) {
      var view = new ModelView({
        model: parser
      }).on("save", function(model){
        self.trigger("save", model)
      });
      view.render();
      $el.append(view.$el);
    })
    return this;
  }
  Parser.prototype.initialize = function() {
    var self = this;
    self.render();
    self.listenTo(this.collection, "add remove sort reset", self.render);
  }
  
  return Parser;
})