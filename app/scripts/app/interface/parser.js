define(function(require) {
  var Parser = function(app) {
    var self    = this
      , $parser = $("#parser")
      , $functions = $parser.find("> div.functions");
    
    self.$node = $parser;
    self.app = app;
    self.defaultParser = new (require("../logic/parser/model"))();
    self.activeParser = self.defaultParser;
    self.result = new (require("./result"))();
    
    self.viewFunctions = new (require("./parser/view_c"))({
      collection:app.parser, 
      el: $functions,
      parser:self
    });
    
    self.viewFunctions.on("save", function(model) {
      self.run();
    });
    app.parser.on("remove", function() {
      self.setActiveParser();
    })
    
    self.defaultParser.on("invalid", function(e) {
      $parser.addClass("invalid");
    })
    
    self.setActiveParser(self.defaultParser);

    
    $functions.on("click", "a.accordion-toggle", function(e) {
      e.preventDefault();
      var $active = $(this).closest(".accordion-group");
      if(!$active.find(".accordion-body").hasClass("in")) {
        
        var parser = $active.data("parser");
        
        $active.find(".accordion-body").collapse("show");
        $active.addClass("active");
        self.setActiveParser(parser);
      }else{
        self.setActiveParser();
      }
      $(this).closest(".accordion").find(".accordion-body.in").collapse("hide").closest(".accordion-group").removeClass("active");
      
      /*
      each(function() {
        var $this  = $(this).closest(".accordion-group").removeClass("active")
          , model  = $this.data("parser")
          , $input = $parser.find("input")
          , editor = $this.data("editor");
        
        
        //model.set("reg", $input.val());
        //model.set("src", editor.getValue());
        //model.save();
        
      
        
        
          
        
      })
      */
    });
    
    
    
    // Oben aktualisieren
    $parser.find("input").on("change", function(e) {
      e.preventDefault();
      self.run();
    }).on("keydown", function(e) {
      if(e.keyCode == 13) {
        self.run();
        e.preventDefault();
      }
    });
    
    $parser.find("button.favorite").on("click", function(e) {
      e.preventDefault();
      self.app.parser.add({
        reg: $parser.find("input").val(),
        name: window.prompt("name")
      });
      
    })
    
    
  };
  
  Parser.prototype.setActiveParser = function(parser) {
    var self = this
      , newParser = parser || self.defaultParser
      , oldParser = self.activeParser;
    if(oldParser.collection) {
      // oldParser.save();
    }
    self.activeParser = newParser;
    self.$node.find("input").val(newParser.get("reg"));
    self.run();
  }
  
  Parser.prototype.run = function() {
    var self = this;
    self.$node.removeClass("invalid");
    self.defaultParser.set("src", self.activeParser.get("src"));
    self.defaultParser.set("reg", $("#parser input").val());
    var result = self.defaultParser.applyData(self.app.data);
    // console.log(result);
    self.result.write(result);
  };
  
  return Parser;
});
