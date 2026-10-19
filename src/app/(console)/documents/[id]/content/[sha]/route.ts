import { redirect } from "next/navigation";

import { contentLink } from "@/lib/api/curation";

// Opening a file or text: a short-lived link straight to the object store (ADR-5), so the bytes never pass
// through this app.
export async function GET(_: Request, { params }: RouteContext<"/documents/[id]/content/[sha]">) {
  const { id, sha } = await params;
  redirect(await contentLink(decodeURIComponent(id), sha));
}
