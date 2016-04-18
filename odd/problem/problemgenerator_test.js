goog.provide('odd.problem.problemGeneratorTest');
goog.setTestOnly('odd.problem.problemGeneratorTest');

goog.require('goog.testing.jsunit');
goog.require('odd.data.Vector');
goog.require('odd.problem.Problem');
goog.require('odd.problem.ProblemGenerator');
goog.require('odd.solution.Point');

function assertPointsEqual(expected, actual) {
  if (!odd.solution.Point.equals(expected, actual)) {
    assertEquals(expected, actual);
  }
}

function testConstructedObject() {
  var ode = function() {};
  var odeGenerator = function() { return ode; };
  var initialState = new odd.data.Vector([24, 12, 6, 3]);
  var initialStateGenerator = function() { return initialState; };
  var initialPoint = new odd.solution.Point(10, initialState);
  var problemGenerator = new odd.problem.ProblemGenerator(odeGenerator, initialStateGenerator, 10, 0.1);
  var problem = problemGenerator.generate();

  assertEquals(0.1, problem.getDt());
  assertPointsEqual(initialPoint, problem.getInitialPoint());
  assertEquals(ode, problem.getOde());
}