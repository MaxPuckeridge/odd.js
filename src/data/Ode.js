goog.provide('odd.data.Ode');

/**
 *
 * Defines the ODE to be solved
 *
 * @param odeSolver
 * @param derivativeFn
 *
 * @constructor
 */
odd.data.Ode = function(odeSolver, derivativeFn) {
  this.odeSolver = odeSolver;
  this.derivativeFn = derivativeFn;
  this.solution = null;
}

odd.data.Ode.prototype.solve = function(y0, x0, x1, dx) {
  this.solution = this.odeSolver(this.derivativeFn, y0, x0, x1, dx);
}