// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const commonContentPopulate = {
  // TextBlock only has text
  // For Committee:
  members: {
    populate: {
      picture: true,
    },
  },
}

module.exports = {
  siteMetadata: {
    title: "Tietokilta",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tietokilta`,
        short_name: `Tietokilta`,
        icon: `src/assets/favicon.svg`,
      },
    },
    "gatsby-plugin-postcss",
    {
      resolve: "gatsby-source-strapi",
      options: {
        apiURL: process.env.STRAPI_URL,
        accessToken: process.env.STRAPI_API_KEY,
        collectionTypes: [
          {
            singularName: "page",
            pluginOptions: {
              i18n: {
                locale: "all",
              },
            },
            queryParams: {
              populate: {
                content: {
                  populate: commonContentPopulate,
                },
                localizations: true,
              },
              publicationState:
                process.env.GATSBY_IS_PREVIEW === "true" ? "preview" : "live",
            },
          },
        ],
        singleTypes: [
          {
            singularName: "landing-page",
            pluginOptions: {
              i18n: {
                locale: "all",
              },
            },
            queryParams: {
              populate: {
                headerPhoto: true,
                content: {
                  populate: commonContentPopulate,
                },
                buttonLink: {
                  // Ensure we don't overwrite Page node contents
                  fields: ["id"],
                },
              },
            },
          },
          {
            singularName: "partners",
            queryParams: {
              populate: {
                partner: {
                  populate: "logo",
                },
              },
            },
          },
        ],
        queryLimit: 1000,
      },
    },
  ],
}
