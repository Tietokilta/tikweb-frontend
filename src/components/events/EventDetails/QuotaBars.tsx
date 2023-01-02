import { useSingleEventContext } from "@tietokilta/ilmomasiina-components"
import {
  OPENQUOTA,
  WAITLIST,
} from "@tietokilta/ilmomasiina-components/dist/utils/signupUtils"
import { FC } from "react"
import { H3 } from "../../typography"

type QuotaBarProps = {
  title: string
  value: number
  max: number
}

/** Single progress bar for a quota's signup count. */
const QuotaBar: FC<QuotaBarProps> = ({ title, value, max }) => (
  <div>
    {title}
    <div
      role="progressbar"
      className="bg-gray-light"
      aria-valuemax={max}
      aria-valuenow={value}
    >
      <div
        className="bg-orange text-white text-sm px-2 min-w-max whitespace-nowrap"
        style={{ width: `${(value / max) * 100}%` }}
      >
        {value}
        &ensp;/&ensp;
        {max !== Infinity ? max : <span title="Unlimited">&infin;</span>}
      </div>
    </div>
  </div>
)

/** Progress bars for all quotas' signup counts. */
const QuotaBars: FC = () => {
  const { event, signupsByQuota } = useSingleEventContext()
  if (!event || !signupsByQuota) {
    return null
  }
  return (
    <div className="bg-gray-lightest p-4 flex flex-col gap-2">
      <H3>Ilmoittautuneet</H3>
      {signupsByQuota.map((quota) => {
        if (quota.id === OPENQUOTA) {
          return (
            <QuotaBar
              key={quota.id}
              title="Avoin"
              value={quota.signupCount}
              max={event.openQuotaSize}
            />
          )
        }
        if (quota.id === WAITLIST) {
          if (quota.signupCount > 0) {
            return <p key={quota.id}>{`Jonossa: ${quota.signupCount}`}</p>
          }
          return null
        }
        return (
          <QuotaBar
            key={quota.id}
            title={quota.title}
            value={quota.signupCount}
            max={quota.size || Infinity}
          />
        )
      })}
    </div>
  )
}

export default QuotaBars
