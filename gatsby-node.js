exports.onCreateBabelConfig = ({ actions }) => {
  // This fixes errors when not importing React in situations where it's not
  // necessary according to React 17.
  // SEE: https://github.com/gatsbyjs/gatsby/issues/28657
  actions.setBabelPlugin({
    name: "@babel/plugin-transform-react-jsx",
    options: {
      runtime: "automatic",
    },
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      fallback: {
        assert: false,
      },
    },
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      allStrapiPage {
        nodes {
          id: strapiId
          slug
          title
          unlisted
          strapiChildren {
            id
            slug
            title
          }
          strapiParent {
            id
          }
          locale
          content
        }
      }
    }
  `)

  data.allStrapiPage.nodes.forEach((page) => {
    actions.createPage({
      // Finnish is the default locale => let's not require prefixing for it.
      path: page.locale === "fi" ? page.slug : `${page.locale}/${page.slug}`,
      component: require.resolve("./src/templates/page.tsx"),
      context: { page },
    })
  })
}
