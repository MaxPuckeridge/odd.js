goog.provide('odd.data.Ode');
goog.provide('odd.data.Ode.SolutionReadyEvent');

goog.require('goog.events.EventTarget');
goog.require('odd.solver.Solution');

/**
 *
 * Defines the ODE to be solved
 *
 * @param odeSolver
 * @param derivativeFn
 *
 * @constructor
 * @extends {goog.events.EventTarget}
 *
 */
odd.data.Ode = function(odeSolver, derivativeFn) {
    goog.events.EventTarget.call(this);
    this.odeSolver = odeSolver;
    this.derivativeFn = derivativeFn;
    this.solution = new odd.solver.Solution();
};
goog.inherits(odd.data.Ode, goog.events.EventTarget);

/**
 * @const
 */
odd.data.Ode.SolutionReadyEvent = "solutionready";

odd.data.Ode.prototype.solve = function(y0, x0, x1, dx) {
    this.solution.addPoints(this.odeSolver(this.derivativeFn, y0, x0, x1, dx));
    this.dispatchEvent(odd.data.Ode.SolutionReadyEvent);
};

odd.data.Ode.prototype.getSolution = function() {
    return this.solution;
};