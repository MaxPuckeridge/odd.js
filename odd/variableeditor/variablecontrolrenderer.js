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

odd.variableeditor.VariableControlRenderer.prototype.createDom = function(control) {
  var element = control.getDomHelper().createDom(goog.dom.TagName.LI, "mdl-list__item odd-variable-item");

  var presentationArgs = {
    id: control.getId(),
    variable: control.getContent()
  };

  goog.soy.renderElement(element, odd.templates.variableeditor.variableItem, presentationArgs);

  return element;
};
