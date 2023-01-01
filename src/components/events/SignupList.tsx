import { useSingleEventContext } from "@tietokilta/ilmomasiina-components"
import {
  OPENQUOTA,
  QuotaSignups,
  WAITLIST,
} from "@tietokilta/ilmomasiina-components/dist/utils/signupUtils"
import classNames from "classnames"
import filter from "lodash/filter"
import { FC, ThHTMLAttributes } from "react"
import { H3 } from "../typography"
import SignupListRow from "./SignupListRow"

const Th: FC<ThHTMLAttributes<HTMLTableCellElement>> = ({
  className,
  ...props
}) => (
  <th
    className={classNames("text-left p-1 bg-gray-lightest", className)}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
  />
)

type Props = {
  quota: QuotaSignups
}

const SignupList = ({ quota }: Props) => {
  const { signups } = quota
  const { questions, nameQuestion } = useSingleEventContext().event!
  const showQuotas = quota.id === OPENQUOTA || quota.id === WAITLIST
  return (
    <div className="mt-4 mb-8">
      <H3>{quota.title}</H3>
      {!signups?.length ? (
        <p>Ei ilmoittautumisia.</p>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="w-full text-[0.9em]">
            <thead className="thead-light">
              <tr>
                <Th key="position" className="min-w-[40px]">
                  Sija
                </Th>
                {nameQuestion && (
                  <Th key="attendee" className="min-w-[90px]">
                    Nimi
                  </Th>
                )}
                {filter(questions, "public").map((question) => (
                  <Th key={question.id} className="min-w-[120px]">
                    {question.question}
                  </Th>
                ))}
                {showQuotas && (
                  <Th key="quota" className="min-w-[120px]">
                    Kiintiö
                  </Th>
                )}
                <Th key="datetime" className="min-w-[130px]">
                  Ilmoittautumisaika
                </Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-lightest">
              {signups.map((signup, i) => (
                <SignupListRow
                  index={i + 1}
                  signup={signup}
                  showQuota={showQuotas}
                  // eslint-disable-next-line react/no-array-index-key
                  key={i}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default SignupList
