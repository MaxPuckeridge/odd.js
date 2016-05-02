goog.provide('odd.system.problemSolutionPairTest');
goog.setTestOnly('odd.system.problemSolutionPairTest');

goog.require('goog.testing.jsunit');
goog.require('odd.problem.Problem');
goog.require('odd.solution.Solution');
goog.require('odd.system.ProblemSolutionPair');

function testConstructedObject() {
  var ode = function() {};
  var initialState = new odd.data.Vector([24, 12, 6, 3]);
  var problem = new odd.problem.Problem(ode, initialState, 10, 0.1);
  var problemSolutionPair = new odd.system.ProblemSolutionPair(problem);

  assertEquals(problem, problemSolutionPair.getProblem());
  var solution = problemSolutionPair.getSolution();
  assertTrue('is an instance of odd.solution.Solution', solution instanceof odd.solution.Solution);
  assertEquals('solution is empty to begin with', 0, solution.getLength());
}