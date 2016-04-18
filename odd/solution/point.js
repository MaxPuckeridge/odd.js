/**
 * @fileoverview A utility class for representing points in an ODE solution.
 * @author Max Puckeridge
 */

goog.provide('odd.solution.Point');

goog.require('odd.data.Vector');

/**
 * Represents a point in the solution (t, vector).
 * @param {number} t
 * @param {odd.data.Vector} vector
 * @constructor
 */
odd.solution.Point = function(t, vector) {
  /**
   * The point's value of t.
   * @type {number}
   * @private
   */
  this.t_ = t;

  /**
   * The points values for V, stored in vector form.
   * @type {odd.data.Vector}
   * @private
   */
  this.vector_ = vector;
};

/**
 * @return {number} The value of t for this point.
 */
odd.solution.Point.prototype.getT = function() {
  return this.t_;
};

/**
 * @return {odd.data.Vector} The values of V for this point.
 */
odd.solution.Point.prototype.getVector = function() {
  return this.vector_;
};

/**
 * Returns the entry in the vector at the provided index.
 * @param {number} index
 * @return {number}
 */
odd.solution.Point.prototype.getV = function(index) {
  return this.vector_.get(index);
};

/**
 * Returns length of the vector associated with this point.
 * @return {number}
 */
odd.solution.Point.prototype.getVLength = function() {
  return this.vector_.length();
};

/**
 * Returns true if the two provided points are considered equal.
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
  return a.getT() == b.getT() && odd.data.Vector.equals(a.vector_, b.vector_);
};

/**
 * Comparator function used to compare points in an ordered structure.
 * @param {odd.solution.Point} otherPoint
 * @return {number}
 */
odd.solution.Point.prototype.compareTo = function(otherPoint) {
  if (this.getT() < otherPoint.getT()) {
    return -1;
  } else if (this.getT() > otherPoint.getT()) {
    return 1;
  }
  return 0;
};

/**
 * Returns a human readable form of the point.
 * @return {string}
 */
odd.solution.Point.prototype.toString = function() {
  return 'Point:[' + this.t_ + ',' + this.vector_ + ']';
};

/**
 * Creates a point using only primitive types.
 * @param {number} t The t value.
 * @param {Array<number>} vArray The numbers of the vector.
 * @return {odd.solution.Point}
 */
odd.solution.Point.createPoint = function(t, vArray) {
  return new odd.solution.Point(t, new odd.data.Vector(vArray));
};