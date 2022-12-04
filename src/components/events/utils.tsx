import { RouteComponentProps } from "@gatsbyjs/reach-router"
import { PropsWithChildren, useContext, useMemo } from "react"
import { PageContext, PageInfo } from "../../contexts/PageContext"
import { EVENTS_PATHS, otherLocale } from "../../paths"
import { Locale } from "../../types/strapi"
import Layout from "../Layout"

export const useEventsPaths = () => {
  const { locale } = useContext(PageContext)
  return EVENTS_PATHS[locale]
}

export const otherLocalePaths = (locale: Locale) =>
  EVENTS_PATHS[otherLocale(locale)]

export type WrapperProps = PropsWithChildren<PageInfo>

/** Common code for all routes */
export const RouteWrapper: React.FC<WrapperProps> = ({
  locale,
  localeLink,
  children,
}) => {
  const context: PageInfo = useMemo(
    () => ({ locale, localeLink }),
    [locale, localeLink]
  )
  return (
    <PageContext.Provider value={context}>
      <Layout>
        <div className="ilmo px-5 py-4">{children}</div>
      </Layout>
    </PageContext.Provider>
  )
}

export type EventsRouteProps<P = unknown> = RouteComponentProps<P> & {
  locale: Locale
}
