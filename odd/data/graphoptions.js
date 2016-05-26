goog.provide('odd.data.GraphOptions');

/**
 * @constructor
 */
odd.data.GraphOptions = function(opt_left, opt_right, opt_top, opt_bottom) {
  this.left = opt_left;
  this.right = opt_right;
  this.top = opt_top;
  this.bottom = opt_bottom;
};

odd.data.GraphOptions.prototype.toJson = function() {
  return {
    'left': this.left,
    'right': this.right,
    'top': this.top,
    'bottom': this.bottom
  };
};

odd.data.GraphOptions.fromJson = function(jsonData) {
  return new odd.data.GraphOptions(jsonData["left"], jsonData["right"], jsonData["top"],
      jsonData["bottom"]);
};
