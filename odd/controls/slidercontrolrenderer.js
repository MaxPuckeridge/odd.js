goog.provide('odd.controls.SliderControlRenderer');

goog.require('goog.dom.TagName');
goog.require('goog.ui.ControlRenderer');
goog.require('goog.soy');

goog.require('odd.templates.controls');

/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
odd.controls.SliderControlRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(odd.controls.SliderControlRenderer, goog.ui.ControlRenderer);

odd.controls.SliderControlRenderer.CLASS_NAME = "odd-slider-control";

odd.controls.SliderControlRenderer.prototype.createDom = function(control) {
  var element = control.getDomHelper().createDom(goog.dom.TagName.DIV,
      odd.controls.SliderControlRenderer.CLASS_NAME);

  var presentationArgs = {
    id: control.getId() + '-input',
    variableName: control.getVariableName(),
    minValue: control.getMin(),
    maxValue: control.getMax(),
    step: control.getStep(),
    value: control.getValue(),
    variableUnit: control.getVariableUnit(),
  };

  goog.soy.renderElement(element, odd.templates.controls.sliderControl, presentationArgs);

  return element;
};

odd.controls.SliderControlRenderer.prototype.getSlider = function(element) {
  return element.getElementsByTagName('input')[0];
};

odd.controls.SliderControlRenderer.prototype.getInputElement = function(element) {
  return element.getElementsByTagName('input')[1];
};

odd.controls.SliderControlRenderer.prototype.renderNewValue = function(control, value) {
  var element = control.getElement();
  this.getSlider(element)["MaterialSlider"]["change"](value);
  this.getInputElement(element).value = value;
};