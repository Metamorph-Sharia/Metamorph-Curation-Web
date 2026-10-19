import type { Metadata } from "next";
import { Suspense } from "react";

import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <main id="main" className="mx-auto grid min-h-[100dvh] w-full max-w-sm content-center gap-8 px-4 py-12">
      <div className="grid gap-2">
        <p className="font-semibold tracking-tight" translate="no">
          Metamorph Curation
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-balance">Sign In</h1>
        <p className="text-sm text-muted">With your curation team account.</p>
      </div>
      {/* The form reads the page's query (where to go next), so it renders at request time. */}
      <Suspense fallback={<div className="h-64 animate-pulse rounded-ui bg-sunken motion-reduce:animate-none" />}>
        <SignInForm />
      </Suspense>
    </main>
  );
}
