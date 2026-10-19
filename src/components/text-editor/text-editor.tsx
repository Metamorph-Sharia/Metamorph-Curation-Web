"use client";

import { EditorView, basicSetup } from "codemirror";
import { useEffect, useRef } from "react";

import { protectPageMarkers } from "./protect-markers";

const LOOK = EditorView.theme({
  "&": { backgroundColor: "var(--surface)", color: "var(--text)", fontSize: "0.875rem", maxHeight: "70vh" },
  ".cm-scroller": { fontFamily: "var(--font-mono)", overflow: "auto" },
  ".cm-gutters": { backgroundColor: "var(--sunken)", color: "var(--muted)", borderRight: "1px solid var(--border)" },
  ".cm-activeLine, .cm-activeLineGutter": { backgroundColor: "var(--accent-soft)" },
  "&.cm-focused": { outline: "2px solid var(--accent)", outlineOffset: "2px" },
  ".cm-cursor": { borderLeftColor: "var(--text)" },
});

// The text to correct, in CodeMirror: fast on a megabyte of wording, with a paged text's page markers kept as
// they are. The form gets the wording once, when it is submitted (its `formdata` event), not on every keystroke.
// Leaving with unsaved edits asks first.
export default function TextEditor({
  initial,
  paged,
  name,
  labelledBy,
}: {
  initial: string;
  paged: boolean;
  name: string;
  labelledBy: string;
}) {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const parent = host.current!;
    let edited = false;
    const view = new EditorView({
      parent,
      doc: initial,
      extensions: [
        basicSetup,
        EditorView.lineWrapping,
        LOOK,
        paged ? protectPageMarkers() : [],
        EditorView.contentAttributes.of({ "aria-labelledby": labelledBy, "aria-multiline": "true" }),
        EditorView.updateListener.of((update) => {
          edited ||= update.docChanged;
        }),
      ],
    });
    const form = parent.closest("form");
    const submit = (event: FormDataEvent) => {
      event.formData.set(name, view.state.doc.toString());
      edited = false;
    };
    const leaving = (event: BeforeUnloadEvent) => {
      if (edited) {
        event.preventDefault();
      }
    };
    form?.addEventListener("formdata", submit);
    window.addEventListener("beforeunload", leaving);
    return () => {
      form?.removeEventListener("formdata", submit);
      window.removeEventListener("beforeunload", leaving);
      view.destroy();
    };
  }, [initial, paged, name, labelledBy]);

  return <div ref={host} className="overflow-hidden rounded-ui border border-line-strong" />;
}
