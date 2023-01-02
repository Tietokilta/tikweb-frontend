import { FC, ReactNode } from "react"

type Props = {
  children: ReactNode
  id: string
  label?: string
  required?: boolean
  help?: ReactNode
}

const FieldRow: FC<Props> = ({ children, id, label, help, required }) => (
  <div className="flex flex-col sm:flex-row">
    <label htmlFor={id} className="py-2 sm:w-1/4 sm:p-2 font-semibold">
      {label}
      {required && <span className="text-red">*</span>}
    </label>
    <div className="sm:w-3/4 sm:p-2">
      {children}
      {help && <p className="text-sm text-gray-light mt-1.5">{help}</p>}
    </div>
  </div>
)

export default FieldRow
