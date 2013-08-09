define(["backbone", "underscore", "codemirror.modejs"], function(Backbone, _) {
  var View = Backbone.View.extend();
  
  View.prototype.render = function() {
    var self = this
      , $el  = self.$el.empty()
      , $head  = $("<div />").addClass("accordion-heading")
      , $name  = $("<a />").addClass("accordion-toggle")
      , $body  = $("<div />").addClass("accordion-body collapse")
      , $editor = $("<textarea />").addClass("editor")
      , $btngrp = $("<div />").addClass("btn-group")
      , $save   = $("<button />").addClass("btn btn-default").text("save")
      , $remove = $("<button />").addClass("btn btn-danger").text("remove");
      
    $el.append(
      $head.append(
        $name
      ).append(
        $btngrp.append(
          $save
        ).append(
          $remove
        )
      )
    ).append(
      $body.append(
        $editor
      )
    );
    
    
    
    $name.text(self.model.get("name"));
    $editor.val(self.model.get("src"));
    $remove.on("click", function() {
      self.model.destroy();
    });
    $save.on("click", function() {
      self.model.set("src", editor.getValue());
      self.model.set("reg", $("#parser input").val())
      self.model.save();
      self.trigger("save", self.model);
    })

    
    var editor = CodeMirror.fromTextArea($editor[0], {
      lineNumbers: false,
      mode: "javascript",
      matchBrackets: true,
      //continueComments: "Enter",
      //extraKeys: {"Ctrl-Q": "toggleComment"}
    });
    
    $el.data("editor", editor);
    
    $body.collapse({toggle:false}).on("shown.bs.collapse show.bs.collapse", function() {
      editor.refresh();
    });
    
     
    return this;
  }
  
  View.prototype.initialize = function() {
    var self = this;
    self.$el.addClass("accordion-group parser");
    self.$el.data("parser", self.model);
    // self.listenTo(self.model, "change:name change:src", self.render);
  }
  
  return View;
  
})