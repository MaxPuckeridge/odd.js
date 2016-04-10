goog.provide('odd.solution.vectorTest');
goog.setTestOnly('odd.solution.vectorTest');

goog.require('goog.testing.jsunit');

goog.require('odd.solution.Vector');

function assertVectorEquals(a, b) {
  assertTrue(b + ' should be equal to ' + a, odd.solution.Vector.equals(a, b));
}

function testAddScalar() {
  var v1 = new odd.solution.Vector([1, 2, 3]);
  var v2 = v1.addScalar(2);

  assertNotEquals(v1, v2);
  assertTrue('is an instance of odd.solution.Vector', v2 instanceof odd.solution.Vector);
  assertVectorEquals(new odd.solution.Vector([3, 4, 5]), v2);
}

function testMultiplyScalar() {
  var v1 = new odd.solution.Vector([1, 2, 3]);
  var v2 = v1.multiplyScalar(2);

  assertNotEquals(v1, v2);
  assertTrue('is an instance of odd.solution.Vector', v2 instanceof odd.solution.Vector);
  assertVectorEquals(new odd.solution.Vector([2, 4, 6]), v2);
}

function testAddVector() {
  var v1 = new odd.solution.Vector([1, 2, 3]);
  var v2 = v1.addVector(new odd.solution.Vector([-1, 2, 7]));

  assertNotEquals(v1, v2);
  assertTrue('is an instance of odd.solution.Vector', v2 instanceof odd.solution.Vector);
  assertVectorEquals(new odd.solution.Vector([0, 4, 10]), v2);
}

function testAddVector_throwsWhenDifferentLengths() {
  var v1 = new odd.solution.Vector([1, 2, 3]);
  var e = assertThrows(function() {
    v1.addVector(new odd.solution.Vector([-1, 2, 7, 8]));
  });
  assertEquals('Cannot add two vectors that do not match in length', e.message);
}

function testMultiplyVector() {
  var v1 = new odd.solution.Vector([1, 2, 3]);
  var v2 = v1.multiplyVector(new odd.solution.Vector([-1, 2, 7]));

  assertNotEquals(v1, v2);
  assertTrue('is an instance of odd.solution.Vector', v2 instanceof odd.solution.Vector);
  assertVectorEquals(new odd.solution.Vector([-1, 4, 21]), v2);
}

function testMultiplyVector_throwsWhenDifferentLengths() {
  var v1 = new odd.solution.Vector([1, 2, 3]);
  var e = assertThrows(function() {
    v1.multiplyVector(new odd.solution.Vector([-1, 2, 7, 8]));
  });
  assertEquals('Cannot multiply two vectors that do not match in length', e.message);
}

function testVectorEquals() {
  var v1 = new odd.solution.Vector([1,2,3]);
  assertTrue(odd.solution.Vector.equals(v1, v1));
  assertTrue(odd.solution.Vector.equals(v1, new odd.solution.Vector([1,2,3])));
  assertFalse(odd.solution.Vector.equals(v1, new odd.solution.Vector([3,2,1])));
}