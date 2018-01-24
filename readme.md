# postcss-grid-span [![Build Status][ci-img]][ci]

[PostCSS] plugin to output a column span value when using CSS grid layout. This is similar to [Susy’s] `span` function.

## Installation

```sh
$ npm install postcss-grid-span
```

## Usage

See [PostCSS usage docs] for examples for your environment.

```js
const gridSpan = require("postcss-grid-span");

postcss([
  gridSpan({
    columns: 12,
    gap: 30,
    maxWidth: 1290,
    appendUnit: true
  })
]);
```

By default, the `span` function outputs a pixel value without the unit. The `px` unit can be appended by setting `appendUnit` to `true` in the plugin’s settings.

#### Input

```css
.foo {
  max-width: span(7);
}
```

#### Output

```css
.foo {
  max-width: 740px;
}
```

The `span` function can also calculate and output a percentage value on the fly by passing `fluid` as the second option. Note that if a the percentage value is requested, then the `appendUnit` option will have no effect on the output, even if set to `true`.

#### Input

```css
.foo {
  width: span(7 fluid);
}
```

#### Output

```css
.foo {
  width: 57.36434108527132%;
}
```

## Practical example

Here is a practical example of how this plugin can be used to help provide fallback styles for a CSS grid layout.

```css
/* Set up the grid container */
.container {
  max-width: 1290px;

  @supports (display: grid) {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 30px;
  }
}

/* Place items on the grid */
.content {
  float: left;
  width: span(7 fluid);

  @supports (display: grid) {
    grid-column: span 7;
    width: auto;
  }
}

.aside {
  float: right;
  width: span(3 fluid);

  @supports (display: grid) {
    grid-column: 10 / span 3;
    width: auto;
  }
}
```

## Options

| Name | Required | Type | Description |
| ---- | -------- | ---- | ----------- |
| `columns` | yes | number | Total number of columns in grid layout, e.g., `12` |
| `gap` | yes | number | Width of grid gap (gutter) in pixels, e.g., `30` |
| `maxWidth` | yes | number | Maximum width of grid container in pixels, e.g., `1290` |
| `appendUnit` | no | boolean | Whether or not to append `px` unit onto span values; default value is `false` |


[PostCSS]: https://github.com/postcss/postcss
[PostCSS usage docs]: https://github.com/postcss/postcss#usage
[ci-img]: https://travis-ci.org/thomasthesecond/postcss-grid-span.svg
[ci]: https://travis-ci.org/thomasthesecond/postcss-grid-span
[Susy’s]: http://oddbird.net/susy/
