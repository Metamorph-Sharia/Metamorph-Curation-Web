"use client";

import { type FormEvent, type ReactNode, startTransition, useActionState, useEffect, useId, useState } from "react";

import { type ActionState, NOTHING_YET } from "@/lib/action-state";

import { button } from "./styles";
import { markSaved, markUnsaved } from "./unsaved";

type Action = (state: ActionState, form: FormData) => Promise<ActionState>;

// A curation action's form: its fields, a submit button that says what it does (and that it is working), and,
// when the action can't apply, why, beside the form. Success redirects with a notice, so there is no success state.
// It submits through a transition itself: React resets a form after its action, and a refused form must keep what
// the curator typed. (`action` stays on the form, so it still submits before the page's script has loaded.)
export function ActionForm({
  action,
  submit,
  busy,
  children,
  tone = "primary",
  extraButtons,
  className = "grid gap-4",
  name,
  value,
}: {
  action: Action;
  submit: string;
  busy: string;
  children?: ReactNode;
  tone?: "primary" | "quiet" | "danger";
  extraButtons?: ReactNode;
  className?: string;
  name?: string; // the submit button's name and value, for forms whose buttons are the choice
  value?: string;
}) {
  const [state, formAction, pending] = useActionState(action, NOTHING_YET);
  const errorId = useId();
  const [self] = useState(() => Symbol("form")); // this form, to the unsaved-entries warning
  useEffect(() => () => markSaved(self), [self]);
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    markSaved(self);
    const form = new FormData(event.currentTarget, (event.nativeEvent as SubmitEvent).submitter);
    startTransition(() => formAction(form));
  };
  return (
    <form
      action={formAction}
      onSubmit={send}
      onInput={() => markUnsaved(self)}
      className={className}
      aria-describedby={state.error ? errorId : undefined}
    >
      {children}
      {state.error ? (
        <p id={errorId} role="alert" className="text-sm text-critical">
          {state.error}
        </p>
      ) : null}
      <div className="flex flex-wrap gap-2">
        <button type="submit" name={name} value={value} disabled={pending} className={button(tone)}>
          {pending ? busy : submit}
        </button>
        {extraButtons}
      </div>
    </form>
  );
}
