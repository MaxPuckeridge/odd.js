goog.provide('odd.problem.generatorfactory');

goog.require('goog.array');
goog.require('goog.object');

goog.require('odd.problem.ProblemGenerator');
goog.require('odd.problem.Function');

odd.problem.generatorfactory.generate = function(eCollection, vCollection){
  var definedExpressions = eCollection.getDefinedExpressions().getValues();
  var initialConditions = eCollection.getInitialConditions().getValues();
  var parameters = eCollection.getParameters().getValues();

  var variablesLookup = {};

  goog.array.forEach(definedExpressions, function(name, index) {
    variablesLookup[name] = index;
  });

  var parameterLookup = {};

  goog.array.forEach(initialConditions, function(name, index) {
    parameterLookup[name] = index;
  });

  var paramOffset = initialConditions.length;

  goog.array.forEach(parameters, function(name, index) {
    parameterLookup[name] = paramOffset + index;
  });

  var lookup = function(p, v){
    return function (key) {
      if (key in parameterLookup) {
        var index = parameterLookup[key];
        return p.get(index);
      }

      if (key in variablesLookup) {
        var index = variablesLookup[key];
        return v.get(index);
      }

      return null;
    };
  };

  var odes = goog.object.map(eCollection.getOdeToTokensMap(), function(tokens, key) {
    return new odd.problem.Function(tokens);
  });

  var odeArray = goog.array.map(definedExpressions, function(name) {
    return odes[name];
  });

  var odeGenerator = function(params) {
    return function(t, variables) {
      var increments = goog.array.map(odeArray, function(ode) {
        return ode.call(lookup(params, variables));
      });
      return new odd.data.Vector(increments);
    };
  };

  var initialStateGenerator = function(params) {
    return new odd.data.Vector(params.list_.slice(0, initialConditions.length));
  };

  return new odd.problem.ProblemGenerator(odeGenerator, initialStateGenerator, 0, 0.1);
};