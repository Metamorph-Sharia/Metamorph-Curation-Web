import type { Metadata } from "next";
import { Suspense } from "react";

import { CARD } from "@/components/styles";
import { Wordmark } from "@/components/wordmark";

import { SignInForm } from "./sign-in-form";

export const metadata: Metadata = { title: "Sign In" };

export default function SignInPage() {
  return (
    <main id="main" className="mx-auto grid min-h-[100dvh] w-full max-w-md content-center gap-8 px-4 py-12">
      <p className="text-center text-3xl">
        <Wordmark />
      </p>
      <div className={`${CARD} grid gap-6 p-6 sm:p-8`}>
        <div className="grid gap-1">
          <h1 className="font-heading text-3xl leading-tight tracking-tight text-balance">Sign In</h1>
          <p className="text-sm text-muted">With your curation team account.</p>
        </div>
        {/* The form reads the page's query (where to go next), so it renders at request time. */}
        <Suspense fallback={<div className="h-64 animate-pulse rounded-ui bg-sunken motion-reduce:animate-none" />}>
          <SignInForm />
        </Suspense>
      </div>
    </main>
  );
}
