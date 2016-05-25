goog.provide('odd.variableeditor.VariableControl');

goog.require('odd.variableeditor.VariableControlRenderer');

/**
 * @param {string} variableName
 * @constructor
 * @extends {goog.ui.Control}
 */
odd.variableeditor.VariableControl = function(variableName) {
  goog.ui.Control.call(this, variableName, new odd.variableeditor.VariableControlRenderer(), null);
  this.setAllowTextSelection(true);
};
goog.inherits(odd.variableeditor.VariableControl, goog.ui.Control);

odd.variableeditor.VariableControl.prototype.enterDocument = function() {
  odd.variableeditor.VariableControl.superClass_.enterDocument.call(this);

  window["componentHandler"]["upgradeElements"](this.getElement());
};