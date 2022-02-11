/* eslint-disable import/prefer-default-export */

type Props = {
  className?: string
}

export const FullWidthContainer: React.FC<Props> = ({
  children,
  className,
}) => (
  <div className={`w-full ${className || ""}`}>{children}</div>
)
