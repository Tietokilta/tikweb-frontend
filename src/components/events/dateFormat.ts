import { timezone } from "./config"
import { Locale } from "../../types/strapi"

const dateFormatLocales: Record<Locale, string[]> = {
  fi: ["fi-FI", "fi"],
  en: ["en-FI", "en-UK", "en"],
}

export function dateTimeFormat(locale: Locale) {
  return new Intl.DateTimeFormat(dateFormatLocales[locale], {
    weekday: "short",
    day: "numeric",
    month: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: false,
    timeZone: timezone,
  })
}

export function dateFormat(locale: Locale) {
  return new Intl.DateTimeFormat(dateFormatLocales[locale], {
    day: "numeric",
    month: "numeric",
    year: "numeric",
    timeZone: timezone,
  })
}
