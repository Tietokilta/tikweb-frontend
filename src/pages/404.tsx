import { useLocation } from "@gatsbyjs/reach-router"
import { PageProps } from "gatsby"
import { useMemo } from "react"
import Layout from "../components/Layout"
import SideBar from "../components/SideBar"
import { PageContext, PageInfo } from "../contexts/PageContext"
import { pathWithOtherLocale } from "../paths"

const NotFoundPage: React.FC<PageProps> = () => {
  const { pathname } = useLocation()
  const locale = pathname.startsWith("/en/") ? "en" : "fi"
  const context: PageInfo = useMemo(
    () => ({ locale, localeLink: pathWithOtherLocale("", locale) }),
    []
  )
  return (
    <PageContext.Provider value={context}>
      <Layout>
        <SideBar>
          {locale === "fi" ? (
            <>
              <h1>Sivua {pathname} ei löytynyt</h1>
              <a href="/">Takaisin kotisivulle</a>
            </>
          ) : (
            <>
              <h1>Page {pathname} Not Found</h1>
              <a href="/en">Back to Homepage</a>
            </>
          )}
        </SideBar>
      </Layout>
    </PageContext.Provider>
  )
}

export default NotFoundPage
