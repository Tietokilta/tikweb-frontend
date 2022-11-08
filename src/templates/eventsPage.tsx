import {
  RouteComponentProps,
  Router,
  useNavigate,
  useParams,
} from "@gatsbyjs/reach-router"
import { configure } from "@tietokilta/ilmomasiina-components/dist/config"
import EventsOrig from "@tietokilta/ilmomasiina-components/dist/routes/Events"
import SingleEventOrig from "@tietokilta/ilmomasiina-components/dist/routes/SingleEvent"
import EditSignupOrig from "@tietokilta/ilmomasiina-components/dist/routes/EditSignup"
import { LinkProps } from "@tietokilta/ilmomasiina-components/dist/config/router"
import { Link } from "gatsby"
import Layout from "../components/Layout"
import { LocaleContext } from "../contexts/PageContext"

const LinkAdapter: React.FC<LinkProps> = ({ to, replace, children }) => (
  <Link to={to} replace={replace}>
    {children}
  </Link>
)

configure({
  paths: {
    hasAdmin: false,
    api: "https://tik-ilmo-prod-app.azurewebsites.net/api",
    eventsList: "/tapahtumat",
    eventDetails: (slug) => `/tapahtumat/${slug}`,
    editSignup: (signupId, editToken) =>
      `/tapahtumat/ilmot/${signupId}/${editToken}`,
  },
  router: {
    Link: LinkAdapter,
    useNavigate,
    useParams,
  },
  timezone: "Europe/Helsinki",
})

const EventsList: React.FC<RouteComponentProps> = () => <EventsOrig />

const EventDetails: React.FC<RouteComponentProps> = () => <SingleEventOrig />

const EditSignup: React.FC<RouteComponentProps> = () => <EditSignupOrig />

type Props = {
  pageContext: {
    locale: string
  }
  uri: string
}

const EventsPage: React.FC<Props> = ({ pageContext: { locale }, uri }) => {
  return (
    <LocaleContext.Provider value={locale}>
      <Layout>
        <div className="ilmo px-5 py-4">
          <Router basepath={uri}>
            <EventsList path="/" />
            <EventDetails path="/:slug" />
            <EditSignup path="/ilmot/:id/:editToken" />
          </Router>
        </div>
      </Layout>
    </LocaleContext.Provider>
  )
}

export default EventsPage
