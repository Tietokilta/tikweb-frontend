import "../components/events/config"
import { Router } from "@gatsbyjs/reach-router"
import { PathsContext } from "@tietokilta/ilmomasiina-components"
import React from "react"
import { ToastContainer } from "react-toastify"
import EditSignup from "../components/events/EditSignup"
import EventDetails from "../components/events/EventDetails"
import EventsList from "../components/events/EventsList"
import Meta from "../components/Meta"
import { EVENTS_PATHS } from "../paths"
import { Locale } from "../types/strapi"

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

export const Head: React.FC<Props> = ({ pageContext: { locale } }) => (
  <Meta title={locale === "fi" ? "Tapahtumat" : "Events"} />
)

export default EventsPage
