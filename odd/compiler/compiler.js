goog.provide('odd.compiler');

goog.require('goog.array');
goog.require('goog.structs.Set');

odd.compiler.OPERATOR_PRECEDENCE = {
  '+': 2,
  '-': 2,
  '*': 3,
  '/': 3
};

odd.compiler.comparePrecendence = function(a, b) {
  return odd.compiler.OPERATOR_PRECEDENCE[a] <= odd.compiler.OPERATOR_PRECEDENCE[b];
};

odd.compiler.tokenize = function(input) {
  var current = 0;
  var tokens = [];

  while (current < input.length) {
    var char = input[current];

    var WHITESPACE = /\s/;
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    var PAREN = /[\(\)]/;
    if (PAREN.test(char)) {
      tokens.push({
        type: 'paren',
        value: char
      });
      current++;
      continue;
    }

    var OPERATOR = /[+\-=\*\/]/;
    if (OPERATOR.test(char)) {
      tokens.push({
        type: 'operator',
        value: char
      });
      current++;
      continue;
    }

    var LETTERS = /[a-z]/i;
    if (LETTERS.test(char)) {
      var value = '';
      var WORD = /[\w'\{\}]/;

      while(char && WORD.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({
        type: 'expression',
        value: value
      });

      continue;
    }

    var NUMBER = /[0-9\.]/;
    if (NUMBER.test(char)) {
      var value = '';

      while(char && NUMBER.test(char)) {
        value += char;
        char = input[++current];
      }

      tokens.push({
        type: 'number',
        value: parseFloat(value)
      });

      continue;
    }

    throw new Error("invalid equation");
  }

  return tokens;
};

odd.compiler.parse = function(tokens) {
  if (tokens[0].type !== 'expression' && tokens[1].type !== 'operator' && tokens[1].value === "=") {
    throw new Error('invalid');
  }

  var mainExpressionName = tokens[0].value;
  var ODE_EXPRESSION = /(\w+)'(\{([0-9]+)\})?$/;
  var ode = ODE_EXPRESSION.exec(mainExpressionName);

  var ast;
  if (ode) {
    ast = {
      type: 'OdeExpression',
      param_name: ode[1],
      degree: parseInt(ode[3]) || 1
    };
  } else {
    ast = {
      type: 'VariableExpression',
      param_name: mainExpressionName
    };
  }

  var current = 2;

  // shunting yard
  var output = [];
  var opStack = [];

  if (tokens[current].type === 'operator') {
    output.push({
      type: 'number',
      value: 0
    });
  }

  while (current < tokens.length) {
    var token = tokens[current++];
    if (token.type === 'expression' || token.type === 'number') {
      output.push(token);
      continue;
    }

    if (token.type === 'operator') {
      var other = goog.array.peek(opStack);
      while (goog.array.contains(opStack, other) && odd.compiler.comparePrecendence(token.value, other.value)) {
        output.push(other);
        opStack.pop();
        other = goog.array.peek(opStack);
      }
      opStack.push(token);
      continue;
    }

    if (token.type === 'paren' && token.value === '(') {
      opStack.push(token);
      continue;
    }

    if (token.type === 'paren' && token.value === ')') {
      while(goog.array.peek(opStack).value !== '(') {
        output.push(opStack.pop());
      }
      opStack.pop();
      continue;
    }

    throw new Error('invalid equation');
  }

  while (opStack.length > 0) {
    output.push(opStack.pop());
  }

  ast.ops = output;

  ast.dependencies = goog.array.reduce(output, function(previous, item) {
    if (item.type === 'expression') {
      previous.add(item.value);
    }
    return previous;
  }, new goog.structs.Set());

  return ast;
};

odd.compiler.compile = function(input) {
  var tokens = odd.compiler.tokenize(input);
  return odd.compiler.parse(tokens);
};