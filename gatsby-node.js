// this is Node.js code
/* eslint-disable no-restricted-syntax, @typescript-eslint/no-var-requires */

const fetch = require("node-fetch")
const { EVENTS_PATHS, pathWithLocale } = require("./src/paths")

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

exports.sourceNodes = async ({
  actions: { createNode, createNodeField },
  createNodeId,
  createContentDigest,
  getNodesByType,
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

  // Fetch all page nodes already in GraphQL and map them to Strapi IDs.
  const pages = getNodesByType("STRAPI_PAGE")
  const pagesById = new Map(pages.map((page) => [page.strapi_id, page]))

  // Add paths to Strapi page nodes based on the nav structure.
  const addPagePaths = (nav, locale) => {
    const page = pagesById.get(nav.related?.id)
    if (nav.path && page) {
      const path = pathWithLocale(nav.path, locale)
      createNodeField({ node: page, name: "path", value: path })
    }
    nav.items?.forEach((item) => addPagePaths(item, locale))
  }
  navs.forEach((nav) => addPagePaths(nav, nav.locale))

  // Add localized paths to pages as well.
  for (const page of pages) {
    const otherLocale = page.localizations.data[0]
    const otherPage = pagesById.get(otherLocale?.id)
    if (otherPage) {
      // Ideally this would use @link, but there's not really a good way of doing
      // that without recreating the node
      createNodeField({
        node: page,
        name: "localeLink",
        value: otherPage.fields?.path,
      })
    }
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
    union COMMON_CONTENT = STRAPI__COMPONENT_COMMON_CONTENT_TEXT_BLOCK | STRAPI__COMPONENT_COMMON_CONTENT_COMMITTEE
  `)
}

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const { data } = await graphql(`
    query {
      allStrapiPage {
        nodes {
          id
          fields {
            path
          }
        }
      }
      allStrapiLandingPage {
        nodes {
          locale
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
  Object.entries(EVENTS_PATHS).forEach(([locale, paths]) => {
    createPage({
      path: paths.eventsList,
      matchPath: `${paths.eventsList}/*`,
      component: require.resolve("./src/templates/eventsPage.tsx"),
      context: {
        locale,
      },
    })
  })

  // Create content pages
  data.allStrapiPage.nodes.forEach((page) => {
    if (!page.fields?.path) return
    createPage({
      path: page.fields.path,
      component: require.resolve("./src/templates/page.tsx"),
      context: {
        pageId: page.id,
      },
    })
  })
}
