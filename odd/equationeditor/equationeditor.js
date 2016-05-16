goog.provide('odd.equationeditor.EquationEditor');

goog.require('goog.array');
goog.require('goog.ui.Component');
goog.require('goog.ui.Container');

goog.require('odd.equationeditor.EquationControl');
goog.require('odd.templates.equationeditor');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.equationeditor.EquationEditor = function() {
  goog.ui.Component.call(this);

  this.equations_ = ["x' = v1 * y - v2 * x", "y' = v2 * x - v1 * y", "v1 = mu1^2 + 1", 'v2 =mu2^2 + 1'];

  this.container_ = new goog.ui.Container();

  goog.array.forEach(this.equations_, function(equation) {
    var control = new odd.equationeditor.EquationControl(equation);
    this.container_.addChild(control, true);
  }, this);
};
goog.inherits(odd.equationeditor.EquationEditor, goog.ui.Component);

odd.equationeditor.EquationEditor.prototype.createDom = function() {
  this.element_ = goog.soy.renderAsElement(odd.templates.equationeditor.equationEditor);
};

odd.equationeditor.EquationEditor.prototype.getContainer = function(element) {
  return element.getElementsByClassName('odd-equation-container')[0];
};

odd.equationeditor.EquationEditor.prototype.render = function(opt_parentElement) {
  odd.equationeditor.EquationEditor.superClass_.render.call(this, opt_parentElement);
  var containerElement = this.getContainer(this.getElement());
  this.container_.render(containerElement);
};


odd.equationeditor.EquationEditor.prototype.enterDocument = function() {
  odd.equationeditor.EquationEditor.superClass_.enterDocument.call(this);

  window["componentHandler"]["upgradeElements"](this.getElement());
}