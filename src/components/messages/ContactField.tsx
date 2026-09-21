import type { ChangeEvent, HTMLInputTypeAttribute } from "react"

type Props = {
  id: string
  name: string
  label: string
  value: string
  error?: string
  placeholder?: string
  type?: HTMLInputTypeAttribute
  inputMode?: "text" | "tel"
  maxLength?: number
  multiline?: boolean
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const CONTROL_CLASS =
  "w-full rounded-sm py-1 px-2 text-sm placeholder:text-xs border outline-none focus:border-blue-500 aria-invalid:border-red-500"

export default function ContactField({
  id,
  name,
  label,
  value,
  error,
  placeholder,
  type = "text",
  inputMode,
  maxLength,
  multiline = false,
  onChange,
}: Props) {
  const errorId = `${id}-error`
  const controlProps = {
    id,
    name,
    value,
    placeholder,
    maxLength,
    onChange,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
  }

  return (
    <div className="space-y-3">
      <label htmlFor={id} className="block font-medium text-xs text-slate-600">
        {label}
      </label>
      {multiline ? (
        <textarea {...controlProps} className={`min-h-30 ${CONTROL_CLASS}`} />
      ) : (
        <input
          {...controlProps}
          type={type}
          inputMode={inputMode}
          className={CONTROL_CLASS}
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
