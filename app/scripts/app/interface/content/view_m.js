define(["backbone", "underscore"], function(Backbone, _) {
  var View = Backbone.View.extend();
  
  View.prototype.render = function() {

    var self = this
      , scrollTop = self.$el.find("div.text").scrollTop()
      , $el  = self.$el.empty()
      , $text = $("<div />").addClass("text")
      , $btngroup = $("<div />").addClass("btn-group")
      , $close    = $("<button />").addClass("btn btn-default").text("close")
      , $remove = $("<button />").addClass("btn btn-danger").text("remove")
      , $fade   = $("<div/>").addClass("fadetext")
      , hash    = Math.random();
    
    $el.append(
      $text
    ).append(
      $fade
    ).append(
      $btngroup.append(
        //$close
      ).append(
        $remove
      )
    );
    
      
      
    $remove.on("click", function(e) {
      e.stopPropagation();
      self.model.destroy();
    });
    
    $close.on("click", function(e) {
      e.stopPropagation();
      $el.removeClass("active");
      $("#content pre").removeClass("fulltext");

    })
    
    // Text cachen und eindeutiges Match Array erstellen
    var text = self.model.get("text")
      , match = _(self.match).uniq().sort(function(a,b) {return b.length - a.length;});
    
    // Mathc suchen und durch hash ersetzen
    match.forEach(function(replace, k) {
      text = text.split(replace).join("[" + hash + "-" + k + "]");
    });
    
    // Escape
    text = _.escape(text);
    
    // Hashes ersetzen
    match.forEach(function(replace, k) {
      text = text.split("[" + hash + "-" + k + "]").join('<span class="match">' + _.escape(replace) + '</span>');
    });
    
    // Sonderzeichen maskieren
    text = text
      .replace(/\n/g, '\n<strong>\\n</strong>')
      .replace(/\t/g, '\t<strong>\\t</strong>')
      .replace(/\r/g, '\r<strong>\\r</strong>')
      .replace(/\f/g, '\f<strong>\\f</strong>')
      .replace(/\v/g, '\v<strong>\\v</strong>');

    
    // Text anzeigen
    $text.html(text).scrollTop(scrollTop);
    
    // hasMatch setzen
    $text.removeClass("hasMatch");
    if(match.length) {
      $text.addClass("hasMatch");
    }
    
    
    return this;
  }
  
  View.prototype.initialize = function() {
    var self = this;
    self.$el.addClass("content");
    self.match = [];
    self.listenTo(self.model, "change", self.render);
    self.listenTo(self.model, "match", function(match) {
      self.match = match;
      self.render();
      
    });
    
    self.$el.on("click", function() {
      var $this = $(this);
      if(!$this.hasClass("active")) {
        $this.addClass("active");
        $("#content pre").addClass("fulltext");
      }else{
        $this.removeClass("active");
        $("#content pre").removeClass("fulltext");
      }
    })
    
  }
  
  return View;
  
})