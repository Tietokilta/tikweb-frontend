import { useNavigate, useParams } from "@gatsbyjs/reach-router"
import { configure } from "@tietokilta/ilmomasiina-components"
import Link from "../Link"

export const timezone = "Europe/Helsinki"

configure({
  api: "https://tik-ilmo-prod-app.azurewebsites.net/api",
  router: {
    Link,
    useNavigate,
    useParams,
  },
  timezone,
})
