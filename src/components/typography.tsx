import classNames from "classnames"
import { AnchorHTMLAttributes, HTMLAttributes } from "react"
import Link from "./Link"

// Not helpful here...
/* eslint-disable react/jsx-props-no-spreading */

// We can't declare these as React.FC because it'd break react-markdown typings

type HeadingProps = HTMLAttributes<HTMLHeadingElement>

export const H1 = ({ children, className, ...props }: HeadingProps) => (
  <h1
    className={classNames(
      "font-mono font-bold text-3xl sm:text-4xl mb-2",
      className
    )}
    {...props}
  >
    {children}
  </h1>
)

export const H2 = ({ children, className, ...props }: HeadingProps) => (
  <h2
    className={classNames("font-mono font-bold text-xl mb-2", className)}
    {...props}
  >
    {children}
  </h2>
)

export const H3 = ({ children, className, ...props }: HeadingProps) => (
  <h3
    className={classNames("font-mono font-bold text-lg mb-2", className)}
    {...props}
  >
    {children}
  </h3>
)

export const H4 = ({ children, className, ...props }: HeadingProps) => (
  <h4
    className={classNames("font-mono font-bold text-base mb-2", className)}
    {...props}
  >
    {children}
  </h4>
)

type ParaProps = HTMLAttributes<HTMLParagraphElement>

export const P = ({ children, className, ...props }: ParaProps) => (
  <p className={classNames("my-2 leading-normal", className)} {...props}>
    {children}
  </p>
)

type PreProps = HTMLAttributes<HTMLPreElement>

export const Pre = ({ children, className, ...props }: PreProps) => (
  <pre className={classNames("my-2 overflow-auto", className)} {...props}>
    {children}
  </pre>
)

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const A = ({ children, className, href, ...props }: AnchorProps) =>
  href === undefined ? (
    // No href, render as HTML
    <a className={className} {...props}>
      {children}
    </a>
  ) : (
    // Href set, render Gatsby link
    <Link
      className={classNames(
        "no-underline cursor-pointer font-bold text-orange",
        className
      )}
      to={href}
      {...props}
    >
      {children}
    </Link>
  )
