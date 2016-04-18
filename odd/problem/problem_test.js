goog.provide('odd.problem.problemTest');
goog.setTestOnly('odd.problem.problemTest');

goog.require('goog.testing.jsunit');
goog.require('odd.data.Vector');
goog.require('odd.problem.Problem');
goog.require('odd.solution.Point');

function assertPointsEqual(expected, actual) {
  if (!odd.solution.Point.equals(expected, actual)) {
    assertEquals(expected, actual);
  }
}

function testConstructedObject() {
  var ode = function() {};
  var initialState = new odd.data.Vector([24, 12, 6, 3]);
  var initialPoint = new odd.solution.Point(10, initialState);

  var problem = new odd.problem.Problem(ode, initialState, 10, 0.1);

  assertEquals(0.1, problem.getDt());
  assertPointsEqual(initialPoint, problem.getInitialPoint());
  assertEquals(ode, problem.getOde());
}