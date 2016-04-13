goog.provide('odd.graph.Graph');

goog.require('goog.math.Box');

goog.require('goog.graphics');
goog.require('goog.graphics.Path');
goog.require('goog.graphics.Stroke');
goog.require('goog.array');
goog.require('goog.color');
goog.require('goog.graphics.Font');

goog.require('odd.graph.CoordinateMapper');
goog.require('odd.graph.GraphAxes');
goog.require('odd.solution.Solution');
goog.require('odd.system.OdeSystem');
goog.require('odd.system.OdeSystem.EventTypes');

/**
 *
 * Renders the solution to odes
 *
 * @param {number} width
 * @param {number} height
 * @param {odd.system.OdeSystem} odeSystem
 * @constructor
 */
odd.graph.Graph = function(width, height, odeSystem){
  this.width = width;
  this.height = height;
  this.odeSystem = odeSystem;

  this.padding = odd.graph.Graph.PADDING_PERCENTAGE * Math.min(width, height);

  this.graphics = goog.graphics.createGraphics(width, height);

  this.odeSystem.listen(odd.system.OdeSystem.EventTypes.UPDATED_SOLUTION_DATA, goog.bind(this.drawSolution, this));

  this.fixedVRange_ = null;
};

odd.graph.Graph.PADDING_PERCENTAGE = 0.05;

odd.graph.Graph.COLORS = [
  "#F44336", // Red
  "#2196F3", // Blue
  "#4CAF50", // Green
  "#FF9800", // Orange
  "#9C27B0", // Purple
  "#9C27B0"  // Grey
];

odd.graph.Graph.prototype.drawSolution = function() {
  var solution = this.odeSystem.getCurrentSolution();

  this.graphics.clear();

  var tRange = solution.getTRange();
  var vRange = this.fixedVRange_ || solution.getCombinedVRange();

  var graphicsBox = new goog.math.Box(this.padding, this.width - this.padding,
      this.height - this.padding, this.padding);

  var coordinateMapper = new odd.graph.CoordinateMapper(tRange, vRange, graphicsBox);

  var graphAxes = new odd.graph.GraphAxes(tRange, vRange);
  graphAxes.draw(this.graphics, coordinateMapper);

  this.drawCurves_(solution, coordinateMapper);
};

odd.graph.Graph.prototype.drawCurves_ = function(solution, coordinateMapper) {
  var group = this.graphics.createGroup();
  var startPoint = solution.getLeftEdgePoint();

  for (var i = 0; i < startPoint.getVLength(); i++) {
    var path = new goog.graphics.Path();

    var start = coordinateMapper.map(startPoint.t, startPoint.getV(i));
    path.moveTo(start[0], start[1]);

    solution.forEachPoint(function(point) {
      var position = coordinateMapper.map(point.t, point.getV(i));
      path.lineTo(position[0], position[1]);
    });

    var stroke = new goog.graphics.Stroke(1, odd.graph.Graph.COLORS[i]);
    this.graphics.drawPath(path, stroke, null, group);
  }
};

odd.graph.Graph.prototype.render = function(opt_parentElement) {
  this.graphics.render(opt_parentElement);
};

odd.graph.Graph.prototype.setFixedVRange = function(fixedVRange) {
  this.fixedVRange_ = fixedVRange;
};