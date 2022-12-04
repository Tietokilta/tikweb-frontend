import { useSingleEventContext } from "@tietokilta/ilmomasiina-components"
import {
  OPENQUOTA,
  QuotaSignups,
  WAITLIST,
} from "@tietokilta/ilmomasiina-components/dist/utils/signupUtils"
import filter from "lodash/filter"
import SignupListRow from "./SignupListRow"

type Props = {
  quota: QuotaSignups
}

const SignupList = ({ quota }: Props) => {
  const { signups } = quota
  const { questions, nameQuestion } = useSingleEventContext().event!
  const showQuotas = quota.id === OPENQUOTA || quota.id === WAITLIST
  return (
    <div className="ilmo--quota-signups">
      <h3>{quota.title}</h3>
      {!signups?.length ? (
        <p>Ei ilmoittautumisia.</p>
      ) : (
        <div className="w-full">
          <table>
            <thead className="thead-light">
              <tr>
                <th key="position">Sija</th>
                {nameQuestion && (
                  <th key="attendee" style={{ minWidth: 90 }}>
                    Nimi
                  </th>
                )}
                {filter(questions, "public").map((question) => (
                  <th key={question.id}>{question.question}</th>
                ))}
                {showQuotas && <th key="quota">Kiintiö</th>}
                <th key="datetime" style={{ minWidth: 130 }}>
                  Ilmoittautumisaika
                </th>
              </tr>
            </thead>
            <tbody>
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
