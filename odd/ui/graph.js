goog.provide('odd.ui.Graph');

goog.require('goog.math.Box');

goog.require('goog.graphics');
goog.require('goog.graphics.Path');
goog.require('goog.graphics.Stroke');
goog.require('goog.array');
goog.require('goog.color');
goog.require('goog.graphics.Font');

goog.require('odd.ui.CoordinateMapper');
goog.require('odd.ui.GraphAxes');
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

  this.padding = odd.ui.Graph.PADDING_PERCENTAGE * Math.min(width, height);

  this.graphics = goog.graphics.createGraphics(width, height);

  this.boundingBox = null;

  this.solution.listen(odd.solution.Solution.NewDataEvent, goog.bind(this.drawSolution, this));
};

odd.ui.Graph.PADDING_PERCENTAGE = 0.05;

odd.ui.Graph.COLORS = [
  "#F44336", // Red
  "#2196F3", // Blue
  "#4CAF50", // Green
  "#FF9800", // Orange
  "#9C27B0", // Purple
  "#9C27B0"  // Grey
];

odd.ui.Graph.prototype.drawSolution = function() {
  this.graphics.clear();

  var tRange = this.solution.getTRange();
  var vRange = this.solution.getCombinedVRange();

  var graphicsBox = new goog.math.Box(this.padding, this.width - this.padding,
      this.height - this.padding, this.padding);

  var coordinateMapper = new odd.ui.CoordinateMapper(tRange, vRange, graphicsBox);

  var graphAxes = new odd.ui.GraphAxes(tRange, vRange);
  graphAxes.draw(this.graphics, coordinateMapper);

  this.drawCurves_(coordinateMapper);
};

odd.ui.Graph.prototype.drawCurves_ = function(coordinateMapper) {
  var group = this.graphics.createGroup();
  var startPoint = this.solution.getLeftEdgePoint();

  for (var i = 0; i < startPoint.getVLength(); i++) {
    var path = new goog.graphics.Path();

    var start = coordinateMapper.map(startPoint.t, startPoint.getV(i));
    path.moveTo(start[0], start[1]);

    this.solution.forEachPoint(function(point) {
      var position = coordinateMapper.map(point.t, point.getV(i));
      path.lineTo(position[0], position[1]);
    });

    var stroke = new goog.graphics.Stroke(1, odd.ui.Graph.COLORS[i]);
    this.graphics.drawPath(path, stroke, null, group);
  }
};

odd.ui.Graph.prototype.render = function(opt_parentElement) {
  this.graphics.render(opt_parentElement);
};