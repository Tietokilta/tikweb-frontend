import {
  EditSignupProps,
  EditSignupProvider,
  useEditSignupContext,
} from "@tietokilta/ilmomasiina-components"
import { A, H1, P } from "../../typography"
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
          <A href={paths.eventsList}>Palaa tapahtumalistaukseen</A>
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
  /** Injected from URL by reach-router */
  id = "",
  /** Injected from URL by reach-router */
  editToken = "",
}) => {
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
