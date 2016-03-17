goog.provide('odd.solver.Solution');

goog.require('goog.array');
goog.require('goog.math.Rect');
goog.require('goog.structs.AvlTree');

/**
 *
 * Holds the data of the solution to odes
 *
 * @constructor
 */
odd.solver.Solution = function() {
    this.data = new goog.structs.AvlTree(function(a, b) {
       if (Number(a["t"]) < Number(b["t"])) {
         return -1;
       } else if (Number(a["t"]) > Number(b["t"])) {
         return 1;
       }
       return 0;
     });
    this.boundingBox = null;
};

odd.solver.Solution.prototype.addPoint = function(point) {
    this.data.add(point);
    this.updateBoundingBox(point["t"], point["y"]);
};

odd.solver.Solution.prototype.addPoints = function(array) {
  goog.array.forEach(array, this.addPoint, this);
};

odd.solver.Solution.prototype.updateBoundingBox = function(t, y) {
    var newRect = new goog.math.Rect(t, y, 0, 0);
    this.boundingBox = this.boundingBox || newRect;
    this.boundingBox.boundingRect(newRect);
};

odd.solver.Solution.prototype.forEachPoint = function(fn, context) {
    context = context || this;
    this.data.inOrderTraverse(goog.bind(fn, context));
};

odd.solver.Solution.prototype.getBoundingBox = function() {
    return this.boundingBox;
};
