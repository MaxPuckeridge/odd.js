goog.provide('odd.compiler');

goog.require('goog.array');

goog.require('odd.compiler.Expression');
goog.require('odd.compiler.Expression.Type');
goog.require('odd.compiler.Operator');
goog.require('odd.compiler.Token');
goog.require('odd.compiler.Token.Type');

/**
 * RegExp used by the compiler to tokenize
 * or parse a mathematical expression.
 * @enum {RegExp}
 */
odd.compiler.Regex = {
  WHITESPACE: /\s/,
  PAREN: /[\(\)]/,
  OPERATOR:/[+\-=\*\/]/,
  LETTERS: /[a-z]/i,
  WORD: /[\w'\{\}]/,
  NUMBER: /[0-9\.]/,
  ODE_EXPRESSION: /(\w+)'(\{([0-9]+)\})?$/
};

/**
 * Generates an array of tokens from a mathematical
 * expression in string form.
 * @param {string} input
 * @return {Array<odd.compiler.Token>}
 */
odd.compiler.tokenize = function(input) {
  var current = 0;
  var tokens = [];

  while (current < input.length) {
    var char = input[current];

    if (odd.compiler.Regex.WHITESPACE.test(char)) {
      current++;
      continue;
    }

    if (odd.compiler.Regex.PAREN.test(char)) {
      tokens.push(new odd.compiler.Token(odd.compiler.Token.Type.PAREN, char));
      current++;
      continue;
    }

    if (odd.compiler.Regex.OPERATOR.test(char)) {
      var operator = odd.compiler.Operator.toType(char);
      tokens.push(new odd.compiler.Token(odd.compiler.Token.Type.OPERATOR, operator));
      current++;
      continue;
    }

    if (odd.compiler.Regex.LETTERS.test(char)) {
      var value = '';

      while(char && odd.compiler.Regex.WORD.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push(new odd.compiler.Token(odd.compiler.Token.Type.EXPRESSION, value));
      continue;
    }

    if (odd.compiler.Regex.NUMBER.test(char)) {
      var value = '';

      while(char && odd.compiler.Regex.NUMBER.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push(new odd.compiler.Token(odd.compiler.Token.Type.NUMBER, parseFloat(value)));
      continue;
    }

    throw new Error("invalid equation");
  }

  return tokens;
};

/**
 * Validates a list of tokens to ensure it
 * is of the form of "expressionName = ...".
 * @param {Array<odd.compiler.Token>} tokens
 */
odd.compiler.validateEquation = function(tokens) {
  if (!tokens[0].isExpression() || !tokens[1].isEqualsOperator()) {
    throw new Error('invalid equation');
  }
};

/**
 * Parses a list of tokens to form an expression
 * that represents the mathematical formula.
 * @param {Array<odd.compiler.Token>} tokens
 * @return {odd.compiler.Expression}
 */
odd.compiler.parse = function(tokens) {
  /**
   * Assuming the first token is an expression
   * and then second "=", we can move on to the
   * remaining tokens.
   */
  var current = 2;

  /**
   * Roughly follows the Shunting-yard algorithm
   * https://en.wikipedia.org/wiki/Shunting-yard_algorithm
   * to generate a list of operators and operands in
   * Reverse Polish Notation
   * https://en.wikipedia.org/wiki/Reverse_Polish_notation
   */
  var output = [];
  var opStack = [];

  // prepend 0 if the expression beings with an operation, e.g., -x -> 0 - x
  if (tokens[current].isOperator()) {
    output.push(new odd.compiler.Token(odd.compiler.Token.Type.NUMBER, 0));
  }

  while (current < tokens.length) {
    var token = tokens[current++];
    if (token.isOperand()) {
      output.push(token);
      continue;
    }

    if (token.isOperator()) {
      var other = goog.array.peek(opStack);
      while (goog.array.contains(opStack, other) &&
          token.value.comparePrecedence(other.value)) {
        output.push(other);
        opStack.pop();
        other = goog.array.peek(opStack);
      }
      opStack.push(token);
      continue;
    }

    if (token.isLeftParen()) {
      opStack.push(token);
      continue;
    }

    if (token.isRightParen()) {
      while(!goog.array.peek(opStack).isLeftParen()) {
        output.push(opStack.pop());
      }
      opStack.pop();
      continue;
    }

    throw new Error('invalid equation');
  }

  while (opStack.length > 0)   {
    output.push(opStack.pop());
  }

  var expressionName = tokens[0].value;
  var odeMatch = odd.compiler.Regex.ODE_EXPRESSION.exec(expressionName);
  if (odeMatch) {
    var simpleName = odeMatch[1];
    var degree = parseInt(odeMatch[3]) || 1;
    return new odd.compiler.Expression(odd.compiler.Expression.Type.ODE, simpleName, output, {
      "degree": degree
    });
  }

  return new odd.compiler.Expression(odd.compiler.Expression.Type.PARAMETER, expressionName, output);
};

/**
 * Creates an expression from a raw string
 * form of a mathematical expression.
 * @return {odd.compiler.Expression}
 */
odd.compiler.compile = function(input) {
  var tokens = odd.compiler.tokenize(input);
  odd.compiler.validateEquation(tokens);
  return odd.compiler.parse(tokens);
};

/**
 * Generates a function that describes an expression.
 * It requires a lookup function, to locate the value
 * of a given parameter based on its key.
 * @param {Array<odd.compiler.Token>} tokens
 * @return {function}
 */
odd.compiler.generateFunction = function(tokens) {
  return function(lookup) {
    var stack = [];

    goog.array.forEach(tokens, function(token) {
      if (token.isOperator()) {
        var operator = token.value;
        var requiredArgs = operator.arity;
        var args = stack.splice(-requiredArgs);
        stack.push(operator.method.apply(this, args));
        return;
      }

      if (token.isNumber()) {
        stack.push(token.value);
        return;
      }

      if(token.isExpression()) {
        stack.push(lookup(token.value));
        return;
      }
    });

    return stack[0];
  };
};