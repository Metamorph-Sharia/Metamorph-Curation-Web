import type { Metadata } from "next";

import { AddDocumentForm } from "@/components/add-document/add-document-form";
import { PageHead } from "@/components/page-head";

export const metadata: Metadata = { title: "Add Document" };

export default function AddDocumentPage() {
  return (
    <div className="grid gap-8">
      <PageHead title="Add Document">
        A document no connector holds. It loads like any connector’s, under its canonical ID, and is published once it
        passes the publish gate.
      </PageHead>
      <AddDocumentForm />
    </div>
  );
}
