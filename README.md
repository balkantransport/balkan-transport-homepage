# Balkan Transport homepage

## Getting started

### Local Development


- Install required packages
  ```bash
  yarn install
  ```
- Start dev servers
  ```bash
  yarn start
  ```
  - If `yarn` isn't installed, you can install it with
    ```bash
    npm i -g yarn
    ```
### Building

- Run build command
  ```
  yarn build
  ```

## CSS

The template uses a custom fork of Tachyons and PostCSS with cssnext and cssnano. To customize the template for your brand, refer to `src/css/imports/_variables.css` where most of the important global variables like colors and spacing are stored.

## SVG

All SVG icons stored in `site/static/img/icons` are automatically optimized with SVGO (gulp-svgmin) and concatenated into a single SVG sprite stored as a a partial called `svg.html`. Make sure you use consistent icons in terms of viewport and art direction for optimal results. Refer to an SVG via the `<use>` tag like so:

```
<svg width="16px" height="16px" class="db">
  <use xlink:href="#SVG-ID"></use>
</svg>
```
