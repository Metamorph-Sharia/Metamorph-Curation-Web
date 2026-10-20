import { signOut } from "@/app/(console)/actions";
import { currentCurator } from "@/lib/api/curation";

import { button } from "./styles";

// Who is signed in, checked with the API on every request: an expired session goes back to sign-in.
export async function CuratorMenu() {
  const curator = await currentCurator();
  return (
    <div className="flex items-center gap-3 text-sm">
      <p className="hidden text-muted sm:block">
        Signed in as <strong className="font-medium text-text">{curator.display_name}</strong>
      </p>
      <form action={signOut}>
        <button type="submit" className={button("quiet")}>
          Sign Out
        </button>
      </form>
    </div>
  );
}
