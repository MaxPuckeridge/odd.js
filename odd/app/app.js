goog.provide('odd.app.App');

goog.require('goog.ui.Component');
goog.require('goog.history.Html5History');
goog.require('goog.history.EventType');

goog.require('odd.startcontent.StartContent');
goog.require('odd.equationeditor.EquationEditor');
goog.require('odd.app.ViewContent');
goog.require('odd.examples.oscillator');
goog.require('odd.uri.Uri');

/**
 * The odd App.
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.app.App = function() {
  goog.ui.Component.call(this);

  this.history_ = new goog.history.Html5History();

  goog.events.listen(this.history_, goog.history.EventType.NAVIGATE, this.onNavigate, null, this);
};
goog.inherits(odd.app.App, goog.ui.Component);

odd.app.App.CLASS_NAME = "odd-app";

odd.app.App.Routes = {
  START: /^/,
  DEMO: /^\/demo\//,
  EQUATION_EDITOR: /^\/edit\/equations\//,
  VARIABLE_EDITOR: /^\/edit\/variables\//,
  VIEW_SETTINGS_EDITOR: /^\/edit\/view\//,
  VIEW: /^\/view\//
};

odd.app.App.prototype.onNavigate = function(evt) {
  var token = evt.token;
  var uri = new odd.uri.Uri(token);

  if (odd.app.App.Routes.EQUATION_EDITOR.test(token)) {
    this.renderEquationEditor(uri);
    return;
  }

  if (odd.app.App.Routes.VIEW.test(token)) {
    this.renderViewContent(uri);
    return;
  }

  this.renderStartContent();
};

odd.app.App.prototype.renderViewContent = function(uri) {
  // get app config from token params
  var config = odd.examples.oscillator;

  var system = config.makeSystem();
  var graph = config.makeGraph();
  var controls = config.makeControls();

  var content = new odd.app.ViewContent(system, graph, controls);

  this.swapContent(content);
  content.draw();
};

odd.app.App.prototype.renderStartContent = function() {
  this.swapContent(new odd.startcontent.StartContent());
};

odd.app.App.prototype.renderEquationEditor = function(uri) {
  this.swapContent(new odd.equationeditor.EquationEditor(uri));
};

odd.app.App.prototype.swapContent = function(content) {
  if (this.currentContent_) {
    this.currentContent_.dispose();
  }

  this.currentContent_ = content;
  this.currentContent_.render(this.getElement());
};

odd.app.App.prototype.createDom = function() {
  this.element_ = this.getDomHelper().createDom(goog.dom.TagName.DIV, odd.app.App.CLASS_NAME);
};

odd.app.App.prototype.enterDocument = function() {
  odd.app.App.superClass_.enterDocument.call(this);
  this.history_.setEnabled(true);
};
