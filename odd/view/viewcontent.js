goog.provide('odd.view.ViewContent');

goog.require('goog.ui.Component');
goog.require('odd.controls.Controls');
goog.require('odd.graph.Graph');
goog.require('odd.system.OdeSystem');

/**
 * The app in view mode.
 * @param {goog.history.Html5History} history
 * @param {odd.uri.Uri} uri
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.view.ViewContent = function(history, uri) {
  goog.ui.Component.call(this);

  this.history_ = history;
  this.uri_ = uri;

  /**
   * The ODE system.
   * @type {odd.system.OdeSystem}
   * @private
   */
  this.odesystem_ = odd.system.OdeSystem.generateFromUri(uri);

  /**
   * Visual representation of the ode system's
   * current solution.
   * @type {odd.graph.Graph}
   * @private
   */
  this.graph_ = odd.graph.Graph.generateFromUri(uri);

  /**
   * Controls that can vary the ode system.
   * @type {odd.controls.Controls}
   * @private
   */
  this.controls_ = odd.controls.Controls.generateFromUri(uri);
};
goog.inherits(odd.view.ViewContent, goog.ui.Component);

odd.view.ViewContent.CLASS_NAME = "odd-view-content";

odd.view.ViewContent.prototype.createDom = function() {
  this.element_ = this.getDomHelper().createDom(goog.dom.TagName.DIV, odd.view.ViewContent.CLASS_NAME);
  this.graph_.createDom();
  this.controls_.createDom();
};

odd.view.ViewContent.prototype.canDecorate = function(element) {
  return false;
};

odd.view.ViewContent.prototype.render = function(opt_parentElement) {
  odd.view.ViewContent.superClass_.render.call(this, opt_parentElement);
  this.graph_.render(this.getElement());
  this.controls_.render(this.getElement());
  this.draw();
};

odd.view.ViewContent.prototype.enterDocument = function() {
  odd.view.ViewContent.superClass_.enterDocument.call(this);

  this.getHandler().listen(this.controls_, goog.ui.Component.EventType.CHANGE, goog.bind(this.draw, this));
};

odd.view.ViewContent.prototype.draw = function() {
  /* @type {odd.date.Vector} */
  var paramState = this.controls_.getParamState();

  this.odesystem_.setParamState(paramState);
  this.odesystem_.solveCurrent();

  /* @type {odd.solution.Solution} */
  var solution = this.odesystem_.getCurrentSolution();

  this.graph_.drawSolution(solution);
};