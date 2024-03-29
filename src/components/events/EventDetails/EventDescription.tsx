import moment from "moment-timezone"
import { useSingleEventContext } from "@tietokilta/ilmomasiina-components"
import { A, H1 } from "../../typography"
import { timezone } from "../config"
import Markdown from "../../Markdown"

const EventDescription = () => {
  const { event } = useSingleEventContext()
  if (!event) {
    return null
  }
  return (
    <div className="basis-2/3 grow mb-6">
      <H1 className="my-3">{event.title}</H1>
      <div className="border-y-2 border-solid border-gray-lightest py-1">
        {event.category && (
          <p className="my-1">
            <strong>Kategoria:</strong> {event.category}
          </p>
        )}
        {event.date && (
          <p className="my-1">
            <strong>{event.endDate ? "Alkaa:" : "Ajankohta:"}</strong>{" "}
            {moment(event.date).tz(timezone).format("D.M.Y [klo] HH:mm")}
          </p>
        )}
        {event.endDate && (
          <p className="my-1">
            <strong>Loppuu:</strong>{" "}
            {moment(event.endDate).tz(timezone).format("D.M.Y [klo] HH:mm")}
          </p>
        )}
        {event.location && (
          <p className="my-1">
            <strong>Sijainti:</strong> {event.location}
          </p>
        )}
        {event.price && (
          <p className="my-1">
            <strong>Hinta:</strong> {event.price}
          </p>
        )}
        {event.webpageUrl && (
          <p className="my-1">
            <strong>Kotisivut:</strong>{" "}
            <A
              href={event.webpageUrl}
              title="Kotisivut"
              target="_blank"
              rel="noreferrer noopener"
            >
              {event.webpageUrl}
            </A>
          </p>
        )}
        {event.facebookUrl && (
          <p className="my-1">
            <strong>Facebook-tapahtuma:</strong>{" "}
            <A
              href={event.facebookUrl}
              title="Facebook-tapahtuma"
              target="_blank"
              rel="noreferrer noopener"
            >
              {event.facebookUrl}
            </A>
          </p>
        )}
      </div>
      <div>
        <Markdown>{event.description || ""}</Markdown>
      </div>
    </div>
  )
}

export default EventDescription
