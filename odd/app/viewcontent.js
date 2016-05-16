goog.provide('odd.app.ViewContent');

goog.require('goog.ui.Component');
goog.require('odd.controls.Controls');
goog.require('odd.graph.Graph');
goog.require('odd.system.OdeSystem');

/**
 * The app in view mode. Renders a given setup.
 * @param {odd.system.OdeSystem} odesystem
 * @param {odd.graph.Graph} graph
 * @param {odd.controls.Controls} controls
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.app.ViewContent = function(odesystem, graph, controls) {
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
goog.inherits(odd.app.ViewContent, goog.ui.Component);

odd.app.ViewContent.CLASS_NAME = "odd-view-content";

odd.app.ViewContent.prototype.createDom = function() {
  this.element_ = this.getDomHelper().createDom(goog.dom.TagName.DIV, odd.app.ViewContent.CLASS_NAME);
  this.graph_.createDom();
  this.controls_.createDom();
};

odd.app.ViewContent.prototype.canDecorate = function(element) {
  return false;
};

odd.app.ViewContent.prototype.render = function(opt_parentElement) {
  odd.app.ViewContent.superClass_.render.call(this, opt_parentElement);
  this.graph_.render(this.getElement());
  this.controls_.render(this.getElement());
};

odd.app.ViewContent.prototype.enterDocument = function() {
  odd.app.ViewContent.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.controls_, goog.ui.Component.EventType.CHANGE, goog.bind(this.draw, this));
};

odd.app.ViewContent.prototype.draw = function() {
  /* @type {odd.date.Vector} */
  var paramState = this.controls_.getParamState();

  this.odesystem_.setParamState(paramState);
  this.odesystem_.solveCurrent();

  /* @type {odd.solution.Solution} */
  var solution = this.odesystem_.getCurrentSolution();

  this.graph_.drawSolution(solution);
};