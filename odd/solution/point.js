/**
 * @fileoverview A utility class for representing points in an ODE solution.
 */

goog.provide('odd.solution.Point');

goog.require('odd.solution.Vector');

/**
 * Represents a point in the solution (t, vector)
 * @param {number} t
 * @param {odd.solution.Vector} vector
 * @constructor
 */
odd.solution.Point = function(t, vector) {
  /** @type {number} */
  this.t = t;

  /** @type {odd.solution.Vector} */
  this.vector = vector;
};

odd.solution.Point.prototype.getV = function(index) {
  return this.vector.get(index);
};

odd.solution.Point.prototype.getVLength = function() {
  return this.vector.length();
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

odd.solution.Point.prototype.toString = function() {
  return 'Point:[' + this.t + ',' + this.vector + ']';
};