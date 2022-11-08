// this is Node.js code
/* eslint-disable no-restricted-syntax, @typescript-eslint/no-var-requires */

const fetch = require("node-fetch")

exports.onCreateBabelConfig = ({ actions }) => {
  // Enable new React JSX transform (no "import React" needed)
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

const NAV_SLUGS = {
  fi: "main-navigation",
  en: "main-navigation-en",
}

// Without locales
const EVENTS_URLS = {
  fi: "/tapahtumat",
  en: "/events",
}

// Include locale in path if not Finnish
const pathWithLocale = (path, locale) =>
  locale === "fi" ? path : `/${locale}${path}`

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
  reporter,
}) => {
  // First, fetch all navigations.
  const navs = await Promise.all(
    Object.entries(NAV_SLUGS).map(async ([locale, navSlug]) => {
      const response = await fetch(
        `${process.env.STRAPI_URL}/api/navigation/render/${navSlug}?type=TREE`,
        {
          headers: {
            Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
          },
        }
      )
      const items = await response.json()
      return {
        locale,
        items,
      }
    })
  )

  // Then create nodes of them.
  for (const nav of navs) {
    createNode({
      ...nav,
      id: createNodeId(`Navigation-${nav.locale}`),
      parent: null,
      children: [],
      internal: {
        type: "StrapiNavigation",
        contentDigest: createContentDigest(nav),
      },
    })
  }

  // Clean the nav structure for public consumption:
  // Recursively walk the nav tree to remove hidden items and include locales in paths
  const buildPublicNav = (nav, locale) => {
    return {
      ...nav,
      path: nav.path && pathWithLocale(nav.path, locale),
      items: nav.items
        ?.filter(({ menuAttached }) => menuAttached)
        .map((item) => buildPublicNav(item, locale)),
    }
  }
  const publicNavs = navs.map((nav) => buildPublicNav(nav, nav.locale))

  // Create nodes of that too.
  for (const nav of publicNavs) {
    createNode({
      ...nav,
      id: createNodeId(`PublicNavigation-${nav.locale}`),
      parent: null,
      children: [],
      internal: {
        type: "StrapiPublicNavigation",
        contentDigest: createContentDigest(nav),
      },
    })
  }

  reporter.success("Navigations loaded")
}

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
  type StrapiNavigation implements Node {
    locale: String!
    items: [StrapiNavigationItem!]!
  }
  type StrapiPublicNavigation implements Node {
    locale: String!
    items: [StrapiNavigationItem!]!
  }
  type StrapiNavigationItem {
    title: String!
    slug: String!
    path: String!
    menuAttached: Boolean!
    related: StrapiNavigatesTo
    items: [StrapiNavigationItem!]!
  }
  type StrapiNavigatesTo {
    title: String!
  }
  `)
}

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const { data } = await graphql(`
    query {
      allStrapiLandingPage {
        nodes {
          locale
        }
      }
      allStrapiNavigation {
        nodes {
          locale
          items {
            title
            path
            menuAttached
            related {
              id
            }
            items {
              title
              path
              menuAttached
              related {
                id
              }
              items {
                title
                path
                menuAttached
                related {
                  id
                }
              }
            }
          }
        }
      }
    }
  `)

  // Create landing pages
  data.allStrapiLandingPage.nodes.forEach((page) => {
    createPage({
      path: pathWithLocale("", page.locale) || "/",
      component: require.resolve("./src/templates/landingPage.tsx"),
      context: {
        locale: page.locale,
      },
    })
  })

  // Create events pages
  Object.entries(EVENTS_URLS).forEach(([locale, path]) => {
    const basePath = pathWithLocale(path, locale)
    createPage({
      path: basePath,
      matchPath: `${basePath}/*`,
      component: require.resolve("./src/templates/eventsPage.tsx"),
      context: {
        locale,
      },
    })
  })

  // Create content pages from the navigation tree
  const createPagesFromNav = (nav, locale) => {
    if (nav.related && nav.path) {
      createPage({
        path: pathWithLocale(nav.path, locale),
        component: require.resolve("./src/templates/page.tsx"),
        context: {
          locale,
          pageId: nav.related.id,
        },
      })
    }
    // Process child items
    nav.items?.forEach((item) => createPagesFromNav(item, locale))
  }
  data.allStrapiNavigation.nodes.forEach((nav) =>
    createPagesFromNav(nav, nav.locale)
  )
}
