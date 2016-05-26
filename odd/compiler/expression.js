goog.provide('odd.compiler.Expression');
goog.provide('odd.compiler.Expression.Type');

goog.require('goog.array');
goog.require('goog.structs.Set');

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

odd.compiler.Expression.prototype.getDefinedOdeExpressions_ = function() {
  var names = [ this.name ];
  for (var i = 1; i < this.data["degree"]; i++) {
    names.push(this.name + "'{" +  i + "}");
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
  if (!this.isOde()) {
    return new goog.structs.Set();
  }

  var initialConditions = goog.array.map(this.getDefinedOdeExpressions_(), function(name) {
    return name + "(0)";
  });

  return new goog.structs.Set(initialConditions);
};
