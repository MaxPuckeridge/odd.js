/**
 * @fileoverview A utility class for representing an ODE solution.
 */

goog.provide('odd.solution.Solution');
goog.provide('odd.solution.Solution.NewDataEvent');

goog.require('goog.array');
goog.require('goog.math.Range');
goog.require('goog.structs.AvlTree');
goog.require('goog.events.EventTarget');

goog.require('odd.solution.Point');

/**
 *
 * Holds the data of the solution to odes
 * @constructor
 * @extends {goog.events.EventTarget}
 */
odd.solution.Solution = function() {
  goog.events.EventTarget.call(this);
  this.data_ = new goog.structs.AvlTree(function(a, b) {
    return a.compareTo(b);
  });
  this.tRange_ = null;
  this.vRanges_ = [];
};
goog.inherits(odd.solution.Solution, goog.events.EventTarget);

/**
 * Holds the points already solved
 * @type {goog.structs.AvlTree}
 * @private
 */
odd.solution.Solution.prototype.data_ = null;

/**
 * @type {goog.math.Range}
 * @private
 */
odd.solution.Solution.prototype.tRange_ = null;

/**
 * An array of goog.math.Range that hold the [min, max]
 * for each variable in V across the solution
 * @type {Array<goog.math.Range>}
 * @private
 */
odd.solution.Solution.prototype.vRanges_ = null;

/**
 * Fires whenever a new point is added to the solution
 * @type{String}
 */
odd.solution.Solution.NewDataEvent = "newdata_";

/**
 * Adds a single point to the solution
 * @param {odd.solution.Point}
 */
odd.solution.Solution.prototype.addPoint = function(point) {
  this.data_.add(point);

  this.tRange_ = this.updateRangeWithValue_(this.tRange_, point.t);

  for (var i = 0; i < point.getVLength(); i++) {
    this.vRanges_[i] = this.updateRangeWithValue_(this.vRanges_[i], point.getV(i));
  }
};

/**
 * Fires an odd.solution.Solution.NewDataEvent
 */
odd.solution.Solution.prototype.triggerNewDataEvent = function() {
  this.dispatchEvent(odd.solution.Solution.NewDataEvent);
};

/**
 * Helper method that creates a new range from a single value, or updates an existing range with the value
 * @param {goog.math.Range} range The existing range if it exists
 * @return {goog.math.Range}
 * @private
 */
odd.solution.Solution.prototype.updateRangeWithValue_ = function(range, value) {
  if (!range) {
    return new goog.math.Range(value, value);
  }
  range.includePoint(value);
  return range;
};

/**
 * Calls a function on each point in the solution.
 * @param {Function} func Function to call on each traversed node.
 * @param {Object=} opt_context, The object to be used as the value of 'this'
 *  within the func.
 */
odd.solution.Solution.prototype.forEachPoint = function(func, opt_context) {
  this.data_.inOrderTraverse(goog.bind(func, opt_context));
};

/**
 * Returns the left most (minimum-t) point in the solution or null;
 * @return {odd.solution.Point}
 */
odd.solution.Solution.prototype.getLeftEdgePoint = function() {
  return this.data_.getMinimum();
};

/**
 * Returns the right most (maximum-t) point in the solution or null;
 * @return {odd.solution.Point}
 */
odd.solution.Solution.prototype.getRightEdgePoint = function() {
  return this.data_.getMaximum();
};

/**
 * Returns the range of t's stored in this solution
 * @return {goog.math.Range}
 */
odd.solution.Solution.prototype.getTRange = function() {
  return this.tRange_;
};

/**
 * Returns the range of values for a given index in V
 * @return {goog.math.Range}
 */
odd.solution.Solution.prototype.getVRange = function(index) {
  return this.vRanges_[index];
};

/**
 * Calculates a range that encapsulates every range of V in the solution
 * @return {goog.math.Range}
 */
odd.solution.Solution.prototype.getCombinedVRange = function() {
  return goog.array.reduce(this.vRanges_, function(p, v) {
    return goog.math.Range.boundingRange(p, v);
  }, this.vRanges_[0]);
};

