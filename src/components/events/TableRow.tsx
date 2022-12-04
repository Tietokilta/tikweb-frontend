import { SignupStateText } from "@tietokilta/ilmomasiina-components/dist/utils/signupStateText"
import { ReactNode } from "react"

type Props = {
  className: string
  title: ReactNode
  date?: string
  signupStatus?: SignupStateText
  signupCount?: number
  quotaSize?: number | null
}

const TableRow = ({
  className,
  title,
  date,
  signupStatus,
  signupCount,
  quotaSize,
}: Props) => (
  <tr className={className}>
    <td
      key="title"
      className="p-3 border-t-2 border-gray-lightest border-solid md:min-w-[300px]"
    >
      {title}
    </td>
    <td key="date" className="p-3 border-t-2 border-gray-lightest border-solid">
      {date}
    </td>
    <td
      key="signup"
      className="p-3 border-t-2 border-gray-lightest border-solid"
    >
      <span className="hidden sm:inline">{signupStatus?.shortLabel}</span>
      <span className="sm:hidden">
        {signupStatus?.fullLabel || signupStatus?.shortLabel}
      </span>
    </td>
    <td
      key="signups"
      className="p-3 border-t-2 border-gray-lightest border-solid"
    >
      {signupCount !== undefined && (
        <span className="sm:hidden">Ilmoittautuneita: </span>
      )}
      {signupCount}
      {quotaSize && <>&ensp;/&ensp;</>}
      {quotaSize || ""}
    </td>
  </tr>
)

export default TableRow
