goog.provide('odd.examples.ExampleContent');

goog.require('goog.ui.Component');
goog.require('goog.object');

goog.require('odd.templates.examples');
goog.require('odd.examples.data');

/**
 * @param {goog.history.Html5History} history
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.examples.ExampleContent = function(history) {
  this.history_ = history;

  goog.ui.Component.call(this);
};
goog.inherits(odd.examples.ExampleContent, goog.ui.Component);

odd.examples.ExampleContent.prototype.createDom = function() {
  this.element_ = goog.soy.renderAsElement(odd.templates.examples.examplesCard);

  var container = this.getElement().getElementsByClassName('odd-examples-container')[0];
  goog.object.forEach(odd.examples.data, function(data, name) {
    var presentationArgs = {
      name: name,
      data: data
    };

    var element = goog.soy.renderAsElement(odd.templates.examples.item, presentationArgs);
    container.appendChild(element);
  });
};

odd.examples.ExampleContent.prototype.enterDocument = function() {
  odd.examples.ExampleContent.superClass_.enterDocument.call(this);

  window["componentHandler"]["upgradeElements"](this.getElement());
}