goog.provide('odd.controls.FixedControlRenderer');

goog.require('goog.dom.TagName');
goog.require('goog.ui.ControlRenderer');
goog.require('goog.soy');
goog.require('goog.string');

/**
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
odd.controls.FixedControlRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(odd.controls.FixedControlRenderer, goog.ui.ControlRenderer);

odd.controls.FixedControlRenderer.CLASS_NAME = "odd-fixed-control";

odd.controls.FixedControlRenderer.TEMPLATE = function(data) {
  var output = "";
  output += "<span class='odd-variable-name'>" + goog.string.htmlEscape(data.variableName) + "</span>";
  output += "<span class='odd-variable-value'>" + data.value + "</span>";
  output += "<span class='odd-variable-unit'>" + goog.string.htmlEscape(data.variableUnit) + "</span>";
  return output;
};

odd.controls.FixedControlRenderer.prototype.createDom = function(control) {
  var element = control.getDomHelper().createDom(goog.dom.TagName.DIV,
      odd.controls.FixedControlRenderer.CLASS_NAME);

  var presentationArgs = {
    variableName: control.getVariableName(),
    value: control.getValue(),
    variableUnit: control.getVariableUnit(),
  };
  goog.soy.renderElement(element, odd.controls.FixedControlRenderer.TEMPLATE, presentationArgs);

  return element;
};