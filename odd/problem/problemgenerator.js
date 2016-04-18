/**
 * @fileoverview A utility class for representing a generator of ODE problems.
 * @author Max Puckeridge
 */

goog.provide('odd.problem.ProblemGenerator');

goog.require('odd.data.Vector');
goog.require('odd.problem.Problem');

/**
 * Generates problems from an abstract definition of one. E.g., the ODE described by
 * x'[t] = -k *x[t] has parameter k, that is independent of t and can potentially be
 * any real number. This class represents the generalized ODE in which the value of k
 * is left as a  unknown constant to be determined at a later time. When generate(params)
 * is called, the value of k is included provided and  a problem in which the ODE is solely
 * containing dependent variables and t is returned. This is the form of problem that the
 * odd.solver.Solver expects to solve.
 * @param {Function} odeGenerator Generates the ode function of a problem.
 * @param {Function} initialStateGenerator Generates the initial state vector of a problem.
 * @param {number} t0 The initial value of t.
 * @param {number} dt The desired interval in t between points.
 * @constructor
 */
odd.problem.ProblemGenerator = function(odeGenerator, initialStateGenerator, t0, dt) {
  /**
   * A function that generates the ode function of a problem.
   * @type {Function}
   * @private
   */
  this.odeGenerator_ = odeGenerator;

  /**
   * A function that generates the initial state of a problem.
   * @type {Function}
   * @private
   */
  this.initialStateGenerator_ = initialStateGenerator;

  /**
   * The initial value of t.
   * @type {number}
   * @private
   */
  this.t0_ = t0;

  /**
   * The desired interval in t between points.
   * @type {number}
   * @private
   */
  this.dt_ = dt;
};

/**
 * Creates a concrete problem from an abstract one (defined by the ode and initial state
 * generators). See constructor comment for more detailed explanation.
 * @param {odd.data.Vector} params
 * @return {odd.problem.Problem}
 */
odd.problem.ProblemGenerator.prototype.generate = function(params) {
  var ode = this.odeGenerator_(params);
  var initialState = this.initialStateGenerator_(params);
  return new odd.problem.Problem(ode, initialState, this.t0_, this.dt_);
};