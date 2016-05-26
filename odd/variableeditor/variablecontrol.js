goog.provide('odd.variableeditor.VariableControl');

goog.require('goog.ui.Control');

goog.require('odd.variableeditor.VariableControlRenderer');

/**
 * @param {odd.data.Variable} variable
 * @constructor
 * @extends {goog.ui.Control}
 */
odd.variableeditor.VariableControl = function(variable) {
  goog.ui.Control.call(this, "", new odd.variableeditor.VariableControlRenderer(), null);

  this.variable_ = variable;

  this.setAllowTextSelection(true);
};
goog.inherits(odd.variableeditor.VariableControl, goog.ui.Control);

odd.variableeditor.VariableControl.prototype.getVariable = function() {
  return this.variable_;
};

odd.variableeditor.VariableControl.prototype.enterDocument = function() {
  odd.variableeditor.VariableControl.superClass_.enterDocument.call(this);

  var valueInputElement = this.getRenderer().getValueInput(this.getElement());
  this.getHandler().listen(valueInputElement, goog.events.EventType.CHANGE, function() {
    this.variable_.value = valueInputElement.value;
  });

  var unitInputElement = this.getRenderer().getUnitInput(this.getElement());
  this.getHandler().listen(unitInputElement, goog.events.EventType.CHANGE, function() {
    this.variable_.unit = unitInputElement.value;
  });

  var sliderCheckboxElement = this.getRenderer().getSliderCheckbox(this.getElement());
  this.getHandler().listen(sliderCheckboxElement, goog.events.EventType.CHANGE, function() {
    this.variable_.enableAsSlider(sliderCheckboxElement.checked);
    this.getRenderer().updateSliderOptions(this, this.getElement());
  });

  var minInputElement = this.getRenderer().getMinInput(this.getElement());
  this.getHandler().listen(minInputElement, goog.events.EventType.CHANGE, function() {
    this.variable_.min = minInputElement.value;
  });

  var maxInputElement = this.getRenderer().getMaxInput(this.getElement());
  this.getHandler().listen(maxInputElement, goog.events.EventType.CHANGE, function() {
    this.variable_.max = maxInputElement.value;
  });

  var stepInputElement = this.getRenderer().getStepInput(this.getElement());
  this.getHandler().listen(stepInputElement, goog.events.EventType.CHANGE, function() {
    this.variable_.step = stepInputElement.value;
  });

  window["componentHandler"]["upgradeElements"](this.getElement());
};