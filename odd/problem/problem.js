goog.provide('odd.problem.Problem');

goog.require('odd.solution.Point');

/**
 * Represents an ODE problem to be solved
 * @param {Function} func The derivative described in the problem
 * @param {number} t0 The initial value's t value
 * @param {number} y0 The initial value's y value
 * @param {number} dt The desired interval in t between points
 * @constructor
 */
odd.problem.Problem = function(func, t0, y0, dt) {
    /** @type {Function} */
    this.func = func;

    /** @type {number} */
    this.t0 = t0;

    /** @type {number} */
    this.y0 = y0;

    /** @type {number} */
    this.dt = dt;
};

/**
 * Returns the problem's initial point
 * @return {odd.solution.Point}
 */
odd.problem.Problem.prototype.getInitialPoint = function() {
    return new odd.solution.Point(this.t0, this.y0);
};