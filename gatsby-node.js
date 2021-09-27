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
        assert: require.resolve("assert"),
      },
    },
  })
}

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
  query {
    allStrapiPage {
      edges {
        node {
          id
          children {
            id
          }
          content
          locale
          parent {
            id
          }
          slug
          strapiId
          title
          unlisted
        }
      }
    }
  }
  `)
  data.allStrapiPage.edges.forEach((edge) => {
    actions.createPage({
      // Finnish is the default locale => let's not require prefixing for it.
      path: edge.node.locale === "fi" ? edge.node.slug : `${edge.node.locale}/${edge.node.slug}`,
      component: require.resolve("./src/templates/page.tsx"),
      context: { page: edge.node },
    })
  })
}
