goog.provide('odd.compiler.Token');
goog.provide('odd.compiler.Token.Type');

goog.require('odd.compiler.operator');

/**
 * @param {odd.compiler.Token.Type} type
 * @param {string|number} value
 * @constructor
 */
odd.compiler.Token = function(type, value) {
  this.type = type;
  this.value = value;
};

odd.compiler.Token.Type = {
  OPERATOR: 'operator',
  NUMBER: 'number',
  EXPRESSION: 'expression',
  PAREN: 'paren'
};

odd.compiler.Token.prototype.isExpression = function() {
  return this.type === odd.compiler.Token.Type.EXPRESSION;
};

odd.compiler.Token.prototype.isNumber = function() {
  return this.type === odd.compiler.Token.Type.NUMBER;
};

odd.compiler.Token.prototype.isOperator = function() {
  return this.type === odd.compiler.Token.Type.OPERATOR;
};

odd.compiler.Token.prototype.isParen = function() {
  return this.type === odd.compiler.Token.Type.PAREN;
};

odd.compiler.Token.prototype.isEqualsOperator = function() {
  return this.isOperator() && this.value === odd.compiler.operator.Type.EQUALS;
};

odd.compiler.Token.prototype.isLeftParen = function() {
  return this.isParen() && this.value === '(';
};

odd.compiler.Token.prototype.isRightParen = function() {
  return this.isParen() && this.value === ')';
};

odd.compiler.Token.prototype.isOperand = function() {
  return this.isExpression() || this.isNumber();
};

odd.compiler.Token.createExpression = function(name) {
  return new odd.compiler.Token(odd.compiler.Token.Type.TOKEN, name);
};