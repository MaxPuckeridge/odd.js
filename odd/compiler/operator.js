goog.provide('odd.compiler.operator');

goog.require('goog.object');

odd.compiler.operator.Type = {
  ADD: 'ADD',
  SUBTRACT: 'SUBTRACT',
  DIVIDE: 'DIVIDE',
  MULTIPLY: 'MULTIPLY',
  EQUALS: 'EQUALS'
};

odd.compiler.operator.Precedence = {
  ADD: 2,
  SUBTRACT: 2,
  MULTIPLY: 3,
  DIVIDE: 3
};

odd.compiler.operator.ArgCount = {
  ADD: 2,
  SUBTRACT: 2,
  MULTIPLY: 2,
  DIVIDE: 2
};

odd.compiler.operator.add_ = function(a, b) {
  return a + b;
};

odd.compiler.operator.subtract_ = function(a, b) {
  return a - b;
};

odd.compiler.operator.multiply_ = function(a, b) {
  return a * b;
};

odd.compiler.operator.divide_ = function(a, b) {
  return a / b;
};

odd.compiler.operator.Method = {
  ADD: odd.compiler.operator.add_,
  SUBTRACT: odd.compiler.operator.subtract_ ,
  MULTIPLY: odd.compiler.operator.multiply_ ,
  DIVIDE: odd.compiler.operator.divide_
};

odd.compiler.operator.typeMap_ = {
  '+': odd.compiler.operator.Type.ADD,
  '-': odd.compiler.operator.Type.SUBTRACT,
  '*': odd.compiler.operator.Type.MULTIPLY,
  '/': odd.compiler.operator.Type.DIVIDE,
  '=': odd.compiler.operator.Type.EQUALS
};

odd.compiler.operator.toType = function(str) {
  return odd.compiler.operator.typeMap_[str];
};

odd.compiler.operator.comparePrecedence = function(a, b) {
  return odd.compiler.operator.Precedence[a] <= odd.compiler.operator.Precedence[b];
};

