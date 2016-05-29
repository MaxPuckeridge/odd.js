goog.provide('odd.problem.Function');

goog.require('odd.compiler');

/**
 * @param {Array<odd.compiler.Tokens>} tokens
 * @constructor
 */
odd.problem.Function = function(tokens) {
  this.fn_ = odd.compiler.generateFunction(tokens);
};

odd.problem.Function.prototype.call = function(lookup) {
  return this.fn_(lookup);
};