/**
 * @fileoverview A utility class for representing points in an ODE solution.
 */

goog.provide('odd.solution.Point');

goog.require('goog.math.Rect');

/**
 * Represents a point in the solution (t, y)
 * @param {number} t
 * @param {number} y
 * @constructor
 */
odd.solution.Point = function(t, y) {
    /** @type {number} */
    this.t = t;

    /** @type {number} */
    this.y = y;
};

/**
 * Returns a representation of the point as a Rect
 * @return {goog.math.Rect}
 */
odd.solution.Point.prototype.asRect = function() {
    return new goog.math.Rect(this.t, this.y, 0, 0);
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