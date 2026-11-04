import type { Metadata } from "next";
import { connection } from "next/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { ListSkeleton, PageHead } from "@/components/page-head";
import { RetrievalAnswer, RetrievalErrorNotice, RetrievalView } from "@/components/retrieval-view";
import { param } from "@/lib/query";
import { readAnswer } from "@/lib/retrieval/answer";
import { callTool, RetrievalError } from "@/lib/retrieval/client";
import { DEFAULT_TOOL, toolNamed } from "@/lib/retrieval/tools";
import { sessionToken } from "@/lib/session";

export const metadata: Metadata = { title: "Retrieval" };

// What the retrieval gateway answers, before any model writes a sentence: semantic search across the regulation
// and market providers, and each exact tool they offer, with the rank, score and provenance behind every answer.
export default function RetrievalPage({ searchParams }: PageProps<"/retrieval">) {
  return (
    <div className="grid gap-10">
      <PageHead title="Retrieval">
        What the gateway answers, with the numbers behind it: how each hit ranked, what its score was, whether
        meaning or wording matched it, and which provider and index said so.
      </PageHead>
      <Suspense fallback={<ListSkeleton />}>
        <Retrieval searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Retrieval({ searchParams }: { searchParams: PageProps<"/retrieval">["searchParams"] }) {
  await connection(); // an answer is asked for at request time: never prerendered or prefetched ahead
  const token = await sessionToken();
  if (!token) {
    redirect("/sign-in");
  }
  const query = await searchParams;
  const tool = toolNamed(param(query, "tool")) ?? toolNamed(DEFAULT_TOOL)!;
  const value = (param(query, "value") ?? "").trim();
  return (
    <div className="grid gap-8">
      <RetrievalView tool={tool} value={value} />
      {value ? <Answer tool={tool} value={value} /> : null}
    </div>
  );
}

async function Answer({ tool, value }: { tool: NonNullable<ReturnType<typeof toolNamed>>; value: string }) {
  let called;
  try {
    called = await callTool(tool.name, tool.argument ? { [tool.argument.name]: value } : {});
  } catch (error) {
    if (error instanceof RetrievalError) {
      return <RetrievalErrorNotice message={error.message} />;
    }
    throw error;
  }
  return <RetrievalAnswer tool={tool} answer={readAnswer(called.answer)} milliseconds={called.milliseconds} />;
}
