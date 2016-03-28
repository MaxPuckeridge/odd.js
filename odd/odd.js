goog.provide('odd');

goog.require('goog.math.Range');

goog.require('odd.problem.Problem');
goog.require('odd.solution.Solution');
goog.require('odd.odesolver.OdeSolver');
goog.require('odd.ui.Graph');

exp_decay = function(x, y) {
  return -5*Math.sin(0.4*x) - 0.02*y;
}

problem = new odd.problem.Problem(exp_decay, -100, 650, 0.1);
solution = new odd.solution.Solution();

odeSolver = new odd.odesolver.OdeSolver(problem, solution);

graph = new odd.ui.Graph(solution, 600, 600);
graph.render(document.getElementById('graph'));

odeSolver.solve(-100, 200);
