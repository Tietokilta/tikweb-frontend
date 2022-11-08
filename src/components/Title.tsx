import classNames from "classnames"
import { ReactNode } from "react"

type Props = {
  children: JSX.Element | string | ReactNode
  className?: string
}

const Title: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <h4 className={classNames("font-mono text-xl", className)}>{children}</h4>
  )
}

export default Title
