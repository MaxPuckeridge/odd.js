/**
 * @fileoverview A utility class for representing points in an ODE solution.
 */

goog.provide('odd.solution.Point');

goog.require('odd.data.Vector');

/**
 * Represents a point in the solution (t, vector)
 * @param {number} t
 * @param {odd.data.Vector} vector
 * @constructor
 */
odd.solution.Point = function(t, vector) {
  /** @type {number} */
  this.t = t;

  /** @type {odd.data.Vector} */
  this.vector = vector;
};

/**
 * Returns the entry in the vector at the provided index
 * @param {number} index
 * @return {number}
 */
odd.solution.Point.prototype.getV = function(index) {
  return this.vector.get(index);
};

/**
 * Returns length of the vector associated with this point
 * @return {number}
 */

odd.solution.Point.prototype.getVLength = function() {
  return this.vector.length();
};

/**
 * Returns true if the two provided points are considered equal
 * @param {odd.solution.Point} a
 * @param {odd.solution.Point} b
 * @return {boolean}
 */
odd.solution.Point.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.t == b.t && odd.data.Vector.equals(a.vector, b.vector);
};

/**
 * Comparator function used to compare points in an ordered structure
 * @param {odd.solution.Point} otherPoint
 * @return {number}
 */
odd.solution.Point.prototype.compareTo = function(otherPoint) {
  if (this.t < otherPoint.t) {
    return -1;
  } else if (this.t > otherPoint.t) {
    return 1;
  }
  return 0;
};

/**
 * Returns a human readable form of the point
 * @return {string}
 */
odd.solution.Point.prototype.toString = function() {
  return 'Point:[' + this.t + ',' + this.vector + ']';
};

/**
 * Creates a point using only primitive types
 * @param {number} t The t value
 * @param {Array<number>} vArray The numbers of the vector
 * @return {odd.solution.Point}
 */
odd.solution.Point.createPoint = function(t, vArray) {
  return new odd.solution.Point(t, new odd.data.Vector(vArray));
};