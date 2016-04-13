goog.provide('odd.system.ProblemSolutionPair');

goog.require('odd.problem.Problem');

/**
 * @param {odd.problem.Problem} problem
 * @constructor
 */
odd.system.ProblemSolutionPair = function(problem) {
  this.problem = problem;
  this.solution = new odd.solution.Solution();
};