goog.provide('odd.equationeditor.EquationControl');

goog.require('goog.ui.Control');

goog.require('odd.equationeditor.EquationControlRenderer');


/**
 * @param {string} equation
 * @constructor
 * @extends {goog.ui.Control}
 */
odd.equationeditor.EquationControl = function(equation) {
  goog.ui.Control.call(this, equation, new odd.equationeditor.EquationControlRenderer(), null);

  this.setAllowTextSelection(true);
};
goog.inherits(odd.equationeditor.EquationControl, goog.ui.Control);

odd.equationeditor.EquationControl.prototype.enterDocument = function() {
  odd.equationeditor.EquationControl.superClass_.enterDocument.call(this);

  window["componentHandler"]["upgradeElements"](this.getElement());
};