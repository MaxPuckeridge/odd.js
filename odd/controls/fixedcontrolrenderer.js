goog.provide('odd.controls.FixedControlRenderer');

goog.require('goog.dom.TagName');
goog.require('goog.ui.ControlRenderer');
goog.require('goog.soy');

goog.require('odd.templates.controls');

/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
odd.controls.FixedControlRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(odd.controls.FixedControlRenderer, goog.ui.ControlRenderer);

odd.controls.FixedControlRenderer.CLASS_NAME = "odd-fixed-control";

odd.controls.FixedControlRenderer.prototype.createDom = function(control) {
  var element = control.getDomHelper().createDom(goog.dom.TagName.DIV,
      odd.controls.FixedControlRenderer.CLASS_NAME);

  var presentationArgs = {
    variableName: control.getVariableName(),
    value: control.getValue(),
    variableUnit: control.getVariableUnit(),
  };
  goog.soy.renderElement(element, odd.templates.controls.fixedControl, presentationArgs);

  return element;
};