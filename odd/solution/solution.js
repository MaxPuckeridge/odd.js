/**
 * @fileoverview A utility class for representing an ODE solution.
 */

goog.provide('odd.solution.Solution');
goog.provide('odd.solution.Solution.NewDataEvent');

goog.require('goog.array');
goog.require('goog.math.Rect');
goog.require('goog.math.Range');
goog.require('goog.structs.AvlTree');
goog.require('goog.events.EventTarget');

goog.require('odd.solution.Point');

/**
 *
 * Holds the data_ of the solution to odes
 * @constructor
 * @extends {goog.events.EventTarget}
 */
odd.solution.Solution = function() {
  goog.events.EventTarget.call(this);
  this.data_ = new goog.structs.AvlTree(function(a, b) {
    return a.compareTo(b);
  });
  this.boundingBox_ = null;
};
goog.inherits(odd.solution.Solution, goog.events.EventTarget);

/**
 * Holds the points already solved
 * @type {goog.structs.AvlTree}
 * @private
 */
odd.solution.Solution.prototype.data_ = null;

/**
 * A rectangle that spans the set of t, y values
 * for the current solution.
 * @type {goog.math.Rect}
 * @private
 */
odd.solution.Solution.prototype.boundingBox_ = null;

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

  this.boundingBox_ = this.boundingBox_ || point.asRect();
  this.boundingBox_.boundingRect(point.asRect());

  if (this.data_.getCount() > 0 && this.data_.getCount() % 20 == 0) {
    this.dispatchEvent(odd.solution.Solution.NewDataEvent);
  }
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
  return this.data_.getCount() > 0 ?
    new goog.math.Range(this.boundingBox_.left, this.boundingBox_.left + this.boundingBox_.width) :
    null;
};

/**
 * Returns the bounding box for the solution
 * @return {goog.math.Rect}
 */
odd.solution.Solution.prototype.getBoundingBox = function() {
  return this.boundingBox_.clone();
};