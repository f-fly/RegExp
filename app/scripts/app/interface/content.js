define(function(require) {
  var Content = function(app) {
    var self = this;
    self.app = app;
    self.viewData = new (require("./content/view_c"))({
      collection:app.data,
      el: $("#content > pre")
    });
    self.drop = new (require("./content/drop"))(self);
    
    
    
    
    // Den Knopf aktivieren
    var $form = $("#content > form");
    $form.find("button.append").on("click", function(e) {
      e.preventDefault();
      var text = $form.find("input").val();
      
      $form.find("input").val("");
      if(text.length) {
        self.app.data.add({
          text: text
        });
      }
    })
  
  };
  
  
  
  return Content;
})