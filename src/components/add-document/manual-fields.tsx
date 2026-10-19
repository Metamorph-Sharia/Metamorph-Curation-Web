import { sentence } from "@/lib/labels";

import { FieldError, SelectField, TextField } from "../fields";

// The contract's kinds and statuses, and the rights a manual document may have.
const KINDS = ["law", "regulation", "implementing_rule", "fatwa", "guideline", "circular", "explanatory"];
const STATUSES = ["in_force", "amended", "partly_revoked", "revoked", "not_yet_in_force", "unknown"];
const RIGHTS = ["public", "licensed"];
const options = (values: string[]): [string, string][] => values.map((value) => [value, sentence(value)]);

// A document no connector holds: what the platform needs to load it, each refusal shown beside its field.
export function ManualFields({ errors }: { errors: Record<string, string> }) {
  return (
    <div className="grid gap-5">
      <div className="grid gap-4 md:grid-cols-2">
        <TextField
          id="document_id"
          name="document_id"
          label="Canonical ID"
          placeholder="dsnmui:fatwa:170…"
          help="issuer:family:year:number, e.g. ojk:pojk:2019:10. Fatwas leave the year out."
          code
          error={errors.document_id}
        />
        <TextField id="citation" name="citation" label="Citation" placeholder="Fatwa DSN-MUI No. 170/DSN-MUI/X/2026…" error={errors.citation} />
      </div>
      <TextField id="title" name="title" label="Title" placeholder="Pembiayaan Rumah Syariah…" error={errors.title} />
      <div className="grid gap-4 md:grid-cols-3">
        <SelectField id="kind" name="kind" label="Kind" options={options(KINDS)} defaultValue="regulation" error={errors.kind} />
        <SelectField id="status" name="status" label="Status" options={options(STATUSES)} defaultValue="in_force" error={errors.status} />
        <TextField id="language" name="language" label="Language" defaultValue="id" code error={errors.language} />
      </div>
      <TextField
        id="source_url"
        name="source_url"
        type="url"
        label="Source URL"
        placeholder="https://dsnmui.or.id/…"
        help="Where you got the document."
        code
        error={errors.source_url}
      />
      <fieldset className="grid gap-3">
        <legend className="text-sm font-medium">Dates</legend>
        <p className="text-xs text-muted">Leave a date empty when the document doesn’t state it.</p>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["enacted_on", "Enacted"],
            ["promulgated_on", "Promulgated"],
            ["effective_on", "Effective"],
          ].map(([name, label]) => (
            <TextField key={name} id={name} name={name} label={label} placeholder="YYYY-MM-DD…" required={false} code error={errors[name]} />
          ))}
        </div>
      </fieldset>
      <SelectField id="rights" name="rights" label="Rights" options={options(RIGHTS)} defaultValue="public" error={errors.rights} />
      <div className="grid gap-1.5">
        <label htmlFor="file" className="text-sm font-medium">
          File
        </label>
        <input
          id="file"
          name="file"
          type="file"
          required
          aria-invalid={errors.file ? true : undefined}
          aria-describedby={errors.file ? "file-error" : "file-help"}
          className="text-sm file:mr-3 file:rounded-ui file:border file:border-line-strong file:bg-surface file:px-3 file:py-1.5 file:text-sm"
        />
        <p id="file-help" className="text-xs text-muted">
          Usually the official PDF, up to 100&nbsp;MB. It goes straight to the object store.
        </p>
        <FieldError id="file" error={errors.file} />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="text" className="text-sm font-medium">
          Text
        </label>
        <textarea
          id="text"
          name="text"
          rows={8}
          spellCheck={false}
          placeholder="Paste the document’s text if you have it; it is parsed at once…"
          className="w-full rounded-ui border border-line-strong bg-surface px-3 py-2 font-mono text-sm placeholder:text-muted"
        />
        <FieldError id="text" error={errors.text} />
      </div>
      <TextField
        id="reason"
        name="reason"
        label="Reason"
        placeholder="Where it came from, and why it is added…"
        help="The next reviewer reads this in the audit log."
        error={errors.reason}
      />
    </div>
  );
}
