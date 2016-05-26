goog.provide('odd.equationeditor.EquationEditor');

goog.require('goog.array');
goog.require('goog.events');
goog.require('goog.ui.Component');
goog.require('goog.ui.Container');

goog.require('odd.data.EquationCollection');
goog.require('odd.equationeditor.EquationControl');
goog.require('odd.equationeditor.EquationControl.EventTypes');
goog.require('odd.uri.Uri');
goog.require('odd.templates.equationeditor');

/**
 * @param {goog.history.Html5History} history
 * @param {odd.uri.Uri} uri
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.equationeditor.EquationEditor = function(history, uri) {
  goog.ui.Component.call(this);

  this.history_ = history;
  this.uri_ = uri;

  this.container_ = new goog.ui.Container();

  var equationCollection = uri.getEquations() || new odd.data.EquationCollection();

  goog.array.forEach(equationCollection.getEquations(), this.createAndRenderControl, this);
};
goog.inherits(odd.equationeditor.EquationEditor, goog.ui.Component);

odd.equationeditor.EquationEditor.prototype.createAndRenderControl = function(equation) {
  var control = new odd.equationeditor.EquationControl(equation);
  this.container_.addChild(control, true);
};

odd.equationeditor.EquationEditor.prototype.createDom = function() {
  this.element_ = goog.soy.renderAsElement(odd.templates.equationeditor.equationEditor);
};

odd.equationeditor.EquationEditor.prototype.getContainer = function(element) {
  return element.getElementsByClassName('odd-equation-container')[0];
};

odd.equationeditor.EquationEditor.prototype.getAddButton = function(element) {
  return element.getElementsByClassName('add-equation-btn')[0];
};

odd.equationeditor.EquationEditor.prototype.getForwardButton = function(element) {
  return element.getElementsByClassName('forward-btn')[0];
};

odd.equationeditor.EquationEditor.prototype.getBackButton = function(element) {
  return element.getElementsByClassName('back-btn')[0];
};

odd.equationeditor.EquationEditor.prototype.render = function(opt_parentElement) {
  odd.equationeditor.EquationEditor.superClass_.render.call(this, opt_parentElement);
  var containerElement = this.getContainer(this.getElement());
  this.container_.render(containerElement);
};

odd.equationeditor.EquationEditor.prototype.getEquations = function() {
  var equations = [];
  this.container_.forEachChild(function(control) {
    equations.push(control.getEquation());
  });
  return new odd.data.EquationCollection(equations);
};

odd.equationeditor.EquationEditor.prototype.enterDocument = function() {
  odd.equationeditor.EquationEditor.superClass_.enterDocument.call(this);

  var addButtonElement = this.getAddButton(this.getElement());
  this.getHandler().listen(addButtonElement, goog.events.EventType.CLICK, function() {
    this.createAndRenderControl(odd.data.Equation.createEmpty());
  });

  var backButtonElement = this.getBackButton(this.getElement());
  this.getHandler().listen(backButtonElement, goog.events.EventType.CLICK, function() {
    this.history_.setToken('');
  });

  var forwardButtonElement = this.getForwardButton(this.getElement());
  this.getHandler().listen(forwardButtonElement, goog.events.EventType.CLICK, function() {
    this.uri_.setEquations(this.getEquations());
    this.history_.replaceToken(this.uri_.toString());

    this.uri_.setPath('/edit/variables/');
    this.history_.setToken(this.uri_.toString());
  });

  this.getHandler().listen(this.container_, odd.equationeditor.EquationControl.EventTypes.CHANGE, this.replaceUrl);

  this.getHandler().listen(this.container_, odd.equationeditor.EquationControl.EventTypes.DESTROY, function(evt) {
    var control = evt.target;
    this.container_.removeChild(control);
    control.dispose();
  });

  window["componentHandler"]["upgradeElements"](this.getElement());
}