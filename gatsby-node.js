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
  const buildPathTree = (key, loc) => {
    const node = data.allStrapiPage.nodes.find((obj) => obj.slug === key)
    if (!node.strapiParent) {
      return loc !== "fi" ? `${loc}/${node.slug}` : node.slug
    }
    return `${buildPathTree(node.strapiParent.slug, loc)}/${node.slug}`
  }
  data.allStrapiPage.nodes.forEach((node) => {
    const p = buildPathTree(node.slug, node.locale)
    console.log(node.slug, node.locale, " -> ", p)
    actions.createPage({
      // Finnish is the default locale => let's not require prefixing for it.
      path: p,
      component: require.resolve("./src/templates/page.tsx"),
      context: { page: node },
    })
  })
}
