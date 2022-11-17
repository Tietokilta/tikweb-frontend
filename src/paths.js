/** Events page paths without locales */
const EVENTS_URLS = {
  fi: "/tapahtumat",
  en: "/events",
}

/** Prepends the locale in the path if not Finnish */
const pathWithLocale = (path, locale) => {
  if (locale === "fi") {
    // handle / specially
    return path || "/"
  }
  return `/${locale}${path}`
}

const otherLocale = (locale) => (locale === "fi" ? "en" : "fi")

const pathWithOtherLocale = (path, locale) =>
  pathWithLocale(path, otherLocale(locale))

module.exports = {
  EVENTS_URLS,
  pathWithLocale,
  otherLocale,
  pathWithOtherLocale,
}
