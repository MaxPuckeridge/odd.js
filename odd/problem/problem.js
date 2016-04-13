goog.provide('odd.problem.Problem');

goog.require('odd.data.Vector');
goog.require('odd.solution.Point');

/**
 * Represents an ODE problem to be solved
 * @param {function(number, odd.data.Vector):odd.data.Vector} ode The equations describing the problem
 * @param {odd.data.Vector} initialState The initial variable values
 * @param {number} t0 The initial value of t
 * @param {number} dt The desired interval in t between points
 * @constructor
 */
odd.problem.Problem = function(ode, initialState, t0, dt) {
  /** @type {function(number, odd.data.Vector):odd.data.Vector} */
  this.ode = ode;

  /** @type {odd.data.Vector} */
  this.initialState = initialState;

  /** @type {number} */
  this.t0 = t0;

  /** @type {number} */
  this.dt = dt;

  /** @type {odd.solution.Point} */
  this.initialPoint = new odd.solution.Point(this.t0, this.initialState);
};