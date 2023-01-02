import {
  EditSignupProps,
  EditSignupProvider,
  useEditSignupContext,
} from "@tietokilta/ilmomasiina-components"
import { Link } from "gatsby"
import { H1, P } from "../../typography"
import EditForm from "./EditForm"
import Spinner from "../Spinner"
import {
  EventsRouteProps,
  otherLocalePaths,
  RouteWrapper,
  useEventsPaths,
} from "../utils"

const EditSignupView = () => {
  const { error, pending } = useEditSignupContext()
  const paths = useEventsPaths()

  if (pending) {
    return (
      <div className="flex justify-center pt-6">
        <Spinner />
      </div>
    )
  }
  if (error) {
    return (
      <>
        <H1>Ilmoittautumista ei löytynyt</H1>
        <P>Ilmoittautumisesi saattaa olla jo poistettu.</P>
        <P>
          <Link to={paths.eventsList}>Palaa tapahtumalistaukseen</Link>
        </P>
      </>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <EditForm />
    </div>
  )
}

const EditSignup: React.FC<EventsRouteProps<EditSignupProps>> = ({
  locale,
  id,
  editToken,
}) => {
  if (!id || !editToken) {
    return null
  }
  const localeLink = otherLocalePaths(locale).editSignup(id, editToken)
  return (
    <RouteWrapper locale={locale} localeLink={localeLink}>
      <EditSignupProvider id={id} editToken={editToken}>
        <EditSignupView />
      </EditSignupProvider>
    </RouteWrapper>
  )
}

export default EditSignup
