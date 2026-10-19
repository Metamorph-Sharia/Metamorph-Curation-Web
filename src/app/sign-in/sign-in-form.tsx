"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";

import { signIn, type SignInState } from "./actions";

const INITIAL: SignInState = { username: "" };

export function SignInForm() {
  const params = useSearchParams();
  const [state, action, pending] = useActionState(signIn, INITIAL);
  const expired = params.get("expired") === "1" && !state.error;

  return (
    <form action={action} className="grid gap-5">
      {expired ? (
        <p role="status" className="rounded-ui bg-warning-soft px-3 py-2 text-sm text-warning">
          Your session ended. Sign in again to carry on.
        </p>
      ) : null}
      <input type="hidden" name="next" value={params.get("next") ?? "/"} />
      <div className="grid gap-2">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          autoComplete="username"
          spellCheck={false}
          autoCapitalize="none"
          required
          defaultValue={state.username}
          aria-describedby={state.error ? "sign-in-error" : undefined}
          className="rounded-ui border border-line-strong bg-surface px-3 py-2 text-base"
        />
      </div>
      <div className="grid gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-describedby={state.error ? "sign-in-error" : undefined}
          className="rounded-ui border border-line-strong bg-surface px-3 py-2 text-base"
        />
      </div>
      {state.error ? (
        <p id="sign-in-error" role="alert" className="text-sm text-critical">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-ui bg-accent px-4 py-2.5 font-medium text-on-accent transition-colors hover:bg-accent-hover active:translate-y-px disabled:opacity-70"
      >
        {pending ? "Signing In…" : "Sign In"}
      </button>
    </form>
  );
}
