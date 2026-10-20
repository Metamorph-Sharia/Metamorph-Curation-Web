import { correctField, withdrawCorrection } from "@/app/(console)/documents/[id]/actions";
import type { DocumentView } from "@/lib/api/types";
import { formatDay, formatValue } from "@/lib/format";
import { FIELD_LABELS, fieldLabel } from "@/lib/labels";

import { ActionForm } from "../action-form";
import { ReasonField, SelectField, TextField } from "../fields";
import { Section } from "../section";
import { CARD } from "../styles";
import { TABLE, TABLE_FRAME, TABLE_HEAD } from "../table";

export function FieldsSection({ view }: { view: DocumentView }) {
  const id = view.summary.id;
  return (
    <Section id="fields" title="Fields">
      <p className="max-w-[75ch] text-sm text-muted text-pretty">
        “Published” is what the assistant sees: the sources’ value, or a curator’s correction.
      </p>
      <div className={TABLE_FRAME}>
        <table className={`${TABLE} [&_td]:align-top [&_th]:align-top`}>
          <thead className={TABLE_HEAD}>
            <tr>
              <th scope="col">Field</th>
              <th scope="col">Published</th>
              {view.sources.map((source) => (
                <th key={`${source.connector}/${source.source_id}`} scope="col" translate="no">
                  {source.connector}
                </th>
              ))}
              <th scope="col">Correction</th>
            </tr>
          </thead>
          <tbody>
            {view.fields.map((row) => (
              <tr key={row.field}>
                <th scope="row" className="whitespace-nowrap text-left font-medium">
                  {fieldLabel(row.field)}
                </th>
                <td className="break-words">{formatValue(row.effective)}</td>
                {row.by_source.map(([connector, value]) => (
                  <td key={connector} className="break-words text-muted">
                    {formatValue(value)}
                  </td>
                ))}
                <td className="min-w-64">
                  {row.correction ? (
                    <div className="grid gap-2">
                      <span className="text-xs text-muted">
                        By {row.correction.author}, {formatDay(row.correction.created_at)}: {row.correction.reason}
                      </span>
                      <ActionForm
                        action={withdrawCorrection.bind(null, id, row.field)}
                        submit="Withdraw"
                        busy="Withdrawing…"
                        tone="quiet"
                        className="grid gap-2"
                      >
                        <ReasonField id={`withdraw-${row.field}`} placeholder="Why withdraw it…" />
                      </ActionForm>
                    </div>
                  ) : (
                    <span className="text-muted">None</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`${CARD} grid gap-5 p-5 sm:p-6`}>
        <h3 className="font-heading text-xl leading-tight">Correct a Field</h3>
        <ActionForm action={correctField.bind(null, id)} submit="Save Correction" busy="Saving…">
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
            <SelectField id="correct-field" name="field" label="Field" options={Object.entries(FIELD_LABELS)} />
            <TextField
              id="correct-value"
              name="value"
              label="Correct Value"
              placeholder="Dates as 2019-02-27; status as in_force, amended, revoked…"
            />
          </div>
          <ReasonField id="correct-reason" placeholder="Where you checked it, e.g. the Lembaran Negara…" />
        </ActionForm>
      </div>
    </Section>
  );
}
