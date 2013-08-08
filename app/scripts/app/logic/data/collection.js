define(["backbone", "backbone.localStorage", "./model"], function(Backbone, Local, Model) {
  var List = Backbone.Collection.extend({
    model: Model,
    localStorage: new Local("data")
  });
  
  
  
  var list = new List();
  list.fetch();
  list.on("add", function(model) {
    model.save();
  })
  return list;
});