goog.provide('odd.system.OdeSystem');

goog.require('goog.structs.Map');
goog.require('odd.solver.Solver');
goog.require('odd.system.ProblemSolutionPair');

/**
 * The system of ODEs, initial state, solved solutions and problems.
 * @param {odd.problem.ProblemGenerator} problemGenerator
 * @param {goog.math.Range} tRange
 * @param {Function=} opt_method
 * @constructor
 */
odd.system.OdeSystem = function(problemGenerator, tRange, opt_method) {
  /**
   * Generates the problem for a given vector of params.
   * @type {odd.problem.ProblemGenerator}
   * @private
   */
  this.problemGenerator_ = problemGenerator;

  /**
   * The range of t to solve for any given problem.
   * @type {goog.math.Range}
   * @private
   */
  this.tRange_ = tRange;

  /**
   * Holds the param state of the most current solution & problem.
   * @type {odd.data.Vector}
   * @private
   */
  this.paramState_ = null;

  /**
   * Holds the most current problem-solution pair (corresponding to paramState_).
   * @type {odd.system.ProblemSolutionPair}
   * @private
   */
  this.current_ = null;

  /**
   * The solver that will be used to solve any problem in this system.
   * @type {odd.solver.Solver}
   * @private
   */
  this.solver_ = new odd.solver.Solver(opt_method);

  /**
   * A mapping of already computed problem-solution pairs. The data of
   * a previous solution cannot become stale, and so there is no reason
   * to ever invalidate the data in this map.
   * @type {goog.struct.Map<string, odd.system.ProblemSolutionPair>}
   * @private
   */
  this.data_ = new goog.structs.Map();
};

/**
 * Creates a new problem-solution pair for a given paramState.
 * @param {odd.data.Vector} paramState
 * @return {odd.system.ProblemSolutionPair}
 * @private
 */
odd.system.OdeSystem.prototype.createNewProblemPair_ = function(paramState) {
  var problem = this.problemGenerator_.generate(paramState);
  return new odd.system.ProblemSolutionPair(problem);
};

/**
 * Sets the system to use a new vector for the current paramState.
 * @param {odd.data.Vector} paramState
 */
odd.system.OdeSystem.prototype.setParamState = function(paramState) {
  var hash = paramState.hash();

  // if problem-solution doesn't exist for this param state
  // then create a new one
  if (!this.data_.containsKey(hash)) {
    this.data_.set(hash, this.createNewProblemPair_(paramState));
  }

  this.paramState_ = paramState;
  this.setCurrent_(this.data_.get(hash));
};

/**
 * Solves the most current problem-solution pair.
 */
odd.system.OdeSystem.prototype.solveCurrent = function() {
  this.solver_.solve(this.current_.getProblem(), this.current_.getSolution(),
     this.tRange_.start, this.tRange_.end);
};

/**
 * Sets a problem-solution pair to be the current one.
 * @param {odd.system.ProblemSolutionPair} problemSolutionPair
 * @private
 */
odd.system.OdeSystem.prototype.setCurrent_ = function(problemSolutionPair) {
  this.current_ = problemSolutionPair;
};

/**
 * @return {odd.solution.Solution} The most current solution.
 */
odd.system.OdeSystem.prototype.getCurrentSolution = function() {
  return this.current_.getSolution();
};

/**
 * @return {odd.problem.Problem} The most current problem.
 */
odd.system.OdeSystem.prototype.getCurrentProblem = function() {
  return this.current_.getProblem();
};