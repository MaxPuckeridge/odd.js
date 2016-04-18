goog.provide('odd.graph.GraphAxes');

goog.require('goog.graphics.Font');
goog.require('goog.graphics.Path');
goog.require('goog.math');

/**
 * @constructor
 */
odd.graph.GraphAxes = function(tRange, vRange) {
  this.tRange = tRange;
  this.vRange = vRange;

  this.stroke = new goog.graphics.Stroke(1, 'black');

  this.initAxisPositions_();
  this.initTicks_();
};

odd.graph.GraphAxes.prototype.initAxisPositions_ = function() {
  this.horizontalAxisFixedV = this.vRange.end < 0 ? this.vRange.end : this.vRange.start > 0 ? this.vRange.start : 0;
  this.verticalAxisFixedT = this.tRange.end < 0 ? this.tRange.end : this.tRange.start > 0 ? this.tRange.start : 0;
};

odd.graph.GraphAxes.prototype.initTicks_ = function() {
  this.largeTickIntervalT = this.getInterval(this.tRange.getLength()/5);
  this.smallTickIntervalT = this.largeTickIntervalT/5;

  var startInclusiveTickT = this.ceilToNearestInterval(this.tRange.start, this.smallTickIntervalT);
  var endExclusiveTickT = this.ceilToNearestInterval(this.tRange.end, this.smallTickIntervalT);
  this.tTicks = goog.array.range(startInclusiveTickT, endExclusiveTickT, this.smallTickIntervalT);

  this.largeTickIntervalV = this.getInterval(this.vRange.getLength()/5);
  this.smallTickIntervalV = this.largeTickIntervalV/5;

  var startInclusiveTickV = this.ceilToNearestInterval(this.vRange.start, this.smallTickIntervalV);
  var endExclusiveTickV = this.ceilToNearestInterval(this.vRange.end, this.smallTickIntervalV);
  this.vTicks = goog.array.range(startInclusiveTickV, endExclusiveTickV, this.smallTickIntervalV);
};

odd.graph.GraphAxes.prototype.draw = function(graphics, coordinateMapper) {
  var group = graphics.createGroup();

  this.createHorizontalAxisLine_(graphics, group, coordinateMapper);
  this.createHorizontalAxisTicks_(graphics, group, coordinateMapper);

  this.createVerticalAxisLine_(graphics, group, coordinateMapper);
  this.createVerticalAxisTicks_(graphics, group, coordinateMapper);
};

odd.graph.GraphAxes.prototype.createHorizontalAxisLine_ = function(graphics, group, coordinateMapper) {
  var horizontalAxis = new goog.graphics.Path();

  var start = coordinateMapper.map(this.tRange.start, this.horizontalAxisFixedV);
  var end = coordinateMapper.map(this.tRange.end, this.horizontalAxisFixedV);

  horizontalAxis.moveTo(start[0], start[1]);
  horizontalAxis.lineTo(end[0], end[1]);

  graphics.drawPath(horizontalAxis, this.stroke, null, group);
};

odd.graph.GraphAxes.prototype.createHorizontalAxisTicks_ = function(graphics, group, coordinateMapper) {
  goog.array.forEach(this.tTicks, goog.bind(this.createHorizontalAxisTick_, this, graphics, group, coordinateMapper));
};

odd.graph.GraphAxes.prototype.createHorizontalAxisTick_ = function(graphics, group, coordinateMapper, tValue) {
  var isMajorTick = this.almostMultipleOfInterval(tValue, this.largeTickIntervalT);

  var tick = new goog.graphics.Path();

  var tickHeight = isMajorTick ? 15 : 5;

  var start = coordinateMapper.map(tValue, this.horizontalAxisFixedV);

  tick.moveTo(start[0], start[1]);
  tick.lineTo(start[0], start[1] - tickHeight);

  graphics.drawPath(tick, this.stroke, null, group);

  if (isMajorTick && !goog.math.nearlyEquals(tValue, this.verticalAxisFixedT)) {
    var font = new goog.graphics.Font(12, 'arial');

    var valueStr = this.roundToNearestInterval(tValue, this.largeTickIntervalT).toString();

    graphics.drawTextOnLine(valueStr, start[0] - 20, start[1] - 20,
        start[0] + 20, start[1] - 20, 'center', font, this.stroke, null, group);
  }
};

odd.graph.GraphAxes.prototype.createVerticalAxisLine_ = function(graphics, group, coordinateMapper) {
  var verticalAxis = new goog.graphics.Path();

  var start = coordinateMapper.map(this.verticalAxisFixedT, this.vRange.start);
  var end = coordinateMapper.map(this.verticalAxisFixedT, this.vRange.end);

  verticalAxis.moveTo(start[0], start[1]);
  verticalAxis.lineTo(end[0], end[1]);

  graphics.drawPath(verticalAxis, this.stroke, null, group);
};

odd.graph.GraphAxes.prototype.createVerticalAxisTicks_ = function(graphics, group, coordinateMapper) {
  goog.array.forEach(this.vTicks, goog.bind(this.createVerticalAxisTick_, this, graphics, group, coordinateMapper));
};

odd.graph.GraphAxes.prototype.createVerticalAxisTick_ = function(graphics, group, coordinateMapper, vValue) {
  var isMajorTick = this.almostMultipleOfInterval(vValue, this.largeTickIntervalV);

  var tick = new goog.graphics.Path();

  var tickHeight = isMajorTick ? 15 : 5;

  var start = coordinateMapper.map(this.verticalAxisFixedT, vValue);

  tick.moveTo(start[0], start[1]);
  tick.lineTo(start[0] + tickHeight, start[1]);

  graphics.drawPath(tick, this.stroke, null, group);

  if (isMajorTick && !goog.math.nearlyEquals(vValue, this.horizontalAxisFixedV)) {
    var font = new goog.graphics.Font(12, 'arial');

    var valueStr = this.roundToNearestInterval(vValue, this.largeTickIntervalV).toString();

    graphics.drawTextOnLine(valueStr, start[0] + 20, start[1],
        start[0] + 30, start[1], 'left', font, this.stroke, null, group);
  }
};

odd.graph.GraphAxes.prototype.getInterval = function(num) {
  var alpha = goog.math.log10Floor(num);
  var factor = Math.pow(10, alpha);
  return Math.round(num/factor)*factor;
};

odd.graph.GraphAxes.prototype.ceilToNearestInterval = function(number, interval) {
  return Math.ceil(number/interval)*interval;
};

odd.graph.GraphAxes.prototype.roundToNearestInterval = function(number, interval) {
  return Math.round(number/interval)*interval;
};

odd.graph.GraphAxes.prototype.almostMultipleOfInterval = function(number, interval) {
  var mod = number % interval;
  return goog.math.nearlyEquals(mod, 0) || goog.math.nearlyEquals(mod, interval);
};
