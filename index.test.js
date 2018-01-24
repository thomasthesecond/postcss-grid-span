var postcss = require("postcss");
var plugin = require("./");

var grid = {
  columns: 12,
  gap: 30,
  maxWidth: 1290
};

function run(input, output, options) {
  return postcss([ plugin(options) ]).process(input)
    .then(result => {
      expect(result.css).toEqual(output);
      expect(result.warnings().length).toBe(0);
    });
}

it("outputs a fluid value", () => {
  var input = "div { width: span(7 fluid); }";
  var output = "div { width: 57.36434108527132%; }";
  var options = grid;

  return run(input, output, options);
});

it("has unit appended to value", () => {
  var input = "div { width: span(7); }";
  var output = "div { width: 740px; }";
  var options = Object.assign({}, grid, {
    appendUnit: true
  });

  return run(input, output, options);
});

it("does not have unit appended to value", () => {
  var input = "div { width: calc(span(7) * 1px); }";
  var output = "div { width: calc(740 * 1px); }";
  var options = grid;

  return run(input, output, options);
});

it("has no value provided", () => {
  var input = "div { width: span(); }";
  var output = "div { width: span(); }";
  var options = grid;

  return run(input, output, options);
});

it("is not a number", () => {
  var input = "div { width: span(f); }";
  var output = "div { width: span(f); }";
  var options = grid;

  return run(input, output, options);
});

it("is missing required options", () => {
  var input = "div { width: span(7); }";
  var output = "div { width: span(7); }";
  var options = {};

  return run(input, output, options);
});
