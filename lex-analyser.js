/*
  Turning the input string into a list of tokens .

  {
    "type": Symbol("Operator"),
    "value: "-"
  }

  Lex will turn the following expression:

  mul 3 sub 2 sum 1 3 4
  
  To the following array:

  ["mul", "3", "sub", "2", "sum", "1", "3", "4"]
*/
const lex = (str) =>
  str
    .split(" ")
    .map((s) => s.trim())
    .filter((s) => s.length);

console.log(lex("mul 3 sub 2 sum 1 3 4") + " Lex", "\n \n");
/*
  Parser

  Turning the list of tokens
  into an AST or Abstract Syntax Tree .

  const tokens = ["sub", "2", "sum", "1", "3", "4"];

   sub
   / \
  2  sum
     /|\
    1 3 4
  
*/

const Op = Symbol("op");
const Num = Symbol("num");

const parse = (tokens) => {
  let c = 0;
  const peek = () => tokens[c];
  const consume = () => tokens[c++];
  const parseNum = () => ({ val: parseInt(consume()), type: Num });
  const parseOp = () => {
    const node = { val: consume(), type: Op, expr: [] };
    while (peek()) node.expr.push(parseExpr());
    return node;
  };
  const parseExpr = () => (/\d/.test(peek()) ? parseNum() : parseOp());
  return parseExpr();
};

console.log(parse(["sub", "2", "sum", "1", "3", "4"]), "\n \n");

/*
  Evaluator

  Visit each node from the tree with pre-order traversal and either:

  Return the corresponding value, in case the node is of type number.
  Perform the corresponding arithmetic operation, in case of an operation node.
*/

const evaluate = (ast) => {
  const opAcMap = {
    sum: (args) => args.reduce((a, b) => a + b, 0),
    sub: (args) => args.reduce((a, b) => a - b),
    div: (args) => args.reduce((a, b) => a / b),
    mul: (args) => args.reduce((a, b) => a * b, 1),
    eq: (args) => args.reduce((a, b) => a === b),
    ne: (args) => args.reduce((a, b) => a !== b),
    lt: (args) => args.reduce((a, b) => a < b),
    gt: (args) => args.reduce((a, b) => a > b),
    as: (args) => args.reduce((a, b) => (a = b)),
    md: (args) => args.reduce((a, b) => a % b),
  };
  if (ast.type === Num) return ast.val;
  return opAcMap[ast.val](ast.expr.map(evaluate));
};

/*
  Code generator

  Translate to another language with javascript .
*/
const compile = (ast) => {
  const opMap = {
    sum: "+",
    mul: "*",
    sub: "-",
    div: "/",
    gt: ">",
    lt: "<",
    eq: "===",
    ne: "!==",
    md: "%",
    as: "=",
  };
  const compileNum = (ast) => ast.val;
  const compileOp = (ast) =>
    `(${ast.expr.map(compile).join(" " + opMap[ast.val] + " ")})`;
  const compile = (ast) =>
    ast.type === Num ? compileNum(ast) : compileOp(ast);
  return compile(ast);
};

// Compile and Evaluate Math Operations

const add = "sum 12 12 mul 2 5";
const subtract = "sub 1 3";
const multiply = "mul 1 3";
const divide = "div 10 5 2 sum 12 2";
const equal = "eq 2 2";
const notEqual = "ne 2 2";
const modulo = "md 2 2";
const assignment = "as 2 5";
const lessThan = "lt 10 5";
const greaterThan = "gt 3 2";

// To test any math operation above please uncomment it both from Compile and Evaluate
// console logs below and save the file .

// Compile

console.log(compile(parse(lex(add))) + " Compile", "\n \n");

// console.log(compile(parse(lex(subtract))) + " Compile", "\n \n");
// console.log(compile(parse(lex(multiply))) + " Compile", "\n \n");
// console.log(compile(parse(lex(divide))) + " Compile", "\n \n");
// console.log(compile(parse(lex(equal))) + " Compile", "\n \n");
// console.log(compile(parse(lex(notEqual))) + " Compile", "\n \n");
// console.log(compile(parse(lex(modulo))) + " Compile", "\n \n");
// console.log(compile(parse(lex(assignment))) + " Compile", "\n \n");
// console.log(compile(parse(lex(lessThan))) + " Compile", "\n \n");
// console.log(compile(parse(lex(greaterThan))) + " Compile", "\n \n");

// Evaluate

console.log(evaluate(parse(lex(add))) + " Evaluate", "\n \n");

// console.log(evaluate(parse(lex(subtract))) + " Evaluate", "\n \n");
// console.log(evaluate(parse(lex(multiply))) + " Evaluate", "\n \n");
// console.log(evaluate(parse(lex(divide))) + " Evaluate", "\n \n");
// console.log(evaluate(parse(lex(equal))) + " Evaluate", "\n \n");
// console.log(evaluate(parse(lex(notEqual))) + " Evaluate", "\n \n");
// console.log(evaluate(parse(lex(modulo))) + " Evaluate", "\n \n");
// console.log(evaluate(parse(lex(assignment))) + " Evaluate", "\n \n");
// console.log(evaluate(parse(lex(lessThan))) + " Evaluate", "\n \n");
// console.log(evaluate(parse(lex(greaterThan))) + " Evaluate", "\n \n");
