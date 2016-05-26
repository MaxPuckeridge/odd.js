goog.provide('odd.graphoptions.GraphOptionsEditor');

goog.require('goog.ui.Component');

goog.require('odd.data.GraphOptions');
goog.require('odd.graphoptions.GraphRangeControl');
goog.require('odd.templates.graphoptions');

/**
 * @param {goog.history.Html5History} history
 * @param {odd.uri.Uri} uri
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.graphoptions.GraphOptionsEditor = function(history, uri) {
  goog.ui.Component.call(this);

  this.history_ = history;
  this.uri_ = uri;

  this.graphOptions_ =  graphOptions = uri.getGraphOptions() || new odd.data.GraphOptions();

  this.rangeControl = new odd.graphoptions.GraphRangeControl(graphOptions);
};
goog.inherits(odd.graphoptions.GraphOptionsEditor, goog.ui.Component);

odd.graphoptions.GraphOptionsEditor.prototype.createDom = function() {
  this.element_ = goog.soy.renderAsElement(odd.templates.graphoptions.editor);
};

odd.graphoptions.GraphOptionsEditor.prototype.getGraphRangeContainer = function(element) {
  return element.getElementsByClassName('graph-range-container')[0];
};

odd.graphoptions.GraphOptionsEditor.prototype.render = function(opt_parentElement) {
  odd.graphoptions.GraphOptionsEditor.superClass_.render.call(this, opt_parentElement);
  this.rangeControl.render(this.getGraphRangeContainer(this.getElement()));
};

odd.graphoptions.GraphOptionsEditor.prototype.getForwardButton = function(element) {
  return element.getElementsByClassName('forward-btn')[0];
};

odd.graphoptions.GraphOptionsEditor.prototype.getBackButton = function(element) {
  return element.getElementsByClassName('back-btn')[0];
};

odd.graphoptions.GraphOptionsEditor.prototype.enterDocument = function() {
  odd.graphoptions.GraphOptionsEditor.superClass_.enterDocument.call(this);

  var backButtonElement = this.getBackButton(this.getElement());
  this.getHandler().listen(backButtonElement, goog.events.EventType.CLICK, function() {
    this.uri_.setGraphOptions(this.graphOptions_);
    this.history_.replaceToken(this.uri_.toString());

    this.uri_.setPath('/edit/variables/');
    this.history_.setToken(this.uri_.toString());
  });

  var forwardButtonElement = this.getForwardButton(this.getElement());
  this.getHandler().listen(forwardButtonElement, goog.events.EventType.CLICK, function() {
    this.uri_.setGraphOptions(this.graphOptions_);
    this.history_.replaceToken(this.uri_.toString());

    this.uri_.setPath('/view/');
    this.history_.setToken(this.uri_.toString());
  });

  window["componentHandler"]["upgradeElements"](this.getElement());
}