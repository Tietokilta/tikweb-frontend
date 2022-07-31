import classNames from "classnames"

type Props = {
  className?: string
}

export const FullWidthContainer: React.FC<Props> = ({
  children,
  className,
}) => <div className={classNames("w-full", className)}>{children}</div>
