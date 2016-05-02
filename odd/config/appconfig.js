goog.provide('odd.config.AppConfig');

goog.require('odd.app.App');
goog.require('odd.config.ControlsConfig');
goog.require('odd.config.GraphConfig');
goog.require('odd.config.OdeSystemConfig');

/**
 * Configuration for an App.
 * @constructor
 */
odd.config.AppConfig = function(){
  /**
   * Config that governs the Ode System.
   * @type {odd.config.OdeSystemConfig}
   * @private
   */
  this.odeSystemConfig_ = new odd.config.OdeSystemConfig();

  /**
   * Config that governs the Graph.
   * @type {odd.config.GraphConfig}
   * @private
   */
  this.graphConfig_ = new odd.config.GraphConfig();

  /**
   * Config that governs the Controls.
   * @type {odd.config.ControlsConfig}
   * @private
   */
  this.controlsConfig_ = new odd.config.ControlsConfig();
};

/**
 * @return {odd.config.OdeSystemConfig} The ode system config.
 */
odd.config.AppConfig.prototype.getOdeSystemConfig = function() {
  return this.odeSystemConfig_;
};

/**
 * @return {odd.config.GraphConfig} The graph config.
 */
odd.config.AppConfig.prototype.getGraphConfig= function() {
  return this.graphConfig_;
};

/**
 * @return {odd.config.ControlsConfig} The controls config.
 */
odd.config.AppConfig.prototype.getControlsConfig = function() {
  return this.controlsConfig_;
};

/**
 * Creates a new App from this config.
 * @return {odd.app.App}
 */
odd.config.AppConfig.prototype.toApp = function() {
  var odeSystem = /* @type {odd.system.OdeSystem} */ this.odeSystemConfig_.toSystem();
  var graph = /* @type {odd.graph.Graph} */ this.graphConfig_.toGraph();
  var controls = /* @type {odd.controls.Controls} */ this.controlsConfig_.toControls();
  return new odd.app.App(odeSystem, graph, controls);
};