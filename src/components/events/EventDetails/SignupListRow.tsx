import { useSingleEventContext } from "@tietokilta/ilmomasiina-components"
import { SignupWithQuota } from "@tietokilta/ilmomasiina-components/dist/utils/signupUtils"
import classNames from "classnames"
import filter from "lodash/filter"
import find from "lodash/find"
import moment from "moment-timezone"
import { FC, TdHTMLAttributes } from "react"
import { timezone } from "../config"

const Td: FC<TdHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => (
  <td
    className={classNames("p-1", className)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)

type Props = {
  index: number
  showQuota: boolean
  signup: SignupWithQuota
}

const SignupListRow: FC<Props> = ({ showQuota, signup, index }) => {
  const {
    firstName,
    lastName,
    namePublic,
    answers,
    quotaName,
    createdAt,
    confirmed,
  } = signup
  const { event } = useSingleEventContext()
  if (!event) return null
  const { questions, nameQuestion } = event

  let fullName
  if (!confirmed) {
    fullName = "Vahvistamatta"
  } else if (!namePublic) {
    fullName = "Piilotettu"
  } else {
    fullName = `${firstName || ""} ${lastName || ""}`
  }

  return (
    <tr
      className={classNames(
        !confirmed && "text-gray-light",
        "first:border-t-0"
      )}
    >
      <Td>{`${index}.`}</Td>
      {nameQuestion && (
        <Td
          className={!confirmed || !namePublic ? "text-gray-light italic" : ""}
        >
          {fullName}
        </Td>
      )}
      {filter(questions, "public").map((question) => (
        <Td key={question.id}>
          {find(answers, { questionId: question.id })?.answer || ""}
        </Td>
      ))}
      {showQuota && <Td>{`${quotaName || ""}`}</Td>}
      <Td className="group">
        {moment(createdAt).tz(timezone).format("DD.MM.YYYY HH:mm:ss")}
        <span className="invisible group-hover:visible">
          {moment(createdAt).tz(timezone).format(".SSS")}
        </span>
      </Td>
    </tr>
  )
}

export default SignupListRow
