import classNames from "classnames"
import { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLHeadingElement>

// We can't declare this as React.FC because it'd break react-markdown typings
const H2 = ({ children, className }: Props) => {
  return (
    <h2 className={classNames("font-mono text-xl", className)}>{children}</h2>
  )
}

export default H2
