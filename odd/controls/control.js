goog.provide('odd.controls.Control');

goog.require('goog.events.EventType');
goog.require('goog.math');
goog.require('goog.ui.Control');
goog.require('odd.controls.FixedControlRenderer');
goog.require('odd.controls.SliderControlRenderer');

/**
 * @param {odd.controls.ControlData} data
 * @constructor
 * @extends {goog.ui.Control}
 */
odd.controls.Control = function(data){
  this.isSlider = data.hasRange();

  var renderer = this.isSlider ?
      new odd.controls.SliderControlRenderer():
      new odd.controls.FixedControlRenderer();
  goog.ui.Control.call(this, '', renderer, null);

  this.value_ = data.getDefaultValue();

  this.label_ = data.getLabel();

  this.min_ = this.isSlider ? data.getMinValue(): null;
  this.max_ = this.isSlider ? data.getMaxValue(): null;
  this.step_ = this.isSlider ? data.getInterval(): null;

  this.setAllowTextSelection(true);
};
goog.inherits(odd.controls.Control, goog.ui.Control);

odd.controls.Control.prototype.getValue = function() {
  return this.value_;
};

odd.controls.Control.prototype.getMin = function() {
  return this.min_;
};

odd.controls.Control.prototype.getMax = function() {
  return this.max_;
};

odd.controls.Control.prototype.getStep = function() {
  return this.step_;
};

odd.controls.Control.prototype.getVariableName = function() {
  return this.label_.getName();
};

odd.controls.Control.prototype.getVariableUnit = function() {
  return this.label_.getUnit();
};


odd.controls.Control.prototype.enterDocument = function() {
  odd.controls.Control.superClass_.enterDocument.call(this);
  if (!this.isSlider) {
    return;
  }

  var inputElement = this.getRenderer().getInputElement(
      this.getElement());
  this.getHandler().listen(inputElement, goog.events.EventType.CHANGE,
      goog.bind(function() {
        this.setValue(inputElement.value);
      }, this)
  );

  var slider = this.getRenderer().getSlider(this.getElement());
  this.getHandler().listen(slider, goog.events.EventType.CHANGE,
      goog.bind(function() {
        this.setValue(slider.value);
      }, this)
  );
};

odd.controls.Control.prototype.setValue = function(value) {
  this.value_ = goog.math.clamp(value, this.min_, this.max_);
  this.getRenderer().renderNewValue(this, this.value_);
  this.dispatchEvent(goog.ui.Component.EventType.CHANGE);
};