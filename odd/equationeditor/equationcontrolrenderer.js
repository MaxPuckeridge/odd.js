goog.provide('odd.equationeditor.EquationControlRenderer');

goog.require('goog.dom.TagName');
goog.require('goog.ui.ControlRenderer');

goog.require('odd.templates.equationeditor')

/**
 *
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
odd.equationeditor.EquationControlRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(odd.equationeditor.EquationControlRenderer, goog.ui.ControlRenderer);

odd.equationeditor.EquationControlRenderer.prototype.createDom = function(control) {
  var element = control.getDomHelper().createDom(goog.dom.TagName.LI, "mdl-list__item odd-equation-item");

  var presentationArgs = {
    id: control.getId(),
    equation: control.getContent()
  };

  goog.soy.renderElement(element, odd.templates.equationeditor.equationItem, presentationArgs);

  return element;
};
