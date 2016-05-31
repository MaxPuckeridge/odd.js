goog.provide('odd.compiler.Token');
goog.provide('odd.compiler.Token.Type');

/**
 * @param {odd.compiler.Token.Type} type
 * @param {string|number|odd.compiler.Operator} value
 * @constructor
 */
odd.compiler.Token = function(type, value) {
  this.type = type;
  this.value = value;
};

// @enum{string}
odd.compiler.Token.Type = {
  OPERATOR: 'operator',
  NUMBER: 'number',
  EXPRESSION: 'expression',
  PAREN: 'paren'
};

// @return {boolean}
odd.compiler.Token.prototype.isExpression = function() {
  return this.type === odd.compiler.Token.Type.EXPRESSION;
};

// @return {boolean}
odd.compiler.Token.prototype.isNumber = function() {
  return this.type === odd.compiler.Token.Type.NUMBER;
};

// @return {boolean}
odd.compiler.Token.prototype.isOperator = function() {
  return this.type === odd.compiler.Token.Type.OPERATOR;
};

// @return {boolean}
odd.compiler.Token.prototype.isParen = function() {
  return this.type === odd.compiler.Token.Type.PAREN;
};

// @return {boolean}
odd.compiler.Token.prototype.isEqualsOperator = function() {
  return this.isOperator() && this.value.isEqualsOperator();
};

// @return {boolean}
odd.compiler.Token.prototype.isLeftParen = function() {
  return this.isParen() && this.value === '(';
};

// @return {boolean}
odd.compiler.Token.prototype.isRightParen = function() {
  return this.isParen() && this.value === ')';
};

// @return {boolean}
odd.compiler.Token.prototype.isOperand = function() {
  return this.isExpression() || this.isNumber();
};

/**
 * Create a token from a string.
 * @return {odd.compiler.Token}
 */
odd.compiler.Token.createExpression = function(name) {
  return new odd.compiler.Token(odd.compiler.Token.Type.TOKEN, name);
};