goog.provide('odd.config.ControlsConfig');

goog.require('odd.controls.Controls');

/**
 * Configuration for a set of Controls.
 * @constructor
 */
odd.config.ControlsConfig = function(){
  /**
   * The config's control data.
   * @type {Array<odd.controls.ControlData>}
   * @private
   */
  this.data_ = null;
};

/**
 * Sets the config's control data.
 * @param {Array<odd.controls.ControlData>} data
 */
odd.config.ControlsConfig.prototype.setData = function(data) {
  this.data_ = data;
};

odd.config.ControlsConfig.prototype.toControls = function() {
  return new odd.controls.Controls(this.data_);
};