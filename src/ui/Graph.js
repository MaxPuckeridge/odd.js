goog.provide('odd.ui.Graph');

goog.require('odd.data.Ode');
goog.require('odd.data.Ode.SolutionReadyEvent');
goog.require('goog.graphics');
goog.require('goog.graphics.Path');
goog.require('goog.graphics.Stroke');
goog.require('goog.array');

/**
 *
 * Renders the solution to odes
 *
 * @param ode
 * @param width
 * @param height
 *
 * @constructor
 */
odd.ui.Graph = function(ode, width, height){
    this.ode = ode;
    this.graphics = goog.graphics.createGraphics(width, height);
    this.path = new goog.graphics.Path();
    this.ode.listen(odd.data.Ode.SolutionReadyEvent, goog.bind(this.drawSolution, this));
};

odd.ui.Graph.prototype.drawSolution = function() {
  this.path.clear();

  this.path.moveTo(0,1000);
  this.ode.getSolution().forEachPoint(function(v) {
    this.path.lineTo(Math.round(Number(v["t"]*10)), 1000 - Math.round(Number(v["y"]*10)));
  }, this);
  this.path.close();

  var stroke = new goog.graphics.Stroke(1, 'black');
  this.graphics.drawPath(this.path, stroke, null);
};

odd.ui.Graph.prototype.render = function(opt_parentElement) {
  this.graphics.render(opt_parentElement);
};