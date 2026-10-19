import { linkCitation, resolveConflict } from "@/app/(console)/documents/[id]/actions";
import type { DocumentView } from "@/lib/api/types";
import { formatDay, formatValue } from "@/lib/format";
import { fieldLabel, reviewQueueLabel, sentence } from "@/lib/labels";
import { documentHref } from "@/lib/routes";

import { ActionForm, button } from "../action-form";
import { DecideReview } from "../decide-review";
import { ReasonField, TextField } from "../fields";
import { Section } from "../section";

const ITEM = "grid gap-4 p-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)]";
const LIST = "divide-y divide-line rounded-ui border border-line bg-surface";

export function CitationsSection({ view }: { view: DocumentView }) {
  const id = view.summary.id;
  return (
    <Section id="citations" title="Open Citations">
      <p className="max-w-[75ch] text-sm text-muted">
        Citations not linked to a document yet. Most wait for their target to be loaded; link one by hand when the
        registry holds it under a name the platform can’t match.
      </p>
      {view.open_citations.length ? (
        <ul className={LIST}>
          {view.open_citations.map((citation) => (
            <li key={citation.id} className={ITEM}>
              <div className="grid content-start gap-1 text-sm">
                <p>
                  <strong className="font-medium">{sentence(citation.relation)}</strong>
                  {citation.from_address ? <span className="text-muted"> from {citation.from_address}</span> : null}
                </p>
                <p className="break-words">“{citation.target_text}”</p>
                <p className="text-xs text-muted">
                  {citation.target_id ? (
                    <>
                      Names <span className="font-mono" translate="no">{citation.target_id}</span>, which isn’t held yet
                    </>
                  ) : (
                    "Names no document"
                  )}
                </p>
              </div>
              <ActionForm action={linkCitation.bind(null, id, citation.id)} submit="Link Citation" busy="Linking…" className="grid gap-3">
                <TextField
                  id={`target-${citation.id}`}
                  name="target_id"
                  label="Document ID"
                  placeholder="id:uu:2011:21…"
                  defaultValue={citation.target_id ?? ""}
                  code
                />
                <ReasonField id={`link-reason-${citation.id}`} placeholder="How you know it’s this one…" />
              </ActionForm>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">Every citation of this document is linked.</p>
      )}
    </Section>
  );
}

export function ConflictsSection({ view }: { view: DocumentView }) {
  const id = view.summary.id;
  return (
    <Section id="conflicts" title="Conflicts">
      {view.conflicts.length ? (
        <ul className={LIST}>
          {view.conflicts.map((conflict) => (
            <li key={conflict.id} className={ITEM}>
              <div className="grid content-start gap-1 text-sm">
                <p className="font-medium">{fieldLabel(conflict.field)}</p>
                <p>Your correction: “{formatValue(conflict.correction)}”</p>
                <p>The source now says: “{formatValue(conflict.source_value)}”</p>
                <p className="text-xs text-muted">Detected {formatDay(conflict.detected_at)}</p>
              </div>
              <ActionForm
                action={resolveConflict.bind(null, id, conflict.id)}
                submit="Keep Correction"
                busy="Saving…"
                name="decision"
                value="keep"
                className="grid gap-3"
                extraButtons={
                  <button type="submit" name="decision" value="accept" className={button("quiet")}>
                    Accept Source Value
                  </button>
                }
              >
                <ReasonField id={`conflict-${conflict.id}`} placeholder="Which value is right, and why…" />
              </ActionForm>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">No source disagrees with a correction of this document.</p>
      )}
    </Section>
  );
}

export function ReviewItemsSection({ view }: { view: DocumentView }) {
  return (
    <Section id="review" title="Open Review Items">
      {view.open_reviews.length ? (
        <ul className={LIST}>
          {view.open_reviews.map((item) => (
            <li key={item.id} className={ITEM}>
              <div className="grid content-start gap-1 text-sm">
                <p className="font-medium">{reviewQueueLabel(item.kind)}</p>
                <p>{item.summary}</p>
                <p className="text-xs text-muted">Waiting since {formatDay(item.created_at)}</p>
              </div>
              <DecideReview itemId={item.id} back={`${documentHref(view.summary.id)}#review`} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-muted">Nothing about this document waits for review.</p>
      )}
    </Section>
  );
}
