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
              publicationState:
                process.env.GATSBY_IS_PREVIEW === "true" ? "preview" : "live",
            },
          },
        ],
        singleTypes: [
          {
            singularName: "navigation",
            pluginOptions: {
              i18n: {
                locale: "all",
              },
            },
            queryParams: {
              populate: {
                items: {
                  populate: {
                    title: "*",
                    navigatesTo: {
                      populate: {
                        slug: "*",
                        title: "*",
                      },
                    },
                    subItems: {
                      populate: {
                        title: "*",
                        navigatesTo: {
                          populate: {
                            slug: "*",
                            title: "*",
                          },
                        },
                      },
                    },
                  },
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
