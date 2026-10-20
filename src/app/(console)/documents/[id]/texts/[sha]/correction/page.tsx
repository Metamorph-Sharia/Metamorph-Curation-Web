import type { Metadata } from "next";
import { Suspense } from "react";

import { CorrectionView } from "@/components/correction-view";
import { ListSkeleton, PageHead } from "@/components/page-head";
import { correction } from "@/lib/api/curation";
import { documentHref } from "@/lib/routes";

export const metadata: Metadata = { title: "Text Correction" };

const TITLE = "Text Correction";
const DOCUMENTS: [string, string] = ["/documents", "Documents"];

// The frame prerenders with the title; the document's citation joins the trail when the changes arrive.
export default function CorrectionPage({ params }: PageProps<"/documents/[id]/texts/[sha]/correction">) {
  return (
    <Suspense
      fallback={
        <div className="grid gap-8">
          <PageHead title={TITLE} trail={[DOCUMENTS]} />
          <ListSkeleton />
        </div>
      }
    >
      <Changes params={params} />
    </Suspense>
  );
}

async function Changes({ params }: Pick<PageProps<"/documents/[id]/texts/[sha]/correction">, "params">) {
  const { id, sha } = await params;
  const diff = await correction(decodeURIComponent(id), sha);
  return (
    <div className="grid gap-8">
      <PageHead title={TITLE} trail={[DOCUMENTS, [documentHref(diff.correction.document_id, "content"), diff.correction.citation]]} />
      <CorrectionView diff={diff} />
    </div>
  );
}
