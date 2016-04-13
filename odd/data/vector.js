goog.provide('odd.data.Vector');

goog.require('goog.array');

/**
 * @param {Array<number>} list
 * @constructor
 */
odd.data.Vector = function(list) {
  this.list = list;
};


/**
 * Returns the length of the vector
 * @return {number}
 */
odd.data.Vector.prototype.length = function() {
  return this.list.length;
};

/**
 * Returns true if the two provided vectors are considered equal
 * @param {odd.data.Vector} a
 * @param {odd.data.Vector} b
 * @return {boolean}
 */
odd.data.Vector.equals = function(a, b) {
  if (a == b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return goog.array.equals(a.list, b.list);
};

/**
 * Return the value in the vector at a given index
 * @param {number}
 * @return {number}
 */
odd.data.Vector.prototype.get = function(index) {
  return this.list[index];
};

/**
 * Maps one vector to another based on the given method
 * @param {Function} func
 * @param {Object=} opt_context, The object to be used as the value of 'this'
 *  within the func.
 * @return {odd.data.Vector}
 */
odd.data.Vector.prototype.map = function(func, opt_context) {
  return new odd.data.Vector(goog.array.map(this.list, func, opt_context));
};

/**
 * Returns a new odd.data.Vector from the current vector, however,
 * each value in the vector has the scalar value added to it
 * @param {number} scalarValue
 * @return {odd.data.Vector}
 */
odd.data.Vector.prototype.addScalar = function(scalarValue) {
  return this.map(function(v) {
    return v + scalarValue;
  });
};

/**
 * Returns a new odd.data.Vector from the current vector, however,
 * each value in the vector has the scalar value multiplied to it
 * @param {number} scalarValue
 * @return {odd.data.Vector}
 */
odd.data.Vector.prototype.multiplyScalar = function(scalarValue) {
  return this.map(function(v) {
    return v * scalarValue;
  });
};

/**
 * Returns a new odd.data.Vector from the entries of the current
 * vector added to the provided vector. Both vectors must be the
 * same length
 * @param {odd.data.Vector} other
 * @return {odd.data.Vector}
 */
odd.data.Vector.prototype.addVector = function(other) {
  if (other.length() !== this.length()) {
    throw Error('Cannot add two vectors that do not match in length');
  }
  return this.map(function(v, i) {
    return v + other.list[i];
  });
};

/**
 * Returns a new odd.data.Vector from the entries of the current
 * vector multiplied by the entries of the provided vector. Both
 * vectors must be the same length
 * @param {odd.data.Vector} other
 * @return {odd.data.Vector}
 */
odd.data.Vector.prototype.multiplyVector = function(other) {
  if (other.length() !== this.length()) {
    throw Error('Cannot multiply two vectors that do not match in length');
  }
  return this.map(function(v, i) {
    return v * other.list[i];
  });
};

/**
 * Returns a human readable form of the vector
 * @return {string}
 */
odd.data.Vector.prototype.toString = function() {
  return 'Vector:[' + this.list.toString() + ']';
};

/**
 * @return {string}
 */
odd.data.Vector.prototype.hash = function() {
  return this.list.join("|");
};