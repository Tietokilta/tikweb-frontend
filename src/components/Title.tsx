import classNames from "classnames"
import { HTMLAttributes } from "react"

type Props = HTMLAttributes<HTMLHeadingElement>

// We can't declare this as React.FC because it'd break react-markdown typings
const Title = ({ children, className }: Props) => {
  return (
    <h4 className={classNames("font-mono text-xl", className)}>{children}</h4>
  )
}

export default Title
