goog.provide('odd.graph.CoordinateMapper');

goog.require('goog.math.Range');
goog.require('goog.math.Box');

/**
 * @param {goog.math.Range} tRange
 * @param {goog.math.Range} vRange
 * @param {goog.math.Box} boxTo
 * @constructor
 */
odd.graph.CoordinateMapper = function(tRange, vRange, boxTo) {
  this.tRange_ = tRange;
  this.vRange_ = vRange;

  this.boxTo_ = boxTo;

  this.scaleT_ = boxTo.getWidth()/tRange.getLength();
  this.scaleY_ = boxTo.getHeight()/vRange.getLength();
};

/**
 * Holds the t-range for the viewport that is being mapped to
 * @type {goog.math.Range}
 * @private
 */
odd.graph.CoordinateMapper.prototype.tRange_ = null;

/**
 * Holds the v-range for the viewport that is being mapped to
 * @type {goog.math.Range}
 * @private
 */
odd.graph.CoordinateMapper.prototype.vRange_ = null;

/**
 * Holds the box that represents the viewport that is being mapped to
 * @type {goog.math.Box}
 * @private
 */
odd.graph.CoordinateMapper.prototype.boxTo_ = null;

/**
 * The multiplicative factor when mapping t-values to left values
 * @type {number}
 * @private
 */
odd.graph.CoordinateMapper.prototype.scaleT_ = null;

/**
 * The multiplicative factor when mapping v-values to left values
 * @type {number}
 * @private
 */
odd.graph.CoordinateMapper.prototype.scaleV_ = null;

/**
 * Maps the given t and v value to the left and top positions in the viewport
 * @param {number} tValue
 * @param {number} vValue
 * @return {Array<number>}
 */
odd.graph.CoordinateMapper.prototype.map = function(tValue, vValue) {
  var toLeft = this.mapLeft(tValue);
  var toTop = this.mapTop(vValue);
  return [toLeft, toTop];
}

/**
 * Maps the given t value to the left position in the viewport
 * @param {number} tValue
 * @return {number}
 */
odd.graph.CoordinateMapper.prototype.mapLeft = function(tValue) {
  return this.boxTo_.left + this.scaleT_ * (tValue - this.tRange_.start);
};

/**
 * Maps the given v value to the top position in the viewport
 * @param {number} vValue
 * @return {number}
 */
odd.graph.CoordinateMapper.prototype.mapTop = function(vValue) {
  return this.boxTo_.top + this.scaleY_ * (this.vRange_.end - vValue);
};