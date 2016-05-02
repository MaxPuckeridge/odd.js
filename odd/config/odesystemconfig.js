goog.provide('odd.config.OdeSystemConfig');

goog.require('odd.system.OdeSystem');

/**
 * Configuration for an ODE system.
 * @constructor
 */
odd.config.OdeSystemConfig = function(){
  /**
   * The config's problem generator.
   * @type {odd.problem.ProblemGenerator}
   * @private
   */
  this.problemGenerator_ = null;

  /**
   * The config's t range.
   * @type {goog.math.Range}
   * @private
   */
  this.tRange_ = null;

  /**
   * The config's solver method.
   * @type {Function}
   * @private
   */
  this.method_ = null;
};

/**
 * Sets the config's problem generator.
 * @param {odd.problem.ProblemGenerator} problemGenerator
 */
odd.config.OdeSystemConfig.prototype.setProblemGenerator = function(problemGenerator) {
  this.problemGenerator_ = problemGenerator;
};

/**
 * Sets the config's t range.
 * @param {goog.math.Range} tRange
 */
odd.config.OdeSystemConfig.prototype.setTRange = function(tRange) {
  this.tRange_ = tRange;
};

/**
 * Sets the config's solver method.
 * @param {Function} method
 */
odd.config.OdeSystemConfig.prototype.setMethod = function(method) {
  this.method_ = method;
};

/**
 * Creates a new ode system from this config.
 * @return {odd.system.OdeSystem}
 */
odd.config.OdeSystemConfig.prototype.toSystem = function() {
  return new odd.system.OdeSystem(this.problemGenerator_, this.tRange_, this.method_);
};