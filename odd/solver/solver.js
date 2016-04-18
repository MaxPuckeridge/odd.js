goog.provide('odd.solver.Solver');
goog.provide('odd.solver.EulerMethod');
goog.provide('odd.solver.RungeKuttaMethod');

goog.require('goog.math.Range');

goog.require('odd.problem.Problem');
goog.require('odd.solution.Point');
goog.require('odd.solution.Solution');

/**
 * @param {Function=} opt_method
 * @constructor
 */
odd.solver.Solver = function(opt_method) {
  this.method = opt_method || odd.solver.RungeKuttaMethod;
};

/**
 * Solves the ode for the given range
 * @param {odd.problem.Problem} problem
 * @param {odd.solution.Solution} solution
 * @param {number} start
 * @param {number} finish
 */
odd.solver.Solver.prototype.solve = function(problem, solution, start, finish) {
  var range = new goog.math.Range(start, finish);
  var existingRange = solution.getTRange();
  if (!existingRange) {
    var initialPoint = problem.getInitialPoint();
    var postOperationRange = range.clone();
    postOperationRange.includePoint(initialPoint.getT());

    solution.addPoint(initialPoint);
    this.solveRaw(problem, solution, initialPoint, postOperationRange);
    solution.triggerNewDataEvent();
  } else {
    var postOperationRange = existingRange.clone();
    postOperationRange.includeRange(range);

    var addedData = false;
    if (postOperationRange.start < existingRange.start) {
      // then there is a new range to the left of the current solution
      var leftRangeBlock = new goog.math.Range(postOperationRange.start, existingRange.start);
      this.solveRaw(problem, solution, solution.getLeftEdgePoint(), leftRangeBlock);
      addedData = true;
    }
    if (postOperationRange.end > existingRange.end) {
      // then there is a new range to the right of the current solution
      var rightRangeBlock = new goog.math.Range(postOperationRange.end, existingRange.end);
      this.solveRaw(problem, solution, solution.getRightEdgePoint(), rightRangeBlock);
      addedData = true;
    }

    if(addedData) {
      solution.triggerNewDataEvent();
    }
  }
};

/**
 * Solves the ode for the given range and initial point
 * @param {odd.problem.Problem} problem
 * @param {odd.solution.Solution} solution
 * @param {odd.solution.Point} point
 * @param {goog.math.Range} range
 */
odd.solver.Solver.prototype.solveRaw = function(problem, solution, point, range) {
  var rightPoint = point;
  while (rightPoint.getT() < range.end) {
    rightPoint = this.method(problem.getOde(), rightPoint, problem.getDt());
    solution.addPoint(rightPoint);
  }

  var leftPoint = point;
  while (leftPoint.getT() > range.start) {
    leftPoint = this.method(problem.getOde(), leftPoint, -problem.getDt());
    solution.addPoint(leftPoint);
  }
};

/**
 * Calculates the next value of Y from the last point for a finite change in t
 * of size dt using the derivative function, implemented with Runge-Kutta's algorithm
 * @param {function(number, odd.data.Vector):odd.data.Vector} func
 * @param {odd.solution.Point} point
 * @param {number} dt
 */
odd.solver.RungeKuttaMethod = function(func, point, dt) {
  var t = point.getT(), v = point.getVector();
  var k1 = func(t, v);
  var k2 = func(t + dt/2, v.addVector(k1.multiplyScalar(dt/2)));
  var k3 = func(t + dt/2, v.addVector(k2.multiplyScalar(dt/2)));
  var k4 = func(t + dt, v.addVector(k3.multiplyScalar(dt)));
  return new odd.solution.Point(t + dt, v.addVector(
      k1
      .addVector(k2.multiplyScalar(2))
      .addVector(k3.multiplyScalar(2))
      .addVector(k4)
      .multiplyScalar(dt/6))
  );
};

/**
 * Calculates the next value of Y from the last point for a finite change in t
 * of size dt using the derivative function, implemented with Euler's algorithm
 * (quickly deviates from the true solution. recommended only for testing purposes)
 * @param {function(number, odd.data.Vector):odd.data.Vector} func
 * @param {odd.solution.Point} point
 * @param {number} dt
 */
odd.solver.EulerMethod = function(func, point, dt) {
  var t = point.getT(), v = point.getVector();
  return new odd.solution.Point(t + dt, v.addVector(func(t, v).multiplyScalar(dt)));
};