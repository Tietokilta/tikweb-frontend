import { useNavigate } from "@gatsbyjs/reach-router"
import {
  beginSignup,
  useSingleEventContext,
} from "@tietokilta/ilmomasiina-components"
import {
  signupState,
  signupStateText,
} from "@tietokilta/ilmomasiina-components/dist/utils/signupStateText"
import { Quota } from "@tietokilta/ilmomasiina-models"
import moment from "moment-timezone"
import { useCallback, useState } from "react"
import Countdown from "react-countdown"
import { toast } from "react-toastify"
import { H3 } from "../../typography"
import { Button } from "../inputs"
import { useEventsPaths } from "../utils"

/** How long before opening the signup to show a countdown. */
const COUNTDOWN_DURATION = 60 * 1000

type SignupButtonProps = {
  isOpen: boolean
  isClosed: boolean
  seconds: number
  total: number
}

/** Signup button for a single quota. */
const SignupButton = ({
  isOpen,
  isClosed,
  seconds,
  total,
}: SignupButtonProps) => {
  const navigate = useNavigate()
  const paths = useEventsPaths()
  const { registrationStartDate, registrationEndDate, quotas } =
    useSingleEventContext().event!
  const eventState = signupState(registrationStartDate, registrationEndDate)
  const [submitting, setSubmitting] = useState<string>()
  const isOnly = quotas.length === 1

  const onClick = useCallback(
    async (quotaId: Quota.Id) => {
      if (!isOpen) return
      setSubmitting(quotaId)
      try {
        const response = await beginSignup(quotaId)
        navigate(paths.editSignup(response.id, response.editToken))
      } catch (e) {
        setSubmitting(undefined)
        toast.error("Ilmoittautuminen epäonnistui.", {
          autoClose: 5000,
        })
      }
    },
    [navigate, paths, isOpen]
  )

  return (
    <div className="bg-gray-lightest p-4 flex flex-col">
      <H3>Ilmoittautuminen</H3>
      <p>
        {signupStateText(eventState).shortLabel}
        {total < COUNTDOWN_DURATION && !isOpen && !isClosed && (
          <span className="text-green-700">{` (${seconds} s)`}</span>
        )}
      </p>
      {quotas.map((quota) => (
        <Button
          key={quota.id}
          disabled={!isOpen || submitting !== undefined}
          loading={submitting === quota.id}
          className="block mt-3"
          onClick={() => onClick(quota.id)}
        >
          {isOnly ? "Ilmoittaudu nyt" : `Ilmoittaudu: ${quota.title}`}
        </Button>
      ))}
    </div>
  )
}

/** Signup buttons for all quotas. */
const SignupButtons = () => {
  const event = useSingleEventContext().event!
  const openingTime = moment()
    .add(event.millisTillOpening || 0, "ms")
    .toDate()

  return (
    <Countdown
      daysInHours
      date={openingTime}
      renderer={({ completed, seconds, total }) => (
        <SignupButton
          isOpen={completed && !event.registrationClosed}
          isClosed={event.registrationClosed}
          seconds={seconds}
          total={total}
        />
      )}
    />
  )
}

export default SignupButtons
