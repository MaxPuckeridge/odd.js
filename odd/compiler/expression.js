goog.provide('odd.compiler.Expression');
goog.provide('odd.compiler.Expression.Type');

goog.require('goog.array');
goog.require('goog.structs.Set');

goog.require('odd.compiler.Token');

/**
 * @param {odd.compiler.Expression.Type} type
 * @param {string} name
 * @param {Array<odd.compiler.Token} tokens
 * @param {object=} opt_data
 * @constructor
 */
odd.compiler.Expression = function(type, name, tokens, opt_data) {
  this.type = type;
  this.name = name;
  this.tokens = tokens;
  this.data = opt_data || {};
};

// @enum {string}
odd.compiler.Expression.Type = {
  ODE: 'ode',
  PARAMETER: 'parameter'
};

odd.compiler.Expression.prototype.isOde = function() {
  return this.type === odd.compiler.Expression.Type.ODE;
};

odd.compiler.Expression.prototype.isParameter = function() {
  return this.type === odd.compiler.Expression.Type.PARAMETER;
};

odd.compiler.Expression.prototype.getDependencies = function() {
  return goog.array.reduce(this.tokens, function(cumulative, token) {
    if (token.isExpression()) {
      cumulative.add(token.value);
    }
    return cumulative;
  }, new goog.structs.Set());
};

odd.compiler.Expression.prototype.getNameOfDegree = function(degree) {
  return degree > 2 ? this.name + "'{" + degree + "}" :
      degree === 0 ? this.name : this.name + "'";
};

odd.compiler.Expression.prototype.getOdeDegree = function() {
  return this.data["degree"];
};

odd.compiler.Expression.prototype.getDefinedOdeExpressions_ = function() {
  var names = [];
  for (var i = 0; i < this.getOdeDegree(); i++) {
    names.push(this.getNameOfDegree(i));
  }
  return names;
};

odd.compiler.Expression.prototype.getDefinedExpressions = function() {
  if (!this.isOde()) {
    return new goog.structs.Set([this.name]);
  }
  return new goog.structs.Set(this.getDefinedOdeExpressions_());
};

odd.compiler.Expression.prototype.getInitialConditions = function() {
  var initialConditions = goog.array.map(this.getDefinedOdeExpressions_(), function(name) {
    return name + "(0)";
  });

  return new goog.structs.Set(initialConditions);
};

odd.compiler.Expression.prototype.getParameterToTokensMap = function() {
  var map = {};
  map[this.name] = this.tokens;
  return map;
};

odd.compiler.Expression.prototype.getOdeToTokensMap = function() {
  var highestDegreeDescribed = this.getOdeDegree() - 1;

  var map = {};
  map[this.getNameOfDegree(highestDegreeDescribed)] = this.tokens;
  for (var i = 0; i < highestDegreeDescribed; i++) {
    map[this.getNameOfDegree(i)] = [
      odd.compiler.Token.createExpression(this.getNameOfDegree(i + 1))
    ];
  };
  return  map
};
