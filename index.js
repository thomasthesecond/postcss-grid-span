var postcss = require("postcss");
var parser = require("postcss-value-parser");
var pluginName = "postcss-grid-span";
var identifier = "span(";

/**
 * Calculates each column’s width given total number of columns,
 * max width and gap width
 * @param  {Object} options Plugin options
 * @return {number}         Calculated column width
 */
function calculateColumnWidth(options) {
  var totalGapWidth = (options.columns - 1) * options.gap;

  return (options.maxWidth - totalGapWidth) / options.columns;
}

/**
 * Calculates the span value based on the number of columns given
 * @param  {strong} columnsToSpan Number of columns to span
 * @param  {Object} options       Plugin options
 * @return {string}               Calculated value
 */
function calculateValue(columnsToSpan, options) {
  var columnWidth = calculateColumnWidth(options);

  return (columnsToSpan * columnWidth) + ((columnsToSpan - 1) * options.gap);
}

/**
 * Parses the span value from the stylesheet
 * @param  {string} string  CSS declaration
 * @param  {Object} options Plugin options
 * @return {string}         Parsed value
 */
function parseValue(string, options) {
  var parsedValue = parser(string).walk(function (node) {
    if (node.type !== "function" || node.value !== "span") {
      return;
    }

    if (!node.nodes.length) {
      return;
    }

    if (node.nodes.length) {
      var number = parseInt(node.nodes[0].value, 10);

      if (isNaN(number)) {
        return;
      }

      node.type = "word";
      node.value = calculateValue(number, options);
    }
  }).toString();

  if (options.appendUnit) {
    return parsedValue + "px";
  }

  return parsedValue;
}

module.exports = postcss.plugin(pluginName, function (options) {
  options = Object.assign({
    appendUnit: false
  }, options);

  return function (root) {
    root.walkDecls(function (declaration) {
      if (!declaration.value || declaration.value.indexOf(identifier) === -1) {
        return;
      }

      if (!options.columns || !options.gap || !options.maxWidth) {
        return;
      }

      if (declaration.value && declaration.value.includes(identifier)) {
        declaration.value = parseValue(declaration.value, options);
		  }
	   });
  };
});
