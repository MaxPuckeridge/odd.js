goog.provide('odd');

goog.require('goog.math.Range');

goog.require('odd.problem.Problem');
goog.require('odd.solution.Solution');
goog.require('odd.solution.Vector');
goog.require('odd.odesolver.OdeSolver');
goog.require('odd.odesolver.Euler');
goog.require('odd.ui.Graph');

/**
 * @param {number} t
 * @param {odd.solution.Vector} vector
 * @return {odd.solution.Vector}
 */
decaying_oscillator = function(t, vector) {
  var x = vector.get(0);
  var v = vector.get(1);

  var w = 2*Math.PI/50; //0.02 rad/s
  var zeta = 0.1; //under-damping

  var dx = v;
  var dv = - w * w *x - 2 * zeta * w * v;

  return new odd.solution.Vector([dx, dv]);
}

problem = new odd.problem.Problem(decaying_oscillator, 0, [1, 0], 0.1);
solution = new odd.solution.Solution();
odeSolver = new odd.odesolver.OdeSolver(problem, solution);
graph = new odd.ui.Graph(solution, 1000, 600);
graph.render(document.getElementById('graph'));

odeSolver.solve(-100, 200);