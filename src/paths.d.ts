import { Locale } from "./types/strapi"

/** Events page paths without locales */
export declare const EVENTS_URLS: {
  fi: string
  en: string
}

/** Prepends the locale in the path if not Finnish */
export declare const pathWithLocale: (path: string, locale: Locale) => string

export declare const otherLocale: (locale: Locale) => Locale

export declare const pathWithOtherLocale: (
  path: string,
  locale: Locale
) => string
