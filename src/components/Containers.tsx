import classNames from "classnames"
import { HTMLAttributes } from "react"

type Props = Pick<HTMLAttributes<"div">, "className" | "style" | "children">

export const FullWidthContainer: React.FC<Props> = ({
  children,
  className,
  ...props
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <div className={classNames("w-full", className)} {...props}>
    {children}
  </div>
)
