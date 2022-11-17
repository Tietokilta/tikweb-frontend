import { IlmoPaths } from "@tietokilta/ilmomasiina-components/dist/contexts/paths"
import { Locale } from "./types/strapi"

/** Events page paths without locales */
export declare const EVENTS_PATHS: Record<Locale, IlmoPaths>

/** Prepends the locale in the path if not Finnish */
export declare const pathWithLocale: (path: string, locale: Locale) => string

export declare const otherLocale: (locale: Locale) => Locale

export declare const pathWithOtherLocale: (
  path: string,
  locale: Locale
) => string
