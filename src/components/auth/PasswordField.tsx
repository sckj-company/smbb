"use client"

import { Eye, EyeClosed } from "lucide-react"

type Props = {
  value: string
  onChange: (value: string) => void
  showPassword: boolean
  onToggle: () => void
}

export function PasswordField({
  value,
  onChange,
  showPassword,
  onToggle,
}: Props) {
  return (
    <div className="login-form-password-wrapper">
      <input
        type={showPassword ? "text" : "password"}
        name="password"
        id="password"
        placeholder="p@ssw0rd"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

      {value.length > 0 && (
        <button
          type="button"
          className="login-form-password-toggle"
          onClick={onToggle}
        >
          {showPassword ? <EyeClosed size={15} /> : <Eye size={15} />}
        </button>
      )}
    </div>
  )
}