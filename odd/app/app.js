goog.provide('odd.app.App');

goog.require('goog.ui.Component');
goog.require('odd.controls.Controls');
goog.require('odd.graph.Graph');
goog.require('odd.system.OdeSystem');

/**
 * The odd App.
 * @param {odd.system.OdeSystem} odesystem
 * @param {odd.graph.Graph} graph
 * @param {odd.controls.Controls} controls
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.app.App = function(odesystem, graph, controls) {
  goog.ui.Component.call(this);

  /**
   * The ODE system.
   * @type {odd.system.OdeSystem}
   * @private
   */
  this.odesystem_ = odesystem;

  /**
   * Visual representation of the ode system's
   * current solution.
   * @type {odd.graph.Graph}
   * @private
   */
  this.graph_ = graph;

  /**
   * Controls that can vary the ode system.
   * @type {odd.controls.Controls}
   * @private
   */
  this.controls_ = controls;
};
goog.inherits(odd.app.App, goog.ui.Component);

odd.app.App.CLASS_NAME = "odd-app";

odd.app.App.prototype.createDom = function() {
  this.element_ = this.getDomHelper().createDom(goog.dom.TagName.DIV, odd.app.App.CLASS_NAME);
  this.graph_.createDom();
  this.controls_.createDom();
};

odd.app.App.prototype.canDecorate = function(element) {
  return false;
};

odd.app.App.prototype.render = function(opt_parentElement) {
  odd.app.App.superClass_.render.call(this, opt_parentElement);
  this.graph_.render(this.getElement());
  this.controls_.render(this.getElement());
};

odd.app.App.prototype.enterDocument = function() {
  odd.app.App.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.controls_, goog.ui.Component.EventType.CHANGE, goog.bind(this.draw, this));
};

odd.app.App.prototype.draw = function() {
  /* @type {odd.date.Vector} */
  var paramState = this.controls_.getParamState();

  this.odesystem_.setParamState(paramState);
  this.odesystem_.solveCurrent();

  /* @type {odd.solution.Solution} */
  var solution = this.odesystem_.getCurrentSolution();

  this.graph_.drawSolution(solution);
};