import { useEditSignupContext } from "@tietokilta/ilmomasiina-components"
import { P } from "../../typography"

const SignupStatus = () => {
  const { event, signup } = useEditSignupContext()
  if (!event || !signup) return null
  const { status, position, quota } = signup
  const { openQuotaSize } = event

  if (status === "in-quota") {
    return (
      <P>
        {"Olet kiintiössä "}
        <strong>{quota.title}</strong>
        {" sijalla "}
        <strong>{quota.size ? `${position} / ${quota.size}` : position}</strong>
        .
      </P>
    )
  }

  if (status === "in-open") {
    return (
      <P>
        {"Olet avoimessa kiintiössä sijalla "}
        <strong>{`${position} / ${openQuotaSize}`}</strong>.
      </P>
    )
  }

  return (
    <P>
      {"Olet jonossa sijalla "}
      <strong>{position}</strong>.
    </P>
  )
}

export default SignupStatus
