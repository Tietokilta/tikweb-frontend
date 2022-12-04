import classNames from "classnames"
import { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLHeadingElement>

// We can't declare these as React.FC because it'd break react-markdown typings

export const H1 = ({ children, className }: Props) => (
  <h1 className={classNames("font-mono text-4xl", className)}>{children}</h1>
)

export const H2 = ({ children, className }: Props) => (
  <h2 className={classNames("font-mono text-xl", className)}>{children}</h2>
)

export const H3 = ({ children, className }: Props) => (
  <h3 className={classNames("font-mono text-lg", className)}>{children}</h3>
)

export const H4 = ({ children, className }: Props) => (
  <h4 className={classNames("font-mono text-base", className)}>{children}</h4>
)

export const P = ({ children, className }: Props) => (
  <p className={classNames("my-2 leading-6", className)}>{children}</p>
)
