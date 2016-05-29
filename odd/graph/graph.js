/**
 * @fileoverview A component class used to render an ODE system's solutions.
 * @author Max Puckeridge
 */

goog.provide('odd.graph.Graph');

goog.require('goog.graphics');
goog.require('goog.graphics.Path');
goog.require('goog.graphics.Stroke');
goog.require('goog.math.Box');
goog.require('goog.ui.Component');
goog.require('goog.math.Range');

goog.require('odd.graph.CoordinateMapper');
goog.require('odd.graph.GraphAxes');

/**
 * Renders the solution to ODEs.
 * @param {odd.labels.VariableLabel} independentVariableLabel
 * @param {Array<odd.labels.VariableLabel>} variableLabels
 * @param {goog.math.Range} fixedVRange
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.graph.Graph = function(independentVariableLabel, variableLabels, fixedVRange){
  goog.ui.Component.call(this);

  // TODO: width and height should be dynamic based on window size

  /**
   * The width of the graph in px.
   * @type {number}
   * @private
   */
  this.width_ = 800;

  /**
   * The height of the graph in px.
   * @type {number}
   * @private
   */
  this.height_ = 600;

  /**
   * The graph's independent variable label.
   * @type {odd.labels.VariableLabel}
   * @private
   */
  this.independentVariableLabel_ = independentVariableLabel;

  /**
   * The graph's variable labels.
   * @type {Array<odd.labels.VariableLabel>}
   * @private
   */
  this.variableLabels_ = variableLabels;

  /**
   * The range of V to plot on the graph. If null the graph
   * will scale automatically with the points in the solution.
   * @type {goog.math.Range}
   * @private
   */
  this.fixedVRange_ = fixedVRange;

  /**
   * The canvas that the graph will be drawn upon.
   * @type {goog.graphics.AbstractGraphics}
   * @private
   */
  this.graphics_ = goog.graphics.createGraphics(this.width_, this.height_);

  /**
   * The padding between the box that contains graph curves and
   * axes, and the edge of _graphics.
   * @type {number}
   * @private
   */
  this.padding_ = odd.graph.Graph.PADDING_PERCENTAGE_ * Math.min(this.width_, this.height_);
};
goog.inherits(odd.graph.Graph, goog.ui.Component);

/**
 * A percentage of the width or height that should be padding.
 * @type {number}
 * @private
 */
odd.graph.Graph.PADDING_PERCENTAGE_ = 0.05;

/**
 * A list of colors to use when plotting solutions.
 * @type {Array<string>}
 * @private
 */
odd.graph.Graph.COLORS_ = [
  "#F44336", // Red
  "#2196F3", // Blue
  "#4CAF50", // Green
  "#FF9800", // Orange
  "#9C27B0", // Purple
  "#9C27B0"  // Grey
];

odd.graph.Graph.CLASS_NAME = 'odd-graph';

odd.graph.Graph.prototype.createDom = function() {
  this.element_ = this.getDomHelper().createDom(goog.dom.TagName.DIV,
      odd.graph.Graph.CLASS_NAME);
};

odd.graph.Graph.prototype.canDecorate = function(element) {
  return false;
};

odd.graph.Graph.prototype.render = function(opt_parentElement) {
  odd.graph.Graph.superClass_.render.call(this, opt_parentElement);
  this.graphics_.render(this.getElement());
};

/**
 * Draws the current solution into _graphics.
 * @private {odd.solution.Solution} solution
 */
odd.graph.Graph.prototype.drawSolution = function(solution) {
  this.graphics_.clear();

  var tRange = solution.getTRange();
  var vRange = this.fixedVRange_ || solution.getCombinedVRange();

  var graphicsBox = new goog.math.Box(this.padding_, this.width_ - this.padding_,
      this.height_ - this.padding_, this.padding_);

  var coordinateMapper = new odd.graph.CoordinateMapper(tRange, vRange, graphicsBox);

  var graphAxes = new odd.graph.GraphAxes(tRange, vRange);
  graphAxes.draw(this.graphics_, coordinateMapper);

  this.drawCurves_(solution, coordinateMapper);
};

/**
 * Draws each curve in the solution into _graphics.
 * @private
 */
odd.graph.Graph.prototype.drawCurves_ = function(solution, coordinateMapper) {
  var group = this.graphics_.createGroup();
  var startPoint = solution.getLeftEdgePoint();

  for (var i = 0; i < startPoint.getVLength(); i++) {
    var path = new goog.graphics.Path();

    var start = coordinateMapper.map(startPoint.getT(), startPoint.getV(i));
    path.moveTo(start[0], start[1]);

    solution.forEachPoint(function(point) {
      var position = coordinateMapper.map(point.getT(), point.getV(i));
      path.lineTo(position[0], position[1]);
    });

    var stroke = new goog.graphics.Stroke(1, odd.graph.Graph.COLORS_[i]);
    this.graphics_.drawPath(path, stroke, null, group);
  }
};

/**
 * Updates the graph's fixed V Range.
 * @param {goog.math.Range} fixedVRange
 */
odd.graph.Graph.prototype.setFixedVRange = function(fixedVRange) {
  this.fixedVRange_ = fixedVRange;
};

odd.graph.Graph.generateFromUri = function(uri) {
  var variables = uri.getVariables();
  var graphOptions = uri.getGraphOptions();

  var vRange = new goog.math.Range(graphOptions.top, graphOptions.bottom);

  return new odd.graph.Graph(null, null, vRange);
};