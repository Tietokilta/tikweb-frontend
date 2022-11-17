import {
  RouteComponentProps,
  Router,
  useNavigate,
  useParams,
} from "@gatsbyjs/reach-router"
import { configure } from "@tietokilta/ilmomasiina-components/dist/config"
import { LinkProps } from "@tietokilta/ilmomasiina-components/dist/config/router"
import { PathsContext } from "@tietokilta/ilmomasiina-components/dist/contexts/paths"
import { EditSignupProps } from "@tietokilta/ilmomasiina-components/dist/modules/editSignup"
import { SingleEventProps } from "@tietokilta/ilmomasiina-components/dist/modules/singleEvent"
import EditSignupOrig from "@tietokilta/ilmomasiina-components/dist/routes/EditSignup"
import EventsOrig from "@tietokilta/ilmomasiina-components/dist/routes/Events"
import SingleEventOrig from "@tietokilta/ilmomasiina-components/dist/routes/SingleEvent"
import { Link } from "gatsby"
import React, { PropsWithChildren, useMemo } from "react"
import Layout from "../components/Layout"
import { PageContext, PageInfo } from "../contexts/PageContext"
import { EVENTS_PATHS, otherLocale } from "../paths"
import { Locale } from "../types/strapi"

/** Adapts @reach/router Link to Ilmomasiina */
const LinkAdapter: React.FC<LinkProps> = ({ to, replace, children }) => (
  <Link to={to} replace={replace}>
    {children}
  </Link>
)

configure({
  api: "https://tik-ilmo-prod-app.azurewebsites.net/api",
  router: {
    Link: LinkAdapter,
    useNavigate,
    useParams,
  },
  timezone: "Europe/Helsinki",
})

type WrapperProps = PropsWithChildren<PageInfo>

/** Common code for all routes */
const RouteWrapper: React.FC<WrapperProps> = ({
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

const otherLocalePaths = (locale: Locale) => EVENTS_PATHS[otherLocale(locale)]

type RouteProps<P = unknown> = RouteComponentProps<P> & {
  locale: Locale
}

const EventsList: React.FC<RouteProps> = ({ locale }) => {
  const localeLink = otherLocalePaths(locale).eventsList
  return (
    <RouteWrapper locale={locale} localeLink={localeLink}>
      <EventsOrig />
    </RouteWrapper>
  )
}

const EventDetails: React.FC<RouteProps<SingleEventProps>> = ({
  locale,
  slug,
}) => {
  const localeLink = otherLocalePaths(locale).eventDetails(slug!)
  return (
    <RouteWrapper locale={locale} localeLink={localeLink}>
      <SingleEventOrig />
    </RouteWrapper>
  )
}

const EditSignup: React.FC<RouteProps<EditSignupProps>> = ({
  locale,
  id,
  editToken,
}) => {
  const localeLink = otherLocalePaths(locale).editSignup(id!, editToken!)
  return (
    <RouteWrapper locale={locale} localeLink={localeLink}>
      <EditSignupOrig />
    </RouteWrapper>
  )
}

type Props = {
  pageContext: {
    locale: Locale
  }
}

const EventsPage: React.FC<Props> = ({ pageContext: { locale } }) => {
  // Paths depend on locale
  const paths = EVENTS_PATHS[locale]
  return (
    <PathsContext.Provider value={paths}>
      <Router>
        <EventsList path={paths.eventsList} locale={locale} />
        <EventDetails path={paths.eventDetails(":slug")} locale={locale} />
        <EditSignup
          path={paths.editSignup(":id", ":editToken")}
          locale={locale}
        />
      </Router>
    </PathsContext.Provider>
  )
}

export default EventsPage
