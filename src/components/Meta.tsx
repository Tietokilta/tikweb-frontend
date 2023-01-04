import { Locale } from "../types/strapi"

type Props = {
  title: string
  titleSuffix?: boolean
  description?: string
  noIndex?: boolean
  localeLink?: {
    locale: Locale
    href: string
  }
}

const Meta: React.FC<Props> = ({
  title,
  titleSuffix = true,
  description,
  noIndex,
  localeLink,
}) => {
  return (
    <>
      <title>
        {title}
        {titleSuffix && " \u2013 Tietokilta"}
      </title>
      {description && <meta name="description" content={description} />}
      {noIndex && <meta name="robots" content="noindex" />}
      {localeLink && (
        <link
          rel="alternate"
          hrefLang={localeLink.locale}
          href={localeLink.href}
        />
      )}
    </>
  )
}

export default Meta
