define(["backbone", "./view_m"], function(Backbone, ModelView) {
  var Content = Backbone.View.extend();
  Content.prototype.render = function() {
    
    var self = this
      , $el = self.$el.empty().removeClass("fulltext");
      
    self.collection.forEach(function(content) {
      var view = new ModelView({
        model: content,
      });
      view.render();
      
      $el.append(view.$el);
    })
    return this;
  }
  Content.prototype.initialize = function() {
    var self = this;
    self.render();
    self.listenTo(this.collection, "add remove sort reset", self.render);
  }
  return Content;
})