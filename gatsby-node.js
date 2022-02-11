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
        nodes {
          content
          strapiParent {
            slug
          }
          slug
          title
          locale
        }
      }
    }
  `)
  // Use recursion to build path for each node
  const buildPathTree = (slug, locale) => {
    const node = data.allStrapiPage.nodes.find((obj) => obj.slug === slug)
    // If node we are building path for is a node without a parent just return the slug and locale if not finnish.
    if (!node.strapiParent) {
      return locale !== "fi" ? `${locale}/${node.slug}` : node.slug
    }
    // If node has a parent, the path is slug of the node added to the path of the parent.
    return `${buildPathTree(node.strapiParent.slug, locale)}/${node.slug}`
  }
  data.allStrapiPage.nodes.forEach((node) => {
    actions.createPage({
      // Finnish is the default locale => let's not require prefixing for it.
      path: buildPathTree(node.slug, node.locale),
      component: require.resolve("./src/templates/page.tsx"),
      context: { page: node },
    })
  })
}
