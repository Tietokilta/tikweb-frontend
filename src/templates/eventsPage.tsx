import { Router, useNavigate, useParams } from "@gatsbyjs/reach-router"
import { configure, PathsContext } from "@tietokilta/ilmomasiina-components"
import { LinkProps } from "@tietokilta/ilmomasiina-components/dist/config/router"
import { Link } from "gatsby"
import React from "react"
import { ToastContainer } from "react-toastify"
import { timezone } from "../components/events/config"
import EditSignup from "../components/events/EditSignup"
import EventDetails from "../components/events/EventDetails"
import EventsList from "../components/events/EventsList"
import { EVENTS_PATHS } from "../paths"
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
  timezone,
})

type Props = {
  pageContext: {
    locale: Locale
  }
}

const EventsPage: React.FC<Props> = ({ pageContext: { locale } }) => {
  // Paths depend on locale
  const paths = EVENTS_PATHS[locale]
  return (
    <>
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
      <ToastContainer />
    </>
  )
}

export default EventsPage
