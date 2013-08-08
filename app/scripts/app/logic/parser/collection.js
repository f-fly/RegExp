define(["backbone", "backbone.localStorage", "./model"], function(Backbone, Local, Model) {
  var List = Backbone.Collection.extend({
    model: Model,
    localStorage: new Local("parser")
  });
  
  var list = new List();
  list.on("add", function(model) {
    model.save();
  });
  list.fetch();
  return list;
});