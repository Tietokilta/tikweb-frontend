import { useLocation } from "@gatsbyjs/reach-router"
import { PageProps } from "gatsby"
import { useMemo } from "react"
import DinoGame from "../components/DinoGame"
import Layout from "../components/Layout"
import Meta from "../components/Meta"
import ContentPageLayout from "../components/ContentPageLayout"
import { A, H1 } from "../components/typography"
import { PageContext, PageInfo } from "../contexts/PageContext"
import { localeFromPath, pathWithOtherLocale } from "../paths"

const NotFoundPage: React.FC<PageProps> = () => {
  const { pathname } = useLocation()
  const locale = localeFromPath(pathname)
  const context: PageInfo = useMemo(
    () => ({ locale, localeLink: pathWithOtherLocale("", locale) }),
    [locale]
  )
  return (
    <PageContext.Provider value={context}>
      <Layout>
        <ContentPageLayout>
          {locale === "fi" ? (
            <>
              <H1>Sivua {pathname} ei löytynyt</H1>
              <A href="/">Takaisin kotisivulle</A>
            </>
          ) : (
            <>
              <H1>Page {pathname} Not Found</H1>
              <A href="/en">Back to homepage</A>
            </>
          )}
          <DinoGame />
        </ContentPageLayout>
      </Layout>
    </PageContext.Provider>
  )
}

export const Head = () => {
  const { pathname } = useLocation()
  const locale = localeFromPath(pathname)
  return (
    <Meta
      title={locale === "fi" ? "Sivua ei löytynyt" : "Page not found"}
      noIndex
    />
  )
}
export default NotFoundPage
