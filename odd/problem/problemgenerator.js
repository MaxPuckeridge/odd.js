goog.provide('odd.problem.ProblemGenerator');

goog.require('goog.structs.Map');

goog.require('odd.data.Vector');
goog.require('odd.problem.Problem');

/**
 * Generates a problem
 * @param {Function} odeGenerator Generates the ode function of a problem
 * @param {Function} initialStateGenerator Generates the initial state vector of a problem
 * @param {number} t0 The initial value of t
 * @param {number} dt The desired interval in t between points
 * @constructor
 */
odd.problem.ProblemGenerator = function(odeGenerator, initialStateGenerator, t0, dt) {
  /** @type {Function} */
  this.odeGenerator = odeGenerator;

  /** @type {Function} */
  this.initialStateGenerator = initialStateGenerator;

  /** @type {number} */
  this.t0 = t0;

  /** @type {number} */
  this.dt = dt;
};

/**
 * @param {odd.data.Vector} params
 * @return {odd.problem.Problem}
 */
odd.problem.ProblemGenerator.prototype.generate = function(params) {
  var ode = this.odeGenerator(params);
  var initialState = this.initialStateGenerator(params);

  return new odd.problem.Problem(ode, initialState, this.t0, this.dt);
};