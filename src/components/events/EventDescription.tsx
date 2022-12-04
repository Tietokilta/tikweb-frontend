import moment from "moment-timezone"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

import { useSingleEventContext } from "@tietokilta/ilmomasiina-components"
import H1 from "../H1"
import { timezone } from "./config"

const EventDescription = () => {
  const event = useSingleEventContext().event!
  return (
    <article className="md:w-2/3">
      <H1>{event.title}</H1>
      <div className="ilmo--event-heading">
        {event.category && (
          <p>
            <strong>Kategoria:</strong> {event.category}
          </p>
        )}
        {event.date && (
          <p>
            <strong>{event.endDate ? "Alkaa:" : "Ajankohta:"}</strong>{" "}
            {moment(event.date).tz(timezone).format("D.M.Y [klo] HH:mm")}
          </p>
        )}
        {event.endDate && (
          <p>
            <strong>Loppuu:</strong>{" "}
            {moment(event.endDate).tz(timezone).format("D.M.Y [klo] HH:mm")}
          </p>
        )}
        {event.location && (
          <p>
            <strong>Sijainti:</strong> {event.location}
          </p>
        )}
        {event.price && (
          <p>
            <strong>Hinta:</strong> {event.price}
          </p>
        )}
        {event.webpageUrl && (
          <p>
            <strong>Kotisivut:</strong>{" "}
            <a
              href={event.webpageUrl}
              title="Kotisivut"
              target="_blank"
              rel="noreferrer noopener"
            >
              {event.webpageUrl}
            </a>
          </p>
        )}
        {event.facebookUrl && (
          <p>
            <strong>Facebook-tapahtuma:</strong>{" "}
            <a
              href={event.facebookUrl}
              title="Facebook-tapahtuma"
              target="_blank"
              rel="noreferrer noopener"
            >
              {event.facebookUrl}
            </a>
          </p>
        )}
      </div>
      <div className="ilmo--event-description">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {event.description || ""}
        </ReactMarkdown>
      </div>
    </article>
  )
}

export default EventDescription
