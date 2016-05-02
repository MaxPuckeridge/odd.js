goog.provide('odd.controls.SliderControlRenderer');

goog.require('goog.ui.ControlRenderer');
goog.require('goog.ui.Slider');
goog.require('goog.soy');

/**
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
odd.controls.SliderControlRenderer = function() {
  goog.ui.ControlRenderer.call(this);
  this.slider_ = new goog.ui.Slider();
};
goog.inherits(odd.controls.SliderControlRenderer, goog.ui.ControlRenderer);

odd.controls.SliderControlRenderer.TEMPLATE = function(data) {
  var output = "";
  output += "<div class='odd-slider-text-container'>"
  output += "  <span class='odd-variable-name'>" + goog.string.htmlEscape(data.variableName) + "</span>";
  output += "  <input class='odd-slider-input' type='text' value='" + data.value + "'/>";
  output += "  <span class='odd-variable-unit'>" + goog.string.htmlEscape(data.variableUnit) + "</span>";
  output += "</div>"
  return output;
};

odd.controls.SliderControlRenderer.prototype.createDom = function(control) {
  var element = control.getDomHelper().createDom('div', 'odd-slider-control');

  var sliderElement = control.getDomHelper().createDom('div');

  this.slider_.setValue(control.getValue());
  this.slider_.setMinimum(control.getMin());
  this.slider_.setMaximum(control.getMax());
  this.slider_.setStep(control.getStep());

  this.slider_.decorate(sliderElement);
  element.appendChild(sliderElement);

  var presentationArgs = {
    variableName: control.getVariableName(),
    value: control.getValue(),
    variableUnit: control.getVariableUnit(),
  };
  var textContainer = goog.soy.renderAsElement(odd.controls.SliderControlRenderer.TEMPLATE,
      presentationArgs);
  element.appendChild(textContainer);

  return element;
};

odd.controls.SliderControlRenderer.prototype.getSlider = function() {
  return this.slider_;
};

odd.controls.SliderControlRenderer.prototype.getInputElement = function(element) {
  return element.getElementsByClassName('odd-slider-input')[0];
};

odd.controls.SliderControlRenderer.prototype.renderNewValue = function(control, value) {
  var element = control.getElement();
  this.slider_.setValue(value);
  this.getInputElement(element).value = value;
};