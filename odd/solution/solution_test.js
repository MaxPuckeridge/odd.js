goog.provide('odd.solution.solutionTest');
goog.setTestOnly('odd.solution.solutionTest');

goog.require('goog.testing.jsunit');
goog.require('goog.math.Range');

goog.require('odd.solution.Solution');
goog.require('odd.solution.Point');

function assertRangesEqual(expected, actual) {
  if (!goog.math.Range.equals(expected, actual)) {
    assertEquals(expected, actual);
  }
}

function assertPointsEqual(expected, actual) {
  if (!odd.solution.Point.equals(expected, actual)) {
    assertEquals(expected, actual);
  }
}

function testLeftEdgePoint() {
  var solution = new odd.solution.Solution();

  solution.addPoint(odd.solution.Point.createPoint(1, [1, -2]));
  solution.addPoint(odd.solution.Point.createPoint(0, [2, 4]));
  solution.addPoint(odd.solution.Point.createPoint(2, [6, 0]));

  assertPointsEqual(odd.solution.Point.createPoint(0, [2, 4]), solution.getLeftEdgePoint());
}

function testRightEdgePoint() {
  var solution = new odd.solution.Solution();

  solution.addPoint(odd.solution.Point.createPoint(1, [1, -2]));
  solution.addPoint(odd.solution.Point.createPoint(0, [2, 4]));
  solution.addPoint(odd.solution.Point.createPoint(2, [6, 0]));

  assertPointsEqual(odd.solution.Point.createPoint(2, [6, 0]), solution.getRightEdgePoint());
}

function testForEach() {
  var solution = new odd.solution.Solution();

  solution.addPoint(odd.solution.Point.createPoint(1, [1, -2]));
  solution.addPoint(odd.solution.Point.createPoint(0, [2, 4]));
  solution.addPoint(odd.solution.Point.createPoint(2, [6, 0]));

  var array = [];
  solution.forEachPoint(function(point) {
    array.push(point);
  });

  assertEquals(3, array.length);
  assertPointsEqual(odd.solution.Point.createPoint(0, [2, 4]), array[0]);
  assertPointsEqual(odd.solution.Point.createPoint(1, [1, -2]), array[1]);
  assertPointsEqual(odd.solution.Point.createPoint(2, [6, 0]), array[2]);
}

function testTRange() {
  var solution = new odd.solution.Solution();

  solution.addPoint(odd.solution.Point.createPoint(1, [1, -2]));
  solution.addPoint(odd.solution.Point.createPoint(0, [2, 4]));
  solution.addPoint(odd.solution.Point.createPoint(2, [6, 0]));

  assertRangesEqual(new goog.math.Range(0, 2), solution.getTRange());
}

function testVRange() {
  var solution = new odd.solution.Solution();

  solution.addPoint(odd.solution.Point.createPoint(1, [1, -2]));
  solution.addPoint(odd.solution.Point.createPoint(0, [2, 4]));
  solution.addPoint(odd.solution.Point.createPoint(2, [6, 0]));

  assertRangesEqual(new goog.math.Range(1,6), solution.getVRange(0));
  assertRangesEqual(new goog.math.Range(-2, 4), solution.getVRange(1));
}

function testCombinedVRange() {
  var solution = new odd.solution.Solution();

  solution.addPoint(odd.solution.Point.createPoint(1, [1, -2]));
  solution.addPoint(odd.solution.Point.createPoint(0, [2, 4]));
  solution.addPoint(odd.solution.Point.createPoint(2, [6, 0]));

  assertRangesEqual(new goog.math.Range(-2, 6), solution.getCombinedVRange());
}