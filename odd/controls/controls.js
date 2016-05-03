goog.provide('odd.controls.Controls');

goog.require('goog.array');
goog.require('goog.ui.Component');
goog.require('odd.controls.Control');
goog.require('odd.data.Vector');

/**
 * A set of controls that operate which ODE is to be solved
 * in an odd.system.OdeSystem.
 * @param {Array<odd.controls.ControlData>} data
 * @constructor
 * @extends {goog.ui.Component}
 */
odd.controls.Controls = function(data) {
  goog.ui.Component.call(this);

  this.controls_ = goog.array.map(data, goog.bind(function(value) {
    var control =  new odd.controls.Control(value);
    return control;
  }, this));

  var bucketed = goog.array.bucket(this.controls_, function(control) {
    return control.isSlider;
  });
  this.fixedControls_ = bucketed[false] || [];
  this.sliderControls_ = bucketed[true] || [];
};
goog.inherits(odd.controls.Controls, goog.ui.Component);

odd.controls.Controls.CLASS_NAME = 'odd-controls';
odd.controls.Controls.FIXED_CONTAINER_CLASS_NAME = 'odd-fixed-controls';
odd.controls.Controls.SLIDER_CONTAINER_CLASS_NAME = 'odd-slider-controls';

odd.controls.Controls.prototype.hasFixedControls = function() {
  return this.fixedControls_.length > 0;
};

odd.controls.Controls.prototype.hasSliderControls = function() {
  return this.sliderControls_.length > 0;
};

odd.controls.Controls.prototype.getFixedControls = function() {
  return this.fixedControls_;
};

odd.controls.Controls.prototype.getSliderControls = function() {
  return this.sliderControls_;
};

odd.controls.Controls.prototype.createDom = function() {
  this.element_ = this.getDomHelper().createDom(goog.dom.TagName.DIV,
      odd.controls.Controls.CLASS_NAME);

  if (this.hasFixedControls()) {
    var fixedContainer = this.getDomHelper().createDom(goog.dom.TagName.DIV,
        odd.controls.Controls.FIXED_CONTAINER_CLASS_NAME);
    this.element_.appendChild(fixedContainer);
  }

  if (this.hasSliderControls()) {
    var sliderContainer = this.getDomHelper().createDom(goog.dom.TagName.DIV,
        odd.controls.Controls.SLIDER_CONTAINER_CLASS_NAME);
    this.element_.appendChild(sliderContainer);
  }
};

odd.controls.Controls.prototype.getFixedContainer = function() {
  return this.hasFixedControls() && this.getDomHelper().getElementsByTagNameAndClass(
      goog.dom.TagName.DIV, odd.controls.Controls.FIXED_CONTAINER_CLASS_NAME)[0];
};

odd.controls.Controls.prototype.getSliderContainer = function() {
  return this.hasSliderControls() && this.getDomHelper().getElementsByTagNameAndClass(
      goog.dom.TagName.DIV, odd.controls.Controls.SLIDER_CONTAINER_CLASS_NAME)[0];
};


odd.controls.Controls.prototype.canDecorate = function(element) {
  return false;
};

odd.controls.Controls.prototype.render = function(opt_parentElement) {
  odd.controls.Controls.superClass_.render.call(this, opt_parentElement);

  if (this.hasFixedControls()) {
    var fixedContainer = this.getFixedContainer();
    goog.array.forEach(this.getFixedControls(), function(control) {
      control.render(fixedContainer);
    });
  }

  if (this.hasSliderControls()) {
    var sliderContainer = this.getSliderContainer();
    goog.array.forEach(this.getSliderControls(), function(control) {
      control.render(sliderContainer);
    });
  }
};

odd.controls.Controls.prototype.enterDocument = function() {
  odd.controls.Controls.superClass_.enterDocument.call(this);

  if (this.hasSliderControls()) {
    goog.array.forEach(this.getSliderControls(), goog.bind(function(control) {
      this.getHandler().listen(control, goog.ui.Component.EventType.CHANGE, goog.bind(function() {
        this.dispatchEvent(goog.ui.Component.EventType.CHANGE);
      }, this));
    }, this));
  }
};

/**
 * @return {odd.data.Vector}
 */
odd.controls.Controls.prototype.getParamState = function() {
  var arr = goog.array.map(this.controls_, function(control) {
    return control.getValue();
  });
  return new odd.data.Vector(arr);
};