// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Tietokilta",
  },
  plugins: [
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_URL,
        collectionTypes: [
          {
            singularName: `page`,
            api: { qs: { _locale: `all` } },
          },
        ],
        queryLimit: 1000,
      },
    },
  ],
}
