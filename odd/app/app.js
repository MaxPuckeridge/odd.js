goog.provide('odd.app.App');

goog.require('goog.history.EventType');
goog.require('goog.history.Html5History');
goog.require('goog.ui.Component');

goog.require('odd.equationeditor.EquationEditor');
goog.require('odd.examples.ExampleContent');
goog.require('odd.graphoptions.GraphOptionsEditor');
goog.require('odd.startcontent.StartContent');
goog.require('odd.uri.Uri');
goog.require('odd.variableeditor.VariableEditor');
goog.require('odd.view.ViewContent');

/**
 * The odd App.
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.app.App = function() {
  goog.ui.Component.call(this);

  /**
   * The history object. Only instantiated once per page load.
   * @type {goog.history.Html5History}
   * @private
   */
  this.history_ = new goog.history.Html5History();

  /**
   * The current component being shown.
   * @type {goog.ui.Component}
   * @private
   */
   this.currentContent_ = null;

  goog.events.listen(this.history_, goog.history.EventType.NAVIGATE, this.onNavigate_, null, this);
  goog.events.listen(this.history_, goog.history.EventType.HASHCHANGE, this.onNavigate_, null, this);
};
goog.inherits(odd.app.App, goog.ui.Component);

// @type {string}
odd.app.App.CLASS_NAME = "odd-app";

/**
 * @enum {RegExp}
 */
odd.app.App.Routes = {
  START: /^/,
  EXAMPLES: /^\/examples\//,
  EQUATION_EDITOR: /^\/edit\/equations\//,
  VARIABLE_EDITOR: /^\/edit\/variables\//,
  GRAPH_OPTIONS_EDITOR: /^\/edit\/graph-options\//,
  VIEW: /^\/view\//
};

/**
 * Event handler for changing route
 * @param {goog.events.Event} evt
 * @private
 */
odd.app.App.prototype.onNavigate_ = function(evt) {
  // @type {string} query parameters
  var token = evt.token;

  // @type {odd.uri.Uri}
  var uri = new odd.uri.Uri(token);

  if (odd.app.App.Routes.EQUATION_EDITOR.test(token)) {
    this.renderEquationEditor_(uri);
    return;
  }

  if (odd.app.App.Routes.VARIABLE_EDITOR.test(token)) {
    this.renderVariableEditor_(uri);
    return;
  }

  if (odd.app.App.Routes.GRAPH_OPTIONS_EDITOR.test(token)) {
    this.renderGraphOptionsEditor_(uri);
    return;
  }

  if (odd.app.App.Routes.VIEW.test(token)) {
    this.renderViewContent_(uri);
    return;
  }

  if (odd.app.App.Routes.EXAMPLES.test(token)) {
    this.renderExamplesContent_();
    return;
  }

  this.renderStartContent_();
};

/**
 * Renders the solution to an ode on a graph.
 * @param {odd.uri.Uri} uri
 * @private
 */
odd.app.App.prototype.renderViewContent_ = function(uri) {
  this.swapContent_(new odd.view.ViewContent(this.history_, uri));
};

/**
 * Renders the starting page.
 * @private
 */
odd.app.App.prototype.renderStartContent_ = function() {
  this.swapContent_(new odd.startcontent.StartContent(this.history_));
};

/**
 * Renders a list of example odes.
 * @private
 */
odd.app.App.prototype.renderExamplesContent_ = function() {
  this.swapContent_(new odd.examples.ExampleContent(this.history_));
};

/**
 * Renders the equation editor.
 * @param {odd.uri.Uri} uri
 * @private
 */
odd.app.App.prototype.renderEquationEditor_ = function(uri) {
  this.swapContent_(new odd.equationeditor.EquationEditor(this.history_, uri));
};

/**
 * Renders the variable editor.
 * @param {odd.uri.Uri} uri
 * @private
 */
odd.app.App.prototype.renderVariableEditor_ = function(uri) {
  this.swapContent_(new odd.variableeditor.VariableEditor(this.history_, uri));
};

/**
 * Renders the graph options editor.
 * @param {odd.uri.Uri} uri
 * @private
 */
odd.app.App.prototype.renderGraphOptionsEditor_ = function(uri) {
  this.swapContent_(new odd.graphoptions.GraphOptionsEditor(this.history_, uri));
};

/**
 * Renders the the provided content, and disposes
 * of any existing content.
 * @param {goog.ui.Component} content
 * @private
 */
odd.app.App.prototype.swapContent_ = function(content) {
  if (this.currentContent_) {
    this.currentContent_.dispose();
  }

  this.currentContent_ = content;
  this.currentContent_.render(this.getElement());
};

/**
 * Creates the apps DOM.  Overrides {@link goog.ui.Component#createDom}.
 */
odd.app.App.prototype.createDom = function() {
  this.element_ = this.getDomHelper().createDom(goog.dom.TagName.DIV, odd.app.App.CLASS_NAME);
};

/**
 * Configures the component after its DOM has been rendered, and sets up event
 * handling. Overrides {@link goog.ui.Component#enterDocument}.
 * @override
 */
odd.app.App.prototype.enterDocument = function() {
  odd.app.App.superClass_.enterDocument.call(this);
  this.history_.setEnabled(true);
};