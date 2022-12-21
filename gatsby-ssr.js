/* @typescript-eslint/no-var-requires */
exports.onRenderBody = ({ setHtmlAttributes, pathname }) => {
  /* pathname always return "/" in development, but works with gatsby build.
  https://github.com/gatsbyjs/gatsby/issues/4350
  */
  const lang = pathname.startsWith("/en/") || pathname === "/en" ? "en" : "fi"
  setHtmlAttributes({ lang })
}
