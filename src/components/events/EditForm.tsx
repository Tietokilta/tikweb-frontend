import { useNavigate } from "@gatsbyjs/reach-router"
import {
  useEditSignupContext,
  useUpdateSignup,
} from "@tietokilta/ilmomasiina-components"
import { Signup } from "@tietokilta/ilmomasiina-models"
import { Field, Formik, FormikHelpers } from "formik"
import { Link } from "gatsby"
import { useCallback, useState } from "react"
import { toast } from "react-toastify"
import { H1, P } from "../typography"
import DeleteSignup from "./DeleteSignup"
import FieldRow from "./FieldRow"
import { Button, CheckBox, TextInput } from "./inputs"
import QuestionFields from "./QuestionFields"
import SignupStatus from "./SignupStatus"
import { useEventsPaths } from "./utils"

const EditForm = () => {
  const { event, signup, registrationClosed } = useEditSignupContext()
  const isNew = signup!.confirmedAt === null
  const updateSignup = useUpdateSignup()
  const navigate = useNavigate()
  const paths = useEventsPaths()

  // TODO: actually use errors from API
  const [submitError, setSubmitError] = useState(false)

  const onSubmit = useCallback(
    async (
      answers: Signup.Update.Body,
      { setSubmitting }: FormikHelpers<Signup.Update.Body>
    ) => {
      const action = isNew ? "Ilmoittautuminen" : "Muokkaus"
      const progressToast = toast.loading(`${action} käynnissä`)

      try {
        await updateSignup(answers)

        toast.update(progressToast, {
          render: `${action} onnistui!`,
          type: toast.TYPE.SUCCESS,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
          isLoading: false,
        })
        setSubmitError(false)
        setSubmitting(false)
        if (isNew) {
          navigate(paths.eventDetails(event!.slug))
        }
      } catch (error) {
        toast.update(progressToast, {
          render: `${action} ei onnistunut. Tarkista, että kaikki pakolliset kentät on täytetty ja yritä uudestaan.`,
          type: toast.TYPE.ERROR,
          autoClose: 5000,
          closeButton: true,
          closeOnClick: true,
          isLoading: false,
        })
        setSubmitError(true)
        setSubmitting(false)
      }
    },
    [event, isNew, updateSignup, navigate, paths]
  )

  return (
    <Formik initialValues={signup! as Signup.Update.Body} onSubmit={onSubmit}>
      {({ handleSubmit, isSubmitting }) => (
        <>
          <H1>{isNew ? "Ilmoittaudu" : "Muokkaa ilmoittautumista"}</H1>
          <SignupStatus />
          {submitError && (
            <p className="text-red font-semibold my-2 p-3 rounded-lg border border-red bg-red bg-opacity-20">
              Ilmoittautumisessasi on virheitä.
            </p>
          )}
          {registrationClosed && (
            <p className="text-red font-semibold my-2 p-3 rounded-lg border border-red bg-red bg-opacity-20">
              Ilmoittautumistasi ei voi enää muokata tai perua, koska tapahtuman
              ilmoittautuminen on sulkeutunut.
            </p>
          )}
          <form onSubmit={handleSubmit}>
            {event!.nameQuestion && (
              <>
                <FieldRow id="firstName" label="Etunimi / First name" required>
                  <Field
                    as={TextInput}
                    name="firstName"
                    id="firstName"
                    placeholder="Etunimi"
                    required
                    readOnly={!isNew || registrationClosed}
                  />
                </FieldRow>
                <FieldRow id="lastName" label="Sukunimi / Last name" required>
                  <Field
                    as={TextInput}
                    name="lastName"
                    id="lastName"
                    placeholder="Sukunimi"
                    required
                    readOnly={!isNew || registrationClosed}
                  />
                </FieldRow>
                <FieldRow id="namePublic">
                  <Field
                    as={CheckBox}
                    name="namePublic"
                    id="namePublic"
                    type="checkbox"
                    disabled={registrationClosed}
                    label={
                      <div>
                        Näytä nimi julkisessa osallistujalistassa
                        <br />
                        Show name in public participant list
                      </div>
                    }
                  />
                </FieldRow>
              </>
            )}
            {event!.emailQuestion && (
              <FieldRow id="email" label="Sähköposti / Email" required>
                <Field
                  as={TextInput}
                  name="email"
                  id="email"
                  placeholder="Sähköpostisi"
                  required
                  readOnly={!isNew || registrationClosed}
                />
              </FieldRow>
            )}

            <QuestionFields
              name="answers"
              questions={event!.questions}
              disabled={registrationClosed}
            />

            {!registrationClosed && (
              <P>
                Voit muokata ilmoittautumistasi tai poistaa sen myöhemmin
                tallentamalla tämän sivun URL-osoitteen.
                {event!.emailQuestion &&
                  " Linkki lähetetään myös sähköpostiisi vahvistusviestissä."}
              </P>
            )}

            {!registrationClosed && (
              <nav className="flex justify-end items-baseline gap-3">
                {!isNew && (
                  <Link to={paths.eventDetails(event!.slug)}>Peruuta</Link>
                )}
                <Button
                  type="submit"
                  formNoValidate
                  loading={isSubmitting}
                  className="font-bold"
                >
                  {isNew ? "Lähetä" : "Päivitä"}
                </Button>
              </nav>
            )}
          </form>
          {!registrationClosed && <DeleteSignup />}
        </>
      )}
    </Formik>
  )
}

export default EditForm
