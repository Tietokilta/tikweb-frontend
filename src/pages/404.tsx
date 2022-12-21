import { useLocation } from "@gatsbyjs/reach-router"
import { PageProps } from "gatsby"
import { useMemo } from "react"
import DinoGame from "../components/DinoGame"
import Layout from "../components/Layout"
import Meta from "../components/Meta"
import SideBar from "../components/SideBar"
import { H1 } from "../components/typography"
import { PageContext, PageInfo } from "../contexts/PageContext"
import { pathWithOtherLocale } from "../paths"

const NotFoundPage: React.FC<PageProps> = () => {
  const { pathname } = useLocation()
  const locale = pathname.startsWith("/en/") ? "en" : "fi"
  const context: PageInfo = useMemo(
    () => ({ locale, localeLink: pathWithOtherLocale("", locale) }),
    [locale]
  )
  return (
    <PageContext.Provider value={context}>
      <Layout>
        <SideBar>
          {locale === "fi" ? (
            <>
              <H1>Sivua {pathname} ei löytynyt</H1>
              <a href="/">Takaisin kotisivulle</a>
            </>
          ) : (
            <>
              <H1>Page {pathname} Not Found</H1>
              <a href="/en">Back to homepage</a>
            </>
          )}
          <DinoGame />
        </SideBar>
      </Layout>
    </PageContext.Provider>
  )
}

export const Head = () => {
  const { pathname } = useLocation()
  const locale = pathname.startsWith("/en/") ? "en" : "fi"
  return (
    <Meta title={locale === "fi" ? "Sivua ei löytynyt" : "Page not found"} />
  )
}
export default NotFoundPage
