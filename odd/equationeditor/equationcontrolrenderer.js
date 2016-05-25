goog.provide('odd.equationeditor.EquationControlRenderer');

goog.require('goog.dom.classlist');
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

odd.equationeditor.EquationControlRenderer.prototype.getDeleteBtn = function(element) {
  return element.getElementsByClassName('delete-equation-btn')[0];
};

odd.equationeditor.EquationControlRenderer.prototype.getInput = function(element) {
  return element.getElementsByTagName('input')[0];
};

odd.equationeditor.EquationControlRenderer.prototype.getEquationItem = function(element) {
  return element.getElementsByClassName('odd-equation')[0];
};

odd.equationeditor.EquationControlRenderer.prototype.setContent = function(element, content) {
  this.getInput(element).value = content;
};

odd.equationeditor.EquationControlRenderer.prototype.createDom = function(control) {
  var element = control.getDomHelper().createDom(goog.dom.TagName.LI, "mdl-list__item odd-equation-item");

  var presentationArgs = {
    id: control.getId(),
    equation: control.getEquation().toString(),
    isInvalid: control.getEquation().isInvalid()
  };

  goog.soy.renderElement(element, odd.templates.equationeditor.equationItem, presentationArgs);

  return element;
};

odd.equationeditor.EquationControlRenderer.prototype.updateValue = function(control) {
  var inputElement = this.getInput(control.getElement());
  inputElement.value = control.getEquation().toString();

  var equationItemElement = this.getEquationItem(control.getElement());
  goog.dom.classlist.enable(equationItemElement, 'is-invalid', control.getEquation().isInvalid());
};