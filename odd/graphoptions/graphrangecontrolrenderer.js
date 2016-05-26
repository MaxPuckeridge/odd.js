goog.provide('odd.graphoptions.GraphRangeControlRenderer');

goog.require('goog.dom.TagName');
goog.require('goog.ui.ControlRenderer');

goog.require('odd.templates.graphoptions')

/**
 * @constructor
 * @extends {goog.ui.ControlRenderer}
 */
odd.graphoptions.GraphRangeControlRenderer = function() {
  goog.ui.ControlRenderer.call(this);
};
goog.inherits(odd.graphoptions.GraphRangeControlRenderer, goog.ui.ControlRenderer);

odd.graphoptions.GraphRangeControlRenderer .prototype.createDom = function(control) {
  var presentationArgs = {
    id: control.getId(),
    left: control.getGraphOptions().left || "",
    right: control.getGraphOptions().right || "",
    top: control.getGraphOptions().top || "",
    bottom: control.getGraphOptions().bottom || "",
  };

  return goog.soy.renderAsElement(odd.templates.graphoptions.rangeControl, presentationArgs);
};

odd.graphoptions.GraphRangeControlRenderer.prototype.getLeftInput = function(element) {
  return element.getElementsByTagName('input')[0];
};

odd.graphoptions.GraphRangeControlRenderer.prototype.getRightInput = function(element) {
  return element.getElementsByTagName('input')[1];
};

odd.graphoptions.GraphRangeControlRenderer.prototype.getTopInput = function(element) {
  return element.getElementsByTagName('input')[2];
};

odd.graphoptions.GraphRangeControlRenderer.prototype.getBottomInput = function(element) {
  return element.getElementsByTagName('input')[3];
};