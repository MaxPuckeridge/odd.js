goog.provide('odd.solver.solverTest');
goog.setTestOnly('odd.solver.solverTest');

goog.require('goog.testing.jsunit');
goog.require('odd.data.Vector');
goog.require('odd.problem.Problem');
goog.require('odd.solution.Solution');
goog.require('odd.solver.Solver');

function testSolve() {
  var solver = new odd.solver.Solver();
  var ode = function(t, state) {
    // exponential growth
    var d1 = state.get(0);

    // exponential decay
    var d2 = -1 * state.get(1);
    return new odd.data.Vector([d1, d2]);
  };
  var initialState = new odd.data.Vector([1, 1]);
  var problem = new odd.problem.Problem(ode, initialState, 0, 0.01);
  var solution = new odd.solution.Solution();

  solver.solve(problem, solution, -1, 1);

  var leftMost = solution.getLeftEdgePoint();
  assertRoughlyEquals(-1, leftMost.getT(), 0.001);
  assertRoughlyEquals(Math.exp(-1), leftMost.getV(0), 0.001);
  assertRoughlyEquals(Math.exp(1), leftMost.getV(1), 0.001);

  var rightMost = solution.getRightEdgePoint();
  assertRoughlyEquals(1, rightMost.getT(), 0.001);
  assertRoughlyEquals(Math.exp(1), rightMost.getV(0), 0.001);
  assertRoughlyEquals(Math.exp(-1), rightMost.getV(1), 0.001);

  assertEquals(201, solution.getLength());
}