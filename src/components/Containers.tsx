/* eslint-disable import/prefer-default-export */

type Props = {
  className?: string
  children?: React.ReactNode
}

export const FullWidthContainer: React.FC<Props> = ({
  children,
  className,
}) => (
  <div className={`w-full max-w-[90rem] ${className || ""}`}>{children}</div>
)
