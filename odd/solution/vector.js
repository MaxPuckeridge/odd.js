goog.provide('odd.solution.Vector');

goog.require('goog.array');

/**
 * @param {Array<number>} list
 * @constructor
 */
odd.solution.Vector = function(list) {
  this.list = list;
};

odd.solution.Vector.prototype.length = function() {
  return this.list.length;
};

odd.solution.Vector.equals = function(a, b) {
  if (a === b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return goog.array.equals(a.list, b.list);
};

odd.solution.Vector.prototype.get = function(index) {
  return this.list[index];
};

odd.solution.Vector.prototype.map = function(func) {
  return new odd.solution.Vector(goog.array.map(this.list, func));
};

odd.solution.Vector.prototype.addScalar = function(scalarValue) {
  return this.map(function(v) {
    return v + scalarValue;
  });
};

odd.solution.Vector.prototype.multiplyScalar = function(scalarValue) {
  return this.map(function(v) {
    return v * scalarValue;
  });
};

odd.solution.Vector.prototype.addVector = function(other) {
  if (other.length() !== this.length()) {
    throw Error('cannot add two vectors that do not match in length');
  }
  return this.map(function(v, i) {
    return v + other.list[i];
  });
};

odd.solution.Vector.prototype.multiplyVector = function(other) {
  if (other.length() !== this.length()) {
    throw Error('cannot multiply two vectors that do not match in length');
  }
  return this.map(function(v, i) {
    return v * other.list[i];
  });
};

odd.solution.Vector.prototype.toString = function() {
  return 'Vector:[' + this.list.toString() + ']';
};