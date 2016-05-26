goog.provide('odd.graphoptions.GraphRangeControl');

goog.require('goog.ui.Control');

goog.require('odd.graphoptions.GraphRangeControlRenderer');

/**
 * @param {odd.data.GraphOptions} graphOptions
 * @constructor
 * @extends {goog.ui.Control}
 */
odd.graphoptions.GraphRangeControl = function(graphOptions) {
  goog.ui.Control.call(this, "", new odd.graphoptions.GraphRangeControlRenderer(), null);

  this.graphOptions_ = graphOptions;

  this.setAllowTextSelection(true);
};
goog.inherits(odd.graphoptions.GraphRangeControl, goog.ui.Control);

odd.graphoptions.GraphRangeControl.prototype.getGraphOptions = function() {
  return this.graphOptions_;
};

odd.graphoptions.GraphRangeControl.prototype.enterDocument = function() {
  odd.graphoptions.GraphRangeControl.superClass_.enterDocument.call(this);

  var leftInputElement = this.getRenderer().getLeftInput(this.getElement());
  this.getHandler().listen(leftInputElement, goog.events.EventType.CHANGE, function() {
    this.graphOptions_.left = leftInputElement.value;
  });

  var rightInputElement = this.getRenderer().getRightInput(this.getElement());
  this.getHandler().listen(rightInputElement, goog.events.EventType.CHANGE, function() {
    this.graphOptions_.right = rightInputElement.value;
  });

  var topInputElement = this.getRenderer().getTopInput(this.getElement());
  this.getHandler().listen(topInputElement, goog.events.EventType.CHANGE, function() {
    this.graphOptions_.top = topInputElement.value;
  });

  var bottomInputElement = this.getRenderer().getBottomInput(this.getElement());
  this.getHandler().listen(bottomInputElement, goog.events.EventType.CHANGE, function() {
    this.graphOptions_.bottom = bottomInputElement.value;
  });

  window["componentHandler"]["upgradeElements"](this.getElement());
};