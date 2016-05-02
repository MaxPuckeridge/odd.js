goog.provide('odd.graph.graphTest');
goog.setTestOnly('odd.graph.graphTest');

goog.require('goog.testing.jsunit');
goog.require('odd.graph.Graph');
goog.require('odd.solution.Point');
goog.require('odd.solution.Solution');

var graph;

function setUp() {
  graph = new odd.graph.Graph(2000, 1000);
}

function test_drawSolution() {
  var solution = new odd.solution.Solution();
  solution.addPoint(odd.solution.Point.create(-3, [-3, 13]));
  solution.addPoint(odd.solution.Point.create(-2, [-2, 12]));
  solution.addPoint(odd.solution.Point.create(-1, [-1, 11]));
  solution.addPoint(odd.solution.Point.create(0, [0, 10]));
  solution.addPoint(odd.solution.Point.create(1, [1, 9]));
  solution.addPoint(odd.solution.Point.create(2, [2, 8]));
  solution.addPoint(odd.solution.Point.create(3, [3, 7]));
  solution.addPoint(odd.solution.Point.create(4, [4, 6]));

  graph.drawSolution(solution);
}