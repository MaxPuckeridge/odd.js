goog.provide('odd.variableeditor.VariableControl');
goog.provide('odd.variableeditor.VariableControl.EventTypes');

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

odd.variableeditor.VariableControl.EventTypes = {
  CHANGE: 'change'
};

odd.variableeditor.VariableControl.prototype.getVariable = function() {
  return this.variable_;
};

odd.variableeditor.VariableControl.prototype.enterDocument = function() {
  odd.variableeditor.VariableControl.superClass_.enterDocument.call(this);

  var valueInputElement = this.getRenderer().getValueInput(this.getElement());
  this.getHandler().listen(valueInputElement, goog.events.EventType.CHANGE, function() {
    this.variable_.value = valueInputElement.value;
    this.dispatchEvent(odd.variableeditor.VariableControl.EventTypes.CHANGE);
  });

  var unitInputElement = this.getRenderer().getUnitInput(this.getElement());
  this.getHandler().listen(unitInputElement, goog.events.EventType.CHANGE, function() {
    this.variable_.unit = unitInputElement.value;
    this.dispatchEvent(odd.variableeditor.VariableControl.EventTypes.CHANGE);
  });

  var sliderCheckboxElement = this.getRenderer().getSliderCheckbox(this.getElement());
  this.getHandler().listen(sliderCheckboxElement, goog.events.EventType.CHANGE, function() {
    this.variable_.enableAsSlider(sliderCheckboxElement.checked);
    this.getRenderer().updateSliderOptions(this, this.getElement());
    this.dispatchEvent(odd.variableeditor.VariableControl.EventTypes.CHANGE);
  });

  var minInputElement = this.getRenderer().getMinInput(this.getElement());
  this.getHandler().listen(minInputElement, goog.events.EventType.CHANGE, function() {
    this.variable_.min = minInputElement.value;
    this.dispatchEvent(odd.variableeditor.VariableControl.EventTypes.CHANGE);
  });

  var maxInputElement = this.getRenderer().getMaxInput(this.getElement());
  this.getHandler().listen(maxInputElement, goog.events.EventType.CHANGE, function() {
    this.variable_.max = maxInputElement.value;
    this.dispatchEvent(odd.variableeditor.VariableControl.EventTypes.CHANGE);
  });

  var stepInputElement = this.getRenderer().getStepInput(this.getElement());
  this.getHandler().listen(stepInputElement, goog.events.EventType.CHANGE, function() {
    this.variable_.step = stepInputElement.value;
    this.dispatchEvent(odd.variableeditor.VariableControl.EventTypes.CHANGE);
  });

  window["componentHandler"]["upgradeElements"](this.getElement());
};