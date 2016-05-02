goog.provide('odd.controls.SliderControlRenderer');

goog.require('goog.ui.ControlRenderer');
goog.require('goog.soy');

/**
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
odd.controls.SliderControlRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(odd.controls.SliderControlRenderer, goog.ui.ControlRenderer);

odd.controls.SliderControlRenderer.TEMPLATE = function(data) {
  var output = "";
  output += "<div class='odd-slider-control'>";
  output += "  <span class='odd-variable-name'>" + goog.string.htmlEscape(data.variableName) + "</span>";
  output += "  <div class='odd-slider-container'>"
  output += "    <input class='odd-slider mdl-slider mdl-js-slider' type='range' min='" + data.min +"' max='" + data.max +"' value='" + data.value + "' step='" + data.step + "' tabindex='0'>"
  output += "  </div>"
  output += "  <div class='odd-slider-text-container'>"
  output += "    <div class='odd-slider-input mdl-textfield mdl-js-textfield'>"
  output += "      <input class='mdl-textfield__input' type='text' pattern='-?[0-9]*(\.[0-9]+)?' id='" + data.id + "' value='" + data.value +"'>"
  output += "      <label class='mdl-textfield__label' for='" + data.id + "'>Number...</label>"
  output += "      <span class='mdl-textfield__error'>Input is not a number!</span>"
  output += "    </div>"
  output += "  </div>"
  output += "  <span class='odd-variable-unit'>" + goog.string.htmlEscape(data.variableUnit) + "</span>"
  output += "</div>";

  return output;
};

odd.controls.SliderControlRenderer.prototype.createDom = function(control) {
  var element = control.getDomHelper().createDom('div');

  var presentationArgs = {
    id: control.getId() + '-input',
    variableName: control.getVariableName(),
    min: control.getMin(),
    max: control.getMax(),
    step: control.getStep(),
    value: control.getValue(),
    variableUnit: control.getVariableUnit(),
  };

  goog.soy.renderElement(element, odd.controls.SliderControlRenderer.TEMPLATE, presentationArgs);

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