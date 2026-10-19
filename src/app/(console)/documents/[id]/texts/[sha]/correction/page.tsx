import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

import { CorrectionView } from "@/components/correction-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { correction } from "@/lib/api/curation";
import { documentHref } from "@/lib/routes";

export const metadata: Metadata = { title: "Text Correction" };

export default function CorrectionPage({ params }: PageProps<"/documents/[id]/texts/[sha]/correction">) {
  return (
    <div className="grid gap-6">
      <PageHead title="Text Correction" />
      <Suspense fallback={<ListSkeleton />}>
        <Changes params={params} />
      </Suspense>
    </div>
  );
}

async function Changes({ params }: Pick<PageProps<"/documents/[id]/texts/[sha]/correction">, "params">) {
  const { id, sha } = await params;
  const diff = await correction(decodeURIComponent(id), sha);
  return (
    <div className="grid gap-4">
      <p className="text-sm">
        <Link href={documentHref(diff.correction.document_id, "content")} className="text-accent underline-offset-4 hover:underline">
          {diff.correction.citation}
        </Link>
      </p>
      <CorrectionView diff={diff} />
    </div>
  );
}
