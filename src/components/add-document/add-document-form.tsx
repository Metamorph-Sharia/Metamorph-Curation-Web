"use client";

import { type FormEvent, startTransition, useActionState, useEffect, useRef, useState } from "react";

import { addDocument, requestUpload } from "@/app/(console)/documents/new/actions";
import { NOTHING_YET } from "@/lib/action-state";

import { button } from "../action-form";
import { markSaved, markUnsaved } from "../unsaved";
import { ManualFields } from "./manual-fields";

const MAX_BYTES = 100 * 1024 * 1024; // the API's limit: UU 4/2023, the largest file held, is 82 MB

// Adding a document in three steps: a short-lived upload link from the API, the file straight from this browser
// into the object store, then the fields with the upload's key. A refusal comes back beside its field; what was
// typed stays.
export function AddDocumentForm() {
  const [state, add, adding] = useActionState(addDocument, NOTHING_YET);
  const [upload, setUpload] = useState<{ busy: boolean; error?: string }>({ busy: false });
  const errors = { ...state.fields, ...(upload.error ? { file: upload.error } : {}) };
  const busy = upload.busy || adding;
  const formRef = useRef<HTMLFormElement>(null);
  const [self] = useState(() => Symbol("add-document"));
  useEffect(() => () => markSaved(self), [self]);
  // A refusal moves the curator to the first field it marked.
  useEffect(() => {
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [state, upload.error]);

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    markSaved(self);
    const form = new FormData(event.currentTarget);
    const file = form.get("file");
    form.delete("file");
    if (!(file instanceof File) || !file.size) {
      startTransition(() => add(form)); // the API says what is missing, file included
      return;
    }
    if (file.size > MAX_BYTES) {
      setUpload({ busy: false, error: "the file is over 100 MB; ask an engineer to load it" });
      return;
    }
    const mediaType = file.type || "application/octet-stream";
    setUpload({ busy: true });
    startTransition(async () => {
      const link = await requestUpload(file.name, mediaType);
      if ("error" in link) {
        setUpload({ busy: false, error: link.error });
        return;
      }
      const stored = await fetch(link.url, { method: "PUT", body: file, headers: { "Content-Type": mediaType } }).catch(() => null);
      if (!stored?.ok) {
        setUpload({ busy: false, error: "the file couldn’t be uploaded; try again, and tell an engineer if it keeps failing" });
        return;
      }
      setUpload({ busy: false });
      form.set("upload_key", link.upload_key);
      form.set("file_name", file.name);
      form.set("media_type", mediaType);
      add(form);
    });
  };

  return (
    <form
      ref={formRef}
      onSubmit={send}
      onInput={() => markUnsaved(self)}
      className="grid max-w-3xl gap-6"
      aria-describedby={state.error ? "add-error" : undefined}
    >
      <ManualFields errors={errors} />
      {state.error && !state.fields ? (
        <p id="add-error" role="alert" className="text-sm text-critical">
          {state.error}
        </p>
      ) : null}
      {Object.keys(errors).length ? (
        <p role="alert" className="text-sm text-critical">
          Check the fields marked above.
        </p>
      ) : null}
      <div>
        <button type="submit" disabled={busy} className={button("primary")}>
          {upload.busy ? "Uploading…" : adding ? "Adding…" : "Add Document"}
        </button>
      </div>
    </form>
  );
}
