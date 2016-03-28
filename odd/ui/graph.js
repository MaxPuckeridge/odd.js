goog.provide('odd.ui.Graph');

goog.require('goog.math.Coordinate');

goog.require('goog.graphics');
goog.require('goog.graphics.Path');
goog.require('goog.graphics.Stroke');
goog.require('goog.array');

goog.require('odd.solution.Solution');
goog.require('odd.solution.Solution.NewDataEvent');

/**
 *
 * Renders the solution to odes
 *
 * @param {odd.solution.Solution} solution
 * @param {number} width
 * @param {number} height
 *
 * @constructor
 */
odd.ui.Graph = function(solution, width, height){
  this.solution = solution;

  this.width = width;
  this.height = height;

  this.graphics = goog.graphics.createGraphics(width, height);
  this.path = new goog.graphics.Path();

  this.boundingBox = null;

  this.solution.listen(odd.solution.Solution.NewDataEvent, goog.bind(this.drawSolution, this));
};

odd.ui.Graph.prototype.drawSolution = function() {
  this.graphics.clear();
  this.path.clear();

  var boundingBox = this.boundingBox || this.getSolutionBox();
  var converter = this.getConverter(boundingBox);

  var startPoint = this.solution.getLeftEdgePoint();
  var start = converter(startPoint.t, startPoint.y);

  this.path.moveTo(start["left"], start["top"]);
  this.solution.forEachPoint(function(point) {
    var position = converter(point.t, point.y);
    this.path.lineTo(position["left"], position["top"]);
  }, this);

  var horizontalAxis = new goog.graphics.Path();
  var xMin = converter(boundingBox.left, 0);
  var xMax = converter(boundingBox.left + boundingBox.width, 0);
  horizontalAxis.moveTo(xMin["left"], xMin["top"]);
  horizontalAxis.lineTo(xMax["left"], xMax["top"]);

  var verticalAxis = new goog.graphics.Path();
  var yMin = converter(0, boundingBox.top);
  var yMax = converter(0, boundingBox.top + boundingBox.height);
  verticalAxis.moveTo(yMin["left"], yMin["top"]);
  verticalAxis.lineTo(yMax["left"], yMax["top"]);


  var stroke = new goog.graphics.Stroke(1, 'black');
  this.graphics.drawPath(this.path, stroke, null);
  this.graphics.drawPath(horizontalAxis, stroke, null);
  this.graphics.drawPath(verticalAxis, stroke, null);
};

/**
 *
 * @return {Function}
 */
odd.ui.Graph.prototype.getConverter = function(boundingBox) {
  var minT = boundingBox.left;
  var maxY = boundingBox.top;

  var scaleT = this.width/boundingBox.width;
  var scaleY = this.height/boundingBox.height;

  return function(t, y) {
    return {
      "left": Math.round(scaleT * (t - minT)),
      "top": Math.round(this.height - scaleY *(y - maxY))
    };
  }.bind(this);
};

/**
 * Returns the solution's bounding box with some padding
 * @return {goog.math.Rect}
 */
odd.ui.Graph.prototype.getSolutionBox = function() {
  var solutionBox = this.solution.getBoundingBox();
  solutionBox.top -= 0.05 * solutionBox.height
  solutionBox.height *= 1.1;

  solutionBox.left -= 0.05 * solutionBox.width
  solutionBox.width *= 1.1;

  return solutionBox;
};

odd.ui.Graph.prototype.render = function(opt_parentElement) {
  this.graphics.render(opt_parentElement);
};