/** Events page paths with locales */
const EVENTS_PATHS = {
  fi: {
    eventsList: "/tapahtumat",
    eventDetails: (slug) => `/tapahtumat/${slug}`,
    editSignup: (id, editToken) => `/tapahtumat/ilmo/${id}/${editToken}`,
  },
  en: {
    eventsList: "/en/events",
    eventDetails: (slug) => `/en/events/${slug}`,
    editSignup: (id, editToken) => `/en/events/signup/${id}/${editToken}`,
  },
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
  EVENTS_PATHS,
  pathWithLocale,
  otherLocale,
  pathWithOtherLocale,
}
