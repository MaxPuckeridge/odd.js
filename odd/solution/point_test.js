goog.provide('odd.solution.pointTest');
goog.setTestOnly('odd.solution.pointTest');

goog.require('goog.testing.jsunit');

goog.require('odd.solution.Point');
goog.require('odd.data.Vector');

function assertPointsEqual(expected, actual) {
  if (!odd.solution.Point.equals(expected, actual)) {
    assertEquals(expected, actual);
  }
}

function testConstructedObject() {
  var vector = new odd.data.Vector([64,32,16]);
  var point = new odd.solution.Point(23, vector);

  assertEquals(23, point.getT());
  assertEquals(vector, point.getVector());
  assertEquals(3, point.getVLength());
  assertEquals(64, point.getV(0));
  assertEquals(32, point.getV(1));
  assertEquals(16, point.getV(2));
};

function testCreatePoint() {
  var vector = new odd.data.Vector([64,32,16]);
  var pointConstructor = new odd.solution.Point(23, vector);

  var pointHelper = odd.solution.Point.createPoint(23, [64, 32, 16]);

  assertPointsEqual(pointConstructor, pointHelper);
};

function testComparison() {
  var first = odd.solution.Point.createPoint(20, [64, 32, 16]);
  var secondA = odd.solution.Point.createPoint(21, [20, 40, 60]);
  var secondB = odd.solution.Point.createPoint(21, [8, 7, 6]);
  var third = odd.solution.Point.createPoint(22, [2, 4, 8]);

  assertEquals(-1, first.compareTo(secondA));
  assertEquals(-1, first.compareTo(secondB));
  assertEquals(-1, first.compareTo(third));

  assertEquals(1, secondA.compareTo(first));
  assertEquals(0, secondA.compareTo(secondB));
  assertEquals(-1, secondA.compareTo(third));

  assertEquals(1, secondB.compareTo(first));
  assertEquals(0, secondB.compareTo(secondA));
  assertEquals(-1, secondB.compareTo(third));

  assertEquals(1, third.compareTo(first));
  assertEquals(1, third.compareTo(secondA));
  assertEquals(1, third.compareTo(secondB));
};