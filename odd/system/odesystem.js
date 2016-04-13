goog.provide('odd.system.OdeSystem');
goog.provide('odd.system.OdeSystem.EventTypes');

goog.require('goog.math.Range');
goog.require('goog.events.EventTarget');
goog.require('goog.structs.Map');

goog.require('odd.system.ProblemSolutionPair');
goog.require('odd.labels.Labels');
goog.require('odd.solution.Solution');
goog.require('odd.solution.Solution.NewDataEvent');
goog.require('odd.problem.Problem');
goog.require('odd.problem.ProblemGenerator');
goog.require('odd.data.Vector');
goog.require('odd.solver.Solver');

/**
 * @param {odd.problem.ProblemGenerator} problemGenerator
 * @param {goog.math.Range} tRange
 * @param {odd.data.Vector} initialParamState
 * @param {odd.labels.Labels} labels
 * @param {Function=} opt_method
 * @constructor
 * @extends {goog.events.EventTarget}
 */
odd.system.OdeSystem = function(problemGenerator, tRange, initialParamState, labels, opt_method) {
  goog.events.EventTarget.call(this);

  /* @type {odd.problem.ProblemGenerator} */
  this.problemGenerator_ = problemGenerator;

  /* @type {goog.math.Range} */
  this.tRange_ = tRange;

  /* @type {odd.labels.Labels} */
  this.labels_ = labels;

  /* @type {odd.data.Vector} */
  this.paramState_ = null;

  /* @type {odd.system.ProblemSolutionPair} */
  this.current_ = null;

  /* @type {odd.solver.Solver} */
  this.solver_ = new odd.solver.Solver(opt_method);

  /* @type {goog.struct.Map<string, odd.system.ProblemSolutionPair>} */
  this.data_ = new goog.structs.Map();

  this.setParamState(initialParamState);
};
goog.inherits(odd.system.OdeSystem, goog.events.EventTarget);

odd.system.OdeSystem.EventTypes = {
  UPDATED_PARAM_STATE: 'paramstate_',
  UPDATED_SOLUTION_DATA: 'solutiondata_',
};

odd.system.OdeSystem.prototype.createNewProblemPair_ = function(paramState) {
  var problem = this.problemGenerator_.generate(paramState);
  return new odd.system.ProblemSolutionPair(problem);
};

odd.system.OdeSystem.prototype.setParamState = function(paramState) {
  var hash = paramState.hash();

  // if problem-solution doesn't exist for this param state
  // then create a new one
  if (!this.data_.containsKey(hash)) {
    this.data_.set(hash, this.createNewProblemPair_(paramState));
  }

  this.paramState_ = paramState;
  this.setCurrent_(this.data_.get(hash));

  this.dispatchEvent(odd.system.OdeSystem.EventTypes.UPDATED_PARAM_STATE);
};

odd.system.OdeSystem.prototype.setCurrent_ = function(problemSolutionPair) {
  if (this.current_) {
    this.current_.solution.unlistenByKey(odd.solution.Solution.NewDataEvent);
  }
  this.current_ = problemSolutionPair;
  this.current_.solution.listen(odd.solution.Solution.NewDataEvent,
      goog.bind(this.triggerUpdatedSolutionDataEvent, this));
};

odd.system.OdeSystem.prototype.triggerUpdatedSolutionDataEvent = function() {
  this.dispatchEvent(odd.system.OdeSystem.EventTypes.UPDATED_SOLUTION_DATA);
};

odd.system.OdeSystem.prototype.solveCurrent = function() {
  this.solver_.solve(this.current_.problem, this.current_.solution,
     this.tRange_.start, this.tRange_.end);
};

odd.system.OdeSystem.prototype.getCurrentSolution = function() {
  return this.current_.solution;
};

odd.system.OdeSystem.prototype.getCurrentProblem = function() {
  return this.current_.problem;
};