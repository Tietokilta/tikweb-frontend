import { useNavigate } from "@gatsbyjs/reach-router"
import {
  useDeleteSignup,
  useEditSignupContext,
} from "@tietokilta/ilmomasiina-components"
import { useFormikContext } from "formik"
import { FC, useCallback, useState } from "react"
import { toast } from "react-toastify"
import { H2, P } from "../../typography"
import { ConfirmButton } from "../inputs"
import { useEventsPaths } from "../utils"

const DELETE_CONFIRM_MS = 4000

const DeleteSignup: FC = () => {
  const { event } = useEditSignupContext()
  const deleteSignup = useDeleteSignup()
  const navigate = useNavigate()
  const paths = useEventsPaths()

  const { isSubmitting, setSubmitting } = useFormikContext()
  const [isDeleting, setDeleting] = useState(false)

  const doDelete = useCallback(async () => {
    try {
      setSubmitting(true)
      setDeleting(true)
      await deleteSignup()
      toast.success("Ilmoittautumisesi poistettiin onnistuneesti.", {
        autoClose: 10000,
      })
      if (event) navigate(paths.eventDetails(event.slug))
    } catch (error) {
      setSubmitting(false)
      setDeleting(false)
      toast.error("Poisto epäonnistui.", {
        autoClose: 5000,
      })
    }
  }, [deleteSignup, event, navigate, paths, setSubmitting])

  if (!event) return null

  return (
    <div className="mt-6">
      <H2>Poista ilmoittautuminen</H2>
      <P>
        Oletko varma, että haluat poistaa ilmoittautumisesi tapahtumaan{" "}
        <strong>{event.title}</strong>?
      </P>
      <P>
        Jos poistat ilmoittautumisesi, menetät paikkasi jonossa. Jos muutat
        mielesi, voit aina ilmoittautua tapahtumaan uudelleen myöhemmin, mutta
        siirryt silloin jonon hännille.{" "}
        <strong>Tätä toimintoa ei voi perua.</strong>
      </P>
      <div className="flex justify-center">
        <ConfirmButton
          type="button"
          intent="danger"
          className="font-bold"
          disabled={isSubmitting}
          loading={isDeleting}
          onClick={doDelete}
          confirmDelay={DELETE_CONFIRM_MS}
          confirmLabel="Paina uudelleen varmistukseksi&hellip;"
        >
          Poista ilmoittautuminen
        </ConfirmButton>
      </div>
    </div>
  )
}

export default DeleteSignup
