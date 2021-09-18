// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: "Tietokilta",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_URL,
        collectionTypes: [
          {
            name: `page`,
            api: { qs: { _locale: `all` } },
          },
        ],
        queryLimit: 1000,
      },
    },
  ],
}
