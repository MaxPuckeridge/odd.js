goog.provide('odd.compiler.Operator');

/**
 * @param {odd.compiler.Operator.Type} type
 * @param {Regexp} regexp
 * @param {number=} opt_precedence
 * @param {Function=} opt_method
 * @param {number=} opt_arity
 * @constructor
 */
odd.compiler.Operator = function(type, regexp, opt_precedence, opt_method, opt_arity) {
  this.type = type;
  this.regexp = regexp;
  this.precedence = opt_precedence;
  this.method = opt_method;
  this.arity = opt_arity;
};

// @enum {string}
odd.compiler.Operator.Type = {
  ADD: 'add',
  SUBTRACT: 'subtract',
  DIVIDE: 'divide',
  MULTIPLY: 'multiply',
  EQUALS: 'equals'
};

/**
 * Compares two operator's precedence.
 * https://en.wikipedia.org/wiki/Shunting-yard_algorithm
 * @param {odd.compiler.Operator} other
 * @return {boolean}
 */
odd.compiler.Operator.prototype.comparePrecedence = function(other) {
  return this.precedence <= other.precedence;
};

/**
 * Checks if a string matches the regexp for the operator.
 * @return {boolean}
 */
odd.compiler.Operator.prototype.test = function(str) {
  return this.regexp.test(str);
};

/**
 * Is this operator EQUALS ("=")?
 * @return {boolean}
 */
odd.compiler.Operator.prototype.isEqualsOperator = function() {
  return this.type === odd.compiler.Operator.Type.EQUALS;
};

odd.compiler.Operator.add_ = function(a, b) {
  return a + b;
};

odd.compiler.Operator.subtract_ = function(a, b) {
  return a - b;
};

odd.compiler.Operator.multiply_ = function(a, b) {
  return a * b;
};

odd.compiler.Operator.divide_ = function(a, b) {
  return a / b;
};

/**
 * Addition Operator.
 * @type {odd.compiler.Operator}
 */
odd.compiler.Operator.ADD = new odd.compiler.Operator(odd.compiler.Operator.Type.ADD,
    /\+/, 2, odd.compiler.Operator.add_, 2);

/**
 * Subtraction Operator.
 * @type {odd.compiler.Operator}
 */
odd.compiler.Operator.SUBTRACT = new odd.compiler.Operator(odd.compiler.Operator.Type.SUBTRACT,
    /\-/, 2, odd.compiler.Operator.subtract_, 2);

/**
 * Multiplication Operator.
 * @type {odd.compiler.Operator}
 */
odd.compiler.Operator.MULTIPLY = new odd.compiler.Operator(odd.compiler.Operator.Type.MULTIPLY,
    /\*/, 3, odd.compiler.Operator.multiply_, 2);

/**
 * Division Operator.
 * @type {odd.compiler.Operator}
 */
odd.compiler.Operator.DIVIDE = new odd.compiler.Operator(odd.compiler.Operator.Type.DIVIDE,
    /\//, 3, odd.compiler.Operator.divide_, 2);

/**
 * Equality Operator.
 * @type {odd.compiler.Operator}
 */
odd.compiler.Operator.EQUALS = new odd.compiler.Operator(odd.compiler.Operator.Type.EQUALS,
    /=/);

/**
 * All the Operators.
 * @type {Array<odd.compiler.Operator>}
 */
odd.compiler.Operator.operators = [
  odd.compiler.Operator.ADD,
  odd.compiler.Operator.SUBTRACT,
  odd.compiler.Operator.MULTIPLY,
  odd.compiler.Operator.DIVIDE,
  odd.compiler.Operator.EQUALS,
];

/**
 * Finds the appropriate operator for
 * the given string form.
 * @return {odd.compiler.Operator=}
 */
odd.compiler.Operator.toType = function(str) {
  var arr = odd.compiler.Operator.operators;
  for (var i = 0; i < arr.length; i++) {
    var operator = arr[i];
    if (operator.test(str)) {
      return operator;
    }
  }
  return null;
};