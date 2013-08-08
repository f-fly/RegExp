define(["underscore"], function(_) {
  var Drop = function(content) {
    var self = this;
    self.content = content;
    
    var reader = new FileReader();
    reader.addEventListener("load", function(e) {
      self.loaded.call(self, self.reader.result);
    }, false);

    document.addEventListener("drop", function(e) {
      e.preventDefault();
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
        Array.prototype.forEach.call(e.dataTransfer.files, function(file) {
          self.reader.readAsText(file);
        });
      }
    }, false);
    document.addEventListener("dragover", this.noop, false);
  };

  Drop.prototype.noop = function(e) {
    e.preventDefault();
  };

  Drop.prototype.loaded = function(res) {
    this.content.app.data.add({
      text: res
    });
  };

  return Drop;
})