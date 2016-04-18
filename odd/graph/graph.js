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
goog.require('odd.graph.CoordinateMapper');
goog.require('odd.graph.GraphAxes');
goog.require('odd.system.OdeSystem.EventTypes');

/**
 * Renders the solution to ODEs.
 * @param {number} width
 * @param {number} height
 * @param {odd.system.OdeSystem} odeSystem
 * @param {goog.dom.DomHelper=} opt_domHelper Optional DOM helper.
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.graph.Graph = function(width, height, odeSystem, opt_domHelper){
  goog.ui.Component.call(this, opt_domHelper);

  /**
   * The width of the graph in px.
   * @type {number}
   * @private
   */
  this.width_ = width;

  /**
   * The height of the graph in px.
   * @type {number}
   * @private
   */
  this.height_ = height;

  /**
   * The system of ODEs to be solved.
   * @type {odd.system.OdeSystem}
   * @private
   */
  this.odeSystem_ = odeSystem;

  /**
   * The range of V to plot on the graph. If null the graph
   * will scale automatically with the points in the solution.
   * @type {goog.math.Range}
   * @private
   */
  this.fixedVRange_ = null;

  /**
   * The canvas that the graph will be drawn upon.
   * @type {goog.graphics.AbstractGraphics}
   * @private
   */
  this.graphics_ = goog.graphics.createGraphics(width, height);

  /**
   * The padding between the box that contains graph curves and
   * axes, and the edge of _graphics.
   * @type {number}
   * @private
   */
  this.padding_ = odd.graph.Graph.PADDING_PERCENTAGE_ * Math.min(width, height);

  /**
   * The graph will render when the odd.system.OdeSystem gains new data.
   */
  this.odeSystem_.listen(odd.system.OdeSystem.EventTypes.UPDATED_SOLUTION_DATA, goog.bind(this.drawSolution_, this));
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

/**
 * Draws the current solution into _graphics.
 * @private
 */
odd.graph.Graph.prototype.drawSolution_ = function() {
  var solution = this.odeSystem_.getCurrentSolution();

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
 * Renders the graph.
 */
odd.graph.Graph.prototype.render = function(opt_parentElement) {
  this.graphics_.render_(opt_parentElement);
};

/**
 * Updates the graph's fixed V Range.
 * @param {goog.math.Range} fixedVRange
 */
odd.graph.Graph.prototype.setFixedVRange = function(fixedVRange) {
  this.fixedVRange_ = fixedVRange;
};