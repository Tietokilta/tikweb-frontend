import classNames from "classnames"
import { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLHeadingElement>

// We can't declare this as React.FC because it'd break react-markdown typings
const H1 = ({ children, className }: Props) => {
  return (
    <h1 className={classNames("font-mono text-4xl", className)}>{children}</h1>
  )
}

export default H1
