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
