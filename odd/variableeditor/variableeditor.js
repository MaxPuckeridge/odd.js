goog.provide('odd.variableeditor.VariableEditor');

goog.require('goog.ui.Component');

goog.require('odd.uri.Uri');
goog.require('odd.templates.variableeditor');
goog.require('odd.variableeditor.VariableControl');
goog.require('odd.variableeditor.VariableControl.EventTypes');
goog.require('odd.data.VariableCollection');

/**
 * @param {goog.history.Html5History} history
 * @param {odd.uri.Uri} uri
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.variableeditor.VariableEditor = function(history, uri) {
  goog.ui.Component.call(this);

  this.history_ = history;
  this.uri_ = uri;

  var variables = uri.getVariables();

  this.initialConditionContainer_ = new goog.ui.Container();
  goog.array.forEach(variables.getInitialConditions(), this.createAndRenderInitialCondition, this);

  this.parameterContainer_ = new goog.ui.Container();
  goog.array.forEach(variables.getParameters(), this.createAndRenderParameter, this);
};
goog.inherits(odd.variableeditor.VariableEditor, goog.ui.Component);

odd.variableeditor.VariableEditor.prototype.createDom = function() {
  this.element_ = goog.soy.renderAsElement(odd.templates.variableeditor.variableEditor);
};

odd.variableeditor.VariableEditor.prototype.getInitialConditionContainerElement = function(element) {
  return element.getElementsByClassName('odd-initial-condition-container')[0];
};

odd.variableeditor.VariableEditor.prototype.getParameterContainerElement = function(element) {
  return element.getElementsByClassName('odd-parameter-container')[0];
};

odd.variableeditor.VariableEditor.prototype.render = function(opt_parentElement) {
  odd.variableeditor.VariableEditor.superClass_.render.call(this, opt_parentElement);

  var initialConditionContainerElement = this.getInitialConditionContainerElement(this.getElement());
  this.initialConditionContainer_.render(initialConditionContainerElement);

  var parameterContainerElement = this.getParameterContainerElement(this.getElement());
  this.parameterContainer_.render(parameterContainerElement);
};

odd.variableeditor.VariableEditor.prototype.createAndRenderInitialCondition = function(variable) {
  var control = new odd.variableeditor.VariableControl(variable);
  this.initialConditionContainer_.addChild(control, true);
};

odd.variableeditor.VariableEditor.prototype.createAndRenderParameter = function(variable) {
  var control = new odd.variableeditor.VariableControl(variable);
  this.parameterContainer_.addChild(control, true);
};

odd.variableeditor.VariableEditor.prototype.getForwardButton = function(element) {
  return element.getElementsByClassName('forward-btn')[0];
};

odd.variableeditor.VariableEditor.prototype.getBackButton = function(element) {
  return element.getElementsByClassName('back-btn')[0];
};

odd.variableeditor.VariableEditor.prototype.getVariables = function() {
  var initialConditions = [];
  this.initialConditionContainer_.forEachChild(function(control) {
    initialConditions.push(control.getVariable());
  });

  var parameters = [];
  this.parameterContainer_.forEachChild(function(control) {
    parameters.push(control.getVariable());
  });

  return new odd.data.VariableCollection(initialConditions, parameters);
};

odd.variableeditor.VariableEditor.prototype.enterDocument = function() {
  odd.variableeditor.VariableEditor.superClass_.enterDocument.call(this);

  var backButtonElement = this.getBackButton(this.getElement());
  this.getHandler().listen(backButtonElement, goog.events.EventType.CLICK, function() {
    this.uri_.setVariables(this.getVariables());
    this.history_.replaceToken(this.uri_.toString());

    this.uri_.setPath('/edit/equations/');
    this.history_.setToken(this.uri_.toString());
  });

  var forwardButtonElement = this.getForwardButton(this.getElement());
  this.getHandler().listen(forwardButtonElement, goog.events.EventType.CLICK, function() {
    this.uri_.setVariables(this.getVariables());
    this.history_.replaceToken(this.uri_.toString());

    this.uri_.setPath('/edit/graph-options/');
    this.history_.setToken(this.uri_.toString());
  });

  window["componentHandler"]["upgradeElements"](this.getElement());
}