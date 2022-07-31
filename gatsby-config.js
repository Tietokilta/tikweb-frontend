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
            singularName: "page",
            pluginOptions: {
              i18n: {
                locale: "all",
              },
            },
          },
        ],
        singleTypes: [
          {
            singularName: "navigation",
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
