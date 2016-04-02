goog.provide('odd.ui.Graph');

goog.require('goog.math.Box');

goog.require('goog.graphics');
goog.require('goog.graphics.Path');
goog.require('goog.graphics.Stroke');
goog.require('goog.array');
goog.require('goog.color');
goog.require('goog.graphics.Font');

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

  var boundingBox = this.boundingBox || this.getSolutionBox();
  var converter = this.getConverter(boundingBox);

  this.drawCurves(boundingBox, converter);
  this.drawAxes(boundingBox, converter);
};

odd.ui.Graph.prototype.drawCurves = function(boundingBox, converter) {
  var group = this.graphics.createGroup();
  var startPoint = this.solution.getLeftEdgePoint();

  for (var i = 0; i < startPoint.getVLength(); i++) {
    var path = new goog.graphics.Path();
    var start = converter(startPoint.t, startPoint.getV(i));
    path.moveTo(start["left"], start["top"]);
    this.solution.forEachPoint(function(point) {
      var position = converter(point.t, point.getV(i));
      path.lineTo(position["left"], position["top"]);
    });
    var stroke = new goog.graphics.Stroke(1, odd.ui.Graph.COLORS[i]);
    this.graphics.drawPath(path, stroke, null, group);
  }
};

odd.ui.Graph.prototype.drawAxes = function(boundingBox, converter) {
  var group = this.graphics.createGroup();

  var horizontalAxis = new goog.graphics.Path();
  var fixedY = boundingBox.top > 0 ? boundingBox.top : boundingBox.bottom < 0 ? boundingBox.bottom : 0;
  var xMin = converter(boundingBox.left, fixedY);
  var xMax = converter(boundingBox.right, fixedY);
  horizontalAxis.moveTo(xMin["left"] - this.padding/2, xMin["top"]);
  horizontalAxis.lineTo(xMax["left"] + this.padding/2, xMax["top"]);

  var verticalAxis = new goog.graphics.Path();
  var fixedX = boundingBox.left > 0 ? boundingBox.left : boundingBox.right < 0 ? boundingBox.right : 0;
  var yMin = converter(fixedX, boundingBox.top);
  var yMax = converter(fixedX, boundingBox.bottom);
  verticalAxis.moveTo(yMin["left"], yMin["top"] + this.padding/2);
  verticalAxis.lineTo(yMax["left"], yMax["top"] - this.padding/2);

  var black = new goog.graphics.Stroke(1, 'black');

  this.graphics.drawPath(horizontalAxis, black, null, group);
  this.graphics.drawPath(verticalAxis, black, null, group);

  var largeTTickInterval = this.determineTickFromInterval(boundingBox.getWidth()/5);
  var smallTTickInterval = largeTTickInterval/5;
  var tTicks = goog.array.range(Math.ceil(boundingBox.left/smallTTickInterval)*smallTTickInterval,
   Math.ceil(boundingBox.right/smallTTickInterval)*smallTTickInterval, smallTTickInterval);
  goog.array.forEach(tTicks, function(v) {
    var path = new goog.graphics.Path();
    var tick = converter(v, fixedY);
    var majorTick = goog.math.nearlyEquals(v % largeTTickInterval, 0);
    var tickHeight = majorTick ? 15 : 5;
    path.moveTo(tick["left"], tick["top"]);
    path.lineTo(tick["left"], tick["top"] - tickHeight);
    this.graphics.drawPath(path, black, null, group);
  }, this);

  var largeVTickInterval = this.determineTickFromInterval(boundingBox.getHeight()/5);
  var smallVTickInterval = largeVTickInterval/5;
  var vTicks = goog.array.range(Math.ceil(boundingBox.top/smallVTickInterval)*smallVTickInterval,
   Math.ceil(boundingBox.bottom/smallVTickInterval)*smallVTickInterval, smallVTickInterval);
  goog.array.forEach(vTicks, function(v) {
    var path = new goog.graphics.Path();
    var tick = converter(fixedX, v);
    var majorTick = goog.math.nearlyEquals(v % largeVTickInterval, 0);
    var tickHeight = majorTick ? 15 : 5;
    path.moveTo(tick["left"], tick["top"]);
    path.lineTo(tick["left"] + tickHeight, tick["top"]);
    this.graphics.drawPath(path, black, null, group);

    if (majorTick) {
      var font = new goog.graphics.Font(12, 'arial');
      this.graphics.drawTextOnLine(v.toString(), tick["left"] + 20, tick["top"],
        tick["left"] + 30, tick["top"], 'left', font, black, null, group);
    }
  }, this);
};

odd.ui.Graph.prototype.determineTickFromInterval = function(interval) {
  var alpha = goog.math.log10Floor(interval);
  var factor = Math.pow(10, alpha);
  return Math.round(interval/factor)*factor;
};

/**
 * @param {goog.math.Box} boundingBox
 * @return {Function}
 */
odd.ui.Graph.prototype.getConverter = function(boundingBox) {
  var minT = boundingBox.left;
  var maxY = boundingBox.top;

  var scaleT = (this.width - 2*this.padding)/boundingBox.getWidth();
  var scaleY = (this.height - 2*this.padding)/boundingBox.getHeight();

  return function(t, y) {
    return {
      "left": Math.round(this.padding + scaleT * (t - minT)),
      "top": Math.round(this.height - this.padding - scaleY *(y - maxY))
    };
  }.bind(this);
};

/**
 * Returns the solution's bounding box
 * @return {goog.math.Box}
 */
odd.ui.Graph.prototype.getSolutionBox = function() {
  var tRange = this.solution.getTRange();
  var vRange = this.solution.getCombinedVRange();
  return new goog.math.Box(vRange.start, tRange.end, vRange.end, tRange.start);
};

odd.ui.Graph.prototype.render = function(opt_parentElement) {
  this.graphics.render(opt_parentElement);
};