goog.provide('odd.problem.Problem');

goog.require('odd.solution.Point');
goog.require('odd.solution.Vector');

/**
 * Represents an ODE problem to be solved
 * @param {Function} func The derivative described in the problem
 * @param {number} t0 The initial t value
 * @param {Array<number>} v0 The initial variable values
 * @param {number} dt The desired interval in t between points
 * @constructor
 */
odd.problem.Problem = function(func, t0, v0, dt) {
    /** @type {Function} */
    this.func = func;

    /** @type {number} */
    this.t0 = t0;

    /** @type {odd.solution.Vector} */
    this.vector0 = new odd.solution.Vector(v0);

    /** @type {number} */
    this.dt = dt;

    /** @type {odd.solution.Point} */
    this.initialPoint = new odd.solution.Point(this.t0, this.vector0);
};