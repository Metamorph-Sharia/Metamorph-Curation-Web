"use client";

import { decideReview } from "@/app/(console)/actions";

import { ActionForm } from "./action-form";
import { button, CONTROL } from "./styles";

// Resolve or dismiss a review item, with a note the next reviewer reads; then back to `back`.
export function DecideReview({ itemId, back }: { itemId: number; back: string }) {
  const id = `note-${itemId}`;
  return (
    <ActionForm
      action={decideReview.bind(null, itemId, back)}
      submit="Mark Resolved"
      busy="Saving…"
      name="state"
      value="resolved"
      className="grid gap-3 sm:w-80"
      extraButtons={
        <button
          type="submit"
          name="state"
          value="dismissed"
          className={button("quiet")}
        >
          Dismiss
        </button>
      }
    >
      <div className="grid gap-1.5">
        <label htmlFor={id} className="text-sm font-medium">
          Note
        </label>
        <input
          id={id}
          name="note"
          required
          autoComplete="off"
          placeholder="What you checked, and what you found…"
          className={CONTROL}
        />
      </div>
    </ActionForm>
  );
}
