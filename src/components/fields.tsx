import { asSentence } from "@/lib/labels";
import type { ReactNode } from "react";

const CONTROL =
  "w-full rounded-ui border border-line-strong bg-surface px-3 py-2 text-sm text-text placeholder:text-muted";

// A labelled input: label above, help below, never a placeholder as the label.
export function TextField({
  id,
  name,
  label,
  placeholder,
  help,
  defaultValue,
  required = true,
  code = false,
  type = "text",
  error,
}: {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  help?: ReactNode;
  defaultValue?: string;
  required?: boolean;
  code?: boolean; // an ID or a date: no spellcheck, no capitals, monospaced
  type?: "text" | "url";
  error?: string; // what the API said about this field: shown beneath it, and tied to it for screen readers
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={code ? false : undefined}
        autoCapitalize={code ? "none" : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${CONTROL} ${code ? "font-mono" : ""}`}
      />
      {help ? <p className="text-xs text-muted">{help}</p> : null}
      <FieldError id={id} error={error} />
    </div>
  );
}

export function FieldError({ id, error }: { id: string; error?: string }) {
  return error ? (
    <p id={`${id}-error`} className="text-xs text-critical">
      {asSentence(error)}
    </p>
  ) : null;
}

// Every action's reason: the next reviewer reads it in the audit log.
export function ReasonField({ id, placeholder }: { id: string; placeholder: string }) {
  return <TextField id={id} name="reason" label="Reason" placeholder={placeholder} />;
}

export function SelectField({
  id,
  name,
  label,
  options,
  defaultValue,
  error,
}: {
  id: string;
  name: string;
  label: string;
  options: [value: string, label: string][];
  defaultValue?: string;
  error?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        name={name}
        defaultValue={defaultValue}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`${CONTROL} bg-surface`}
      >
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
      <FieldError id={id} error={error} />
    </div>
  );
}
