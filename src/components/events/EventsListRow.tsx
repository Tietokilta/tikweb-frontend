import { SignupStateText } from "@tietokilta/ilmomasiina-components/dist/utils/signupStateText"
import { ReactNode } from "react"

type Props = {
  isQuota?: boolean
  stateClass?: string
  title: ReactNode
  date?: string
  signupStatus?: SignupStateText
  signupCount?: number
  quotaSize?: number | null
}

const EventsListRow = ({
  isQuota = false,
  stateClass = "",
  title,
  date,
  signupStatus,
  signupCount,
  quotaSize,
}: Props) => {
  const rowClass = isQuota
    ? "mt-2 sm:mt-0"
    : "mt-3 pt-3 border-t first:mt-0 first:pt-0 first:border-t-0 border-gray-lightest border-solid"
  const quotaClass = isQuota ? "pt-0 text-sm sm:text-base" : ""
  const titleClass = isQuota ? "sm:pl-10 font-semibold sm:font-normal" : ""

  return (
    <tr className={`flex flex-col sm:table-row ${rowClass}`}>
      <td
        key="title"
        className={`p-0 sm:p-3 align-top ${quotaClass} ${titleClass} sm:min-w-[240px] md:min-w-[300px]`}
      >
        {title}
      </td>
      <td key="date" className={`p-0 sm:p-3 align-top ${quotaClass}`}>
        {date}
      </td>
      <td
        key="signup"
        className={`p-0 sm:p-3 align-top ${quotaClass} ${stateClass}`}
      >
        <span className="hidden sm:inline">{signupStatus?.shortLabel}</span>
        <span className="sm:hidden">
          {signupStatus?.fullLabel || signupStatus?.shortLabel}
        </span>
      </td>
      <td key="signups" className={`p-0 sm:p-3 align-top ${quotaClass}`}>
        {signupCount !== undefined && (
          <span className="sm:hidden">Ilmoittautuneita: </span>
        )}
        {signupCount}
        {quotaSize && <>&ensp;/&ensp;</>}
        {quotaSize || ""}
      </td>
    </tr>
  )
}

export default EventsListRow
