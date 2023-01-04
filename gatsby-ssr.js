// this is Node.js code
/* eslint-disable no-restricted-syntax, @typescript-eslint/no-var-requires */

const { localeFromPath } = require("./src/paths")

exports.onRenderBody = ({ setHtmlAttributes, pathname }) => {
  /* pathname always returns "/" in development, but works with gatsby build.
  https://github.com/gatsbyjs/gatsby/issues/4350
  */
  setHtmlAttributes({ lang: localeFromPath(pathname) })
}
