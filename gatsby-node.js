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

exports.createPages = async ({ actions, graphql }) => {
  const { data } = await graphql(`
    query {
      allStrapiPage {
        nodes {
          content {
            id
            strapi_component
            text
          }
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
        }
      }
    }
  `)

  data.allStrapiPage.nodes.forEach((page) => {
    actions.createPage({
      path: page.slug,
      component: require.resolve("./src/templates/page.tsx"),
      context: { page },
    })
  })
}
