import { useNavigate, useParams } from "@gatsbyjs/reach-router"
import { configure } from "@tietokilta/ilmomasiina-components"
import { LinkProps } from "@tietokilta/ilmomasiina-components/dist/config/router"
import { Link } from "gatsby"

export const timezone = "Europe/Helsinki"

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
