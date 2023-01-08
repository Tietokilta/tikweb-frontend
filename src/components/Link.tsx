import { Link as GatsbyLink, GatsbyLinkProps } from "gatsby"
import { FC } from "react"

/* eslint-disable react/jsx-props-no-spreading */

const isAbsolute = (url: string) => /^\w+:/.test(url)

/** Renders either a Gatsby `Link` or a regular `<a>` based on if `to` is absolute.
 *
 * Because for *whatever reason* Gatsby can't do this themselves.
 *
 * @see https://gatsby.dev/internal-links
 */
const Link: FC<Omit<GatsbyLinkProps<never>, "ref">> = ({
  to,
  children,
  ...props
}) =>
  typeof to !== "string" || isAbsolute(String(to)) ? (
    <a href={to} {...props}>
      {children}
    </a>
  ) : (
    <GatsbyLink to={to} {...props}>
      {children}
    </GatsbyLink>
  )

export default Link
