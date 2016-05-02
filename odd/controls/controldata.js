goog.provide('odd.controls.ControlData');

goog.require('goog.array');
goog.require('goog.math.Range');

/**
 * Data to be rendered by an Odd Control.
 * @param {number} defaultValue
 * @param {odd.labels.VariableLabel} label
 * @param {goog.math.Range=} opt_range
 * @param {number=} opt_interval
 * @constructor
 */
odd.controls.ControlData = function(defaultValue, label, opt_range, opt_interval) {
  /**
   * The default value of the parameter.
   * @type {number}
   * @private
   */
  this.defaultValue_ = defaultValue;

  /**
   * The label to show with the control.
   * @type {odd.labels.VariableLabel}
   * @private
   */
  this.label_ = label;

  /**
   * Optional range of values for the control.
   * @type {goog.math.Range}
   * @private
   */
  this.range_ = opt_range;

  /**
   * Optional interval to step through the range
   * of the control.
   * @type {number}
   * @private
   */
  this.interval_ = opt_interval;
};

/**
 * @return {boolean} Whether or not the control has a range,
 * or is a fixed value parameter.
 */
odd.controls.ControlData.prototype.hasRange = function() {
  return !!this.range_;
};

/**
 * @return {number} The min value for the control.
 */
odd.controls.ControlData.prototype.getMinValue = function() {
  return this.range_.start;
};

/**
 * @return {number} The max value for the control.
 */
odd.controls.ControlData.prototype.getMaxValue = function() {
  return this.range_.end;
};

/**
 * @return {number} The default value for the control.
 */
odd.controls.ControlData.prototype.getDefaultValue = function() {
  return this.defaultValue_;
};

/**
 * @return {number} The step size for the control.
 */
odd.controls.ControlData.prototype.getInterval = function() {
  return this.interval_;
};


/**
 * @return {odd.labels.VariableLabel} The step size for the control.
 */
odd.controls.ControlData.prototype.getLabel = function() {
  return this.label_;
};