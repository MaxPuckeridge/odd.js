goog.provide('odd.system.ProblemSolutionPair');

goog.require('odd.solution.Solution');

/**
 * A wrapper for a problem and solution pair.
 * @param {odd.problem.Problem} problem
 * @constructor
 */
odd.system.ProblemSolutionPair = function(problem) {
  /**
   * @type {odd.problem.Problem}
   * @private
   */
  this.problem_ = problem;

  /**
   * @type {odd.solution.Solution}
   * @private
   */
  this.solution_ = new odd.solution.Solution();
};

/**
 * @return {odd.problem.Problem} The problem.
 */
odd.system.ProblemSolutionPair.prototype.getProblem = function() {
  return this.problem_;
};

/**
 * @return {odd.solution.Solution} The solution.
 */
odd.system.ProblemSolutionPair.prototype.getSolution = function() {
  return this.solution_;
};