goog.provide('odd.data.vectorTest');
goog.setTestOnly('odd.data.vectorTest');

goog.require('goog.testing.jsunit');
goog.require('odd.data.Vector');

function assertVectorEquals(a, b) {
  assertTrue(b + ' should be equal to ' + a, odd.data.Vector.equals(a, b));
}

function testConstructedObject() {
  var v = new odd.data.Vector([2, 5, 7]);

  assertEquals(3, v.length());
  assertEquals(2, v.get(0));
  assertEquals(5, v.get(1));
  assertEquals(7, v.get(2));
  assertEquals("2|5|7", v.hash());
}

function testAddScalar() {
  var v1 = new odd.data.Vector([1, 2, 3]);
  var v2 = v1.addScalar(2);

  assertNotEquals(v1, v2);
  assertTrue('is an instance of odd.data.Vector', v2 instanceof odd.data.Vector);
  assertVectorEquals(new odd.data.Vector([3, 4, 5]), v2);
}

function testMultiplyScalar() {
  var v1 = new odd.data.Vector([1, 2, 3]);
  var v2 = v1.multiplyScalar(2);

  assertNotEquals(v1, v2);
  assertTrue('is an instance of odd.data.Vector', v2 instanceof odd.data.Vector);
  assertVectorEquals(new odd.data.Vector([2, 4, 6]), v2);
}

function testAddVector() {
  var v1 = new odd.data.Vector([1, 2, 3]);
  var v2 = v1.addVector(new odd.data.Vector([-1, 2, 7]));

  assertNotEquals(v1, v2);
  assertTrue('is an instance of odd.data.Vector', v2 instanceof odd.data.Vector);
  assertVectorEquals(new odd.data.Vector([0, 4, 10]), v2);
}

function testAddVector_throwsWhenDifferentLengths() {
  var v1 = new odd.data.Vector([1, 2, 3]);
  var e = assertThrows(function() {
    v1.addVector(new odd.data.Vector([-1, 2, 7, 8]));
  });

  assertEquals('Cannot add two vectors that do not match in length', e.message);
}

function testMultiplyVector() {
  var v1 = new odd.data.Vector([1, 2, 3]);
  var v2 = v1.multiplyVector(new odd.data.Vector([-1, 2, 7]));

  assertNotEquals(v1, v2);
  assertTrue('is an instance of odd.data.Vector', v2 instanceof odd.data.Vector);
  assertVectorEquals(new odd.data.Vector([-1, 4, 21]), v2);
}

function testMultiplyVector_throwsWhenDifferentLengths() {
  var v1 = new odd.data.Vector([1, 2, 3]);
  var e = assertThrows(function() {
    v1.multiplyVector(new odd.data.Vector([-1, 2, 7, 8]));
  });

  assertEquals('Cannot multiply two vectors that do not match in length', e.message);
}

function testVectorEquals() {
  var v1 = new odd.data.Vector([1,2,3]);

  assertTrue(odd.data.Vector.equals(v1, v1));
  assertTrue(odd.data.Vector.equals(v1, new odd.data.Vector([1,2,3])));
  assertFalse(odd.data.Vector.equals(v1, new odd.data.Vector([3,2,1])));
}

function testMap() {
  var v1 = new odd.data.Vector([1, 2, 3]);
  v2 = v1.map(function(v) {
    return Math.pow(v, 3);
  });

  assertNotEquals(v1, v2);
  assertTrue('is an instance of odd.data.Vector', v2 instanceof odd.data.Vector);
  assertVectorEquals(new odd.data.Vector([1, 8, 27]), v2);
}
