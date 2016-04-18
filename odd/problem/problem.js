/**
 * @fileoverview A utility class for representing an ODE problem.
 * @author Max Puckeridge
 */

goog.provide('odd.problem.Problem');

goog.require('odd.solution.Point');

/**
 * Represents an ODE problem to be solved by ode.solver.Solver.
 * @param {function(number, odd.data.Vector):odd.data.Vector} ode The equations describing the problem.
 * @param {odd.data.Vector} initialState The initial variable values.
 * @param {number} t0 The initial value of t.
 * @param {number} dt The desired interval in t between points.
 * @constructor
 */
odd.problem.Problem = function(ode, initialState, t0, dt) {
  /**
   * The equations describing the problem.
   * @type {function(number, odd.data.Vector):odd.data.Vector}
   * @private
   */
  this.ode_ = ode;

  /**
   * The initial point of the solution.
   * @type {odd.solution.Point}
   * @private
   */
  this.initialPoint_ = new odd.solution.Point(t0, initialState);

  /**
   * The desired interval in t between points.
   * @type {number}
   * @private
   */
  this.dt_ = dt;
};

/**
 * @return {function(number, odd.data.Vector):odd.data.Vector} The ode to be solved.
 */
odd.problem.Problem.prototype.getOde = function() {
  return this.ode_;
};

/**
 * @return {odd.solution.Point} The initial point.
 */
odd.problem.Problem.prototype.getInitialPoint = function() {
  return this.initialPoint_;
};

/**
 * @return {number} The value of dt.
 */
odd.problem.Problem.prototype.getDt = function() {
  return this.dt_;
};