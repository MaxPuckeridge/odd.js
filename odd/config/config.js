goog.provide('odd.config.Config');

goog.require('odd.config.ControlsConfig');
goog.require('odd.config.GraphConfig');
goog.require('odd.config.OdeSystemConfig');

/**
 * User defined configuration to be rendered.
 * @constructor
 */
odd.config.Config = function(){
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
odd.config.Config.prototype.getOdeSystemConfig = function() {
  return this.odeSystemConfig_;
};

/**
 * @return {odd.config.GraphConfig} The graph config.
 */
odd.config.Config.prototype.getGraphConfig= function() {
  return this.graphConfig_;
};

/**
 * @return {odd.config.ControlsConfig} The controls config.
 */
odd.config.Config.prototype.getControlsConfig = function() {
  return this.controlsConfig_;
};

/**
 * @return {odd.system.OdeSystem} Generate an ode system from the config.
 */
odd.config.Config.prototype.makeSystem = function() {
  return this.odeSystemConfig_.toSystem();
};

/**
 * @return {odd.graph.Graph} Generate a graph from the config.
 */
odd.config.Config.prototype.makeGraph= function() {
  return this.graphConfig_.toGraph();
};

/**
 * @return {odd.controls.Controls} Generate a set of controls from the config.
 */
odd.config.Config.prototype.makeControls = function() {
  return this.controlsConfig_.toControls();
};