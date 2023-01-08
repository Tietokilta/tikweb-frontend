import classNames from "classnames"
import {
  ButtonHTMLAttributes,
  FC,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  MouseEvent,
  ReactNode,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
  useCallback,
  useEffect,
  useId,
  useState,
} from "react"
import Spinner from "./Spinner"

// Not helpful here...
/* eslint-disable react/jsx-props-no-spreading */

const intentColors = {
  primary: "bg-orange text-white",
  danger: "bg-red text-white",
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean
  intent?: keyof typeof intentColors
}

export const Button: FC<ButtonProps> = ({
  children,
  className,
  loading,
  disabled,
  type = "button",
  intent,
  ...props
}) => (
  <button
    // eslint-disable-next-line react/button-has-type
    type={type}
    disabled={disabled || loading}
    className={classNames(
      "text-white p-2 font-sans relative rounded",
      (loading || disabled) && "bg-gray-light text-white",
      !(loading || disabled) && intentColors[intent ?? "primary"],
      className
    )}
    {...props}
  >
    {!loading && children}
    {loading && (
      <>
        <div className="invisible">{children}</div>
        <Spinner className="absolute inset-0 flex justify-center items-center" />
      </>
    )}
  </button>
)

type ConfirmButtonProps = ButtonProps & {
  /** The interval within which the button must be repressed. */
  confirmDelay?: number
  /** The button contents shown when waiting for a confirmation press. */
  confirmLabel?: ReactNode
}

/** Button that requires pressing twice within a given interval. */
export const ConfirmButton: FC<ConfirmButtonProps> = ({
  confirmDelay,
  confirmLabel,
  onClick,
  children,
  ...props
}) => {
  const [confirming, setConfirming] = useState(false)

  // When confirming is set, clear it after the delay.
  useEffect(() => {
    if (confirming) {
      const timer = setTimeout(() => setConfirming(false), confirmDelay)
      return () => clearTimeout(timer)
    }
    return () => {}
  }, [confirming, confirmDelay])

  const handler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      if (confirming || !confirmDelay) {
        setConfirming(false)
        onClick?.(e)
      } else {
        e.preventDefault()
        setConfirming(true)
      }
    },
    [confirming, confirmDelay, onClick]
  )

  return (
    <Button onClick={handler} {...props}>
      {confirming ? confirmLabel ?? children : children}
    </Button>
  )
}

export const TextInput: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className,
  ...props
}) => (
  <input
    className={classNames(
      "w-full p-2 bg-white rounded border border-gray-light",
      className
    )}
    {...props}
  />
)

export const Select: FC<SelectHTMLAttributes<HTMLSelectElement>> = ({
  className,
  ...props
}) => (
  <select
    className={classNames(
      "w-full p-2 bg-white rounded border border-gray-light",
      className
    )}
    {...props}
  />
)

export const Textarea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({
  className,
  ...props
}) => (
  <textarea
    className={classNames(
      "w-full p-2 bg-white rounded border border-gray-light resize-y",
      className
    )}
    {...props}
  />
)

type CheckBoxProps = InputHTMLAttributes<HTMLInputElement> & {
  type: "radio" | "checkbox"
  label?: ReactNode
  labelProps?: LabelHTMLAttributes<HTMLLabelElement>
}

export const CheckBox: FC<CheckBoxProps> = ({
  className,
  id,
  label,
  labelProps: { className: labelClass, ...labelProps } = {},
  ...props
}) => {
  const defaultId = useId()
  return (
    <label
      htmlFor={id ?? defaultId}
      className={classNames("flex items-start gap-2", labelClass)}
      {...labelProps}
    >
      <input
        id={id ?? defaultId}
        className={classNames("relative top-1", className)}
        {...props}
      />
      {label}
    </label>
  )
}
