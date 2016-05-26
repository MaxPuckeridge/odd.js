goog.provide('odd.variableeditor.VariableControlRenderer');

goog.require('goog.dom.TagName');
goog.require('goog.ui.ControlRenderer');

goog.require('odd.templates.variableeditor')

/**
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
odd.variableeditor.VariableControlRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(odd.variableeditor.VariableControlRenderer, goog.ui.ControlRenderer);

odd.variableeditor.VariableControlRenderer.prototype.getValueInput = function(element) {
  return element.getElementsByTagName('input')[0];
};

odd.variableeditor.VariableControlRenderer.prototype.getUnitInput = function(element) {
  return element.getElementsByTagName('input')[1];
};

odd.variableeditor.VariableControlRenderer.prototype.getSliderCheckbox = function(element) {
  return element.getElementsByTagName('input')[2];
};

odd.variableeditor.VariableControlRenderer.prototype.getMinInput = function(element) {
  return element.getElementsByTagName('input')[3];
};

odd.variableeditor.VariableControlRenderer.prototype.getMaxInput = function(element) {
  return element.getElementsByTagName('input')[4];
};

odd.variableeditor.VariableControlRenderer.prototype.getStepInput = function(element) {
  return element.getElementsByTagName('input')[5];
};

odd.variableeditor.VariableControlRenderer.prototype.getSliderOptions = function(element) {
  return element.getElementsByClassName('slider-options')[0];
};

odd.variableeditor.VariableControlRenderer.prototype.createDom = function(control) {
  var element = control.getDomHelper().createDom(goog.dom.TagName.LI, "mdl-list__item odd-variable-item");

  var presentationArgs = {
    id: control.getId(),
    variable: control.getVariable().name,
    value: control.getVariable().value,
    unit: control.getVariable().unit,
    hasSlider: control.getVariable().isSlider(),
    min: control.getVariable().min,
    max: control.getVariable().max,
    step: control.getVariable().step
  };

  goog.soy.renderElement(element, odd.templates.variableeditor.variableItem, presentationArgs);

  return element;
};

odd.variableeditor.VariableControlRenderer.prototype.updateSliderOptions = function(control, element) {
  var sliderOptions = this.getSliderOptions(element);
  goog.dom.classlist.enable(sliderOptions, 'hidden', !control.getVariable().isSlider());
};
