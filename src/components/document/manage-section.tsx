import { assignId, restore, suppress } from "@/app/(console)/documents/[id]/actions";
import type { DocumentView } from "@/lib/api/types";

import { ActionForm } from "../action-form";
import { ReasonField, TextField } from "../fields";
import { Section } from "../section";

const PANEL = "grid content-start gap-4 rounded-ui border border-line bg-surface p-5";

export function ManageSection({ view }: { view: DocumentView }) {
  const id = view.summary.id;
  return (
    <Section id="manage" title="Manage">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={PANEL}>
          <div className="grid gap-1">
            <h3 className="font-medium">Assign an ID</h3>
            <p className="text-sm text-muted">Renames the document everywhere. Later loads of its source records keep the new ID.</p>
          </div>
          <ActionForm action={assignId.bind(null, id)} submit="Assign ID" busy="Assigning…">
            <TextField id="new-id" name="new_id" label="New ID" placeholder="ojk:pojk:2019:10…" code />
            <ReasonField id="assign-reason" placeholder="What identifies it, e.g. the text’s header…" />
          </ActionForm>
        </div>

        {view.suppression ? (
          <div className={PANEL}>
            <div className="grid gap-1">
              <h3 className="font-medium">Restore</h3>
              <p className="text-sm text-muted">Publishes the document again, so the assistant can cite it.</p>
            </div>
            <ActionForm action={restore.bind(null, id)} submit="Restore Document" busy="Restoring…">
              <ReasonField id="restore-reason" placeholder="Why it should be cited again…" />
            </ActionForm>
          </div>
        ) : (
          <div className={PANEL}>
            <div className="grid gap-1">
              <h3 className="font-medium">Suppress</h3>
              <p className="text-sm text-muted">
                Removes the document from what the assistant can cite. The registry keeps it, and you can restore it.
              </p>
            </div>
            <ActionForm action={suppress.bind(null, id)} submit="Suppress Document" busy="Suppressing…" tone="danger">
              <ReasonField id="suppress-reason" placeholder="e.g. duplicate of ojk:pojk:2019:10…" />
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" name="confirm" value="yes" required className="mt-0.5 size-4 accent-[var(--critical)]" />
                <span>Yes, stop the assistant citing this document.</span>
              </label>
            </ActionForm>
          </div>
        )}
      </div>
    </Section>
  );
}
