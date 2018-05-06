
  /**
   * SimpleUndo is a very basic javascript undo/redo stack for managing histories of basically anything.
   *
   * options are: {
   * 	* `provider` : required. a function to call on `save`, which should provide the current state of the historized object through the given "done" callback
   * 	* `maxLength` : the maximum number of items in history
   * 	* `onUpdate` : a function to call to notify of changes in history. Will be called on `save`, `undo`, `redo` and `clear`
   * }
   *
   */
  /**
   * 改造后，去掉了provider，undo和redo时会多返回当前的数据
   */
  var SimpleUndo = function(options) {

    var settings = options ? options : {};
    var defaultOptions = {
      maxLength: 30,
      onUpdate: function() {}
    };

    this.maxLength = (typeof settings.maxLength != 'undefined') ? settings.maxLength : defaultOptions.maxLength;
    this.onUpdate = (typeof settings.onUpdate != 'undefined') ? settings.onUpdate : defaultOptions.onUpdate;

    this.initialItem = null;
    this.clear();
  };

  function truncate (stack, limit) {
    while (stack.length > limit) {
      stack.shift();
    }
  }

  SimpleUndo.prototype.initialize = function(initialItem) {
    this.stack[0] = initialItem;
    this.initialItem = initialItem;
  };


  SimpleUndo.prototype.clear = function() {
    this.stack = [this.initialItem];
    this.position = 0;
    this.onUpdate();
  };

  SimpleUndo.prototype.save = function(current) {
      if (this.position >= this.maxLength) truncate(this.stack, this.maxLength);
      this.position = Math.min(this.position,this.stack.length - 1);

      this.stack = this.stack.slice(0, this.position + 1);
      this.stack.push(current);
      this.position++;
      this.onUpdate();
  };

  SimpleUndo.prototype.undo = function(callback) {
    if (this.canUndo()) {
      var prev = this.stack[this.position];
      var item =  this.stack[--this.position];
      this.onUpdate();

      if (callback) {
        callback(item,prev);
      }
    }
  };

  SimpleUndo.prototype.redo = function(callback) {
    if (this.canRedo()) {
      var prev = this.stack[this.position];
      var item = this.stack[++this.position];
      this.onUpdate();

      if (callback) {
        callback(item,prev);
      }
    }
  };

  SimpleUndo.prototype.canUndo = function() {
    return this.position > 0;
  };

  SimpleUndo.prototype.canRedo = function() {
    return this.position < this.count();
  };

  SimpleUndo.prototype.count = function() {
    return this.stack.length - 1; // -1 because of initial item
  };



export default SimpleUndo;
