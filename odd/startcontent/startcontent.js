goog.provide('odd.startcontent.StartContent');

goog.require('goog.ui.Component');
goog.require('odd.templates.startcontent');

/**
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.startcontent.StartContent = function() {
  goog.ui.Component.call(this);
};
goog.inherits(odd.startcontent.StartContent, goog.ui.Component);

odd.startcontent.StartContent.prototype.createDom = function() {
  this.element_ = goog.soy.renderAsElement(odd.templates.startcontent.startCard);
};

odd.startcontent.StartContent.prototype.enterDocument = function() {
  odd.startcontent.StartContent.superClass_.enterDocument.call(this);

  window["componentHandler"]["upgradeElements"](this.getElement());
}