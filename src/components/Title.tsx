import classNames from "classnames"

type Props = {
  children: JSX.Element | string
  className?: string
}

const Title: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <h4 className={classNames("font-mono text-xl", className)}>{children}</h4>
  )
}

export default Title
