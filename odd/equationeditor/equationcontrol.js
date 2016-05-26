goog.provide('odd.equationeditor.EquationControl');
goog.provide('odd.equationeditor.EquationControl.EventTypes')

goog.require('goog.ui.Control');

goog.require('odd.data.Equation');
goog.require('odd.equationeditor.EquationControlRenderer');

/**
 * @param {odd.data.Equation} equation
 * @constructor
 * @extends {goog.ui.Control}
 */
odd.equationeditor.EquationControl = function(equation) {
  goog.ui.Control.call(this, "", new odd.equationeditor.EquationControlRenderer(), null);

  this.equation_ = equation;

  this.setAllowTextSelection(true);
};
goog.inherits(odd.equationeditor.EquationControl, goog.ui.Control);

odd.equationeditor.EquationControl.prototype.getEquation = function() {
  return this.equation_;
};

odd.equationeditor.EquationControl.EventTypes = {
  DESTROY: 'destroy'
}

odd.equationeditor.EquationControl.prototype.enterDocument = function() {
  odd.equationeditor.EquationControl.superClass_.enterDocument.call(this);

  var deleteBtn = this.getRenderer().getDeleteBtn(this.getElement());
  this.getHandler().listen(deleteBtn, goog.events.EventType.CLICK, function() {
    this.dispatchEvent(odd.equationeditor.EquationControl.EventTypes.DESTROY);
  });

  var inputElement = this.getRenderer().getInput(this.getElement());
  this.getHandler().listen(inputElement, goog.events.EventType.CHANGE, function() {
    var value = inputElement.value;
    this.equation_ = odd.data.Equation.fromString(value);
    this.getRenderer().updateValue(this);
  });

  window["componentHandler"]["upgradeElements"](this.getElement());
};