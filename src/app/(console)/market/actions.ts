"use server";

import { redirect } from "next/navigation";

import type { ActionState } from "@/lib/action-state";
import { performFor, text } from "@/lib/api/changes";
import type { MarketChange } from "@/lib/api/types";
import { idList, parseIndustryKey } from "@/lib/market";

// Changes to the market layer's curated links. Each is one API action, which checks it, writes it with its audit
// row and publishes what it decides before answering. Then the sources page again, with what was done and what
// the change names that isn't published yet (kept, and said); or its form, with why it couldn't apply.

type Anchor = "registers" | "sources" | "industries" | "sectors";

async function changed(call: Parameters<typeof performFor>[0], done: string, anchor: Anchor): Promise<ActionState> {
  const outcome = await performFor<MarketChange>(call);
  if ("failure" in outcome) {
    return outcome.failure;
  }
  const query = new URLSearchParams({ done });
  for (const warning of outcome.data.warnings) {
    query.append("warning", warning);
  }
  redirect(`/market?${query}#${anchor}`);
}

function days(form: FormData): number {
  return Number(text(form, "fresh_days"));
}

export async function setRegisterLinks(registerId: string, _: ActionState, form: FormData): Promise<ActionState> {
  const body = {
    governed_by: idList(text(form, "governed_by")),
    reports: idList(text(form, "reports")),
    fresh_days: days(form),
    reason: text(form, "reason"),
  };
  return changed(
    (api) => api.PUT("/api/v1/market/registers/{register_id}/links", { params: { path: { register_id: registerId } }, body }),
    "register_links",
    "registers",
  );
}

export async function setSource(sourceId: string, _: ActionState, form: FormData): Promise<ActionState> {
  const body = {
    citation: text(form, "citation"),
    fresh_days: days(form),
    download_page: text(form, "download_page"),
    download_hint: text(form, "download_hint"),
    reason: text(form, "reason"),
  };
  return changed(
    (api) => api.PUT("/api/v1/market/sources/{source_id}", { params: { path: { source_id: sourceId } }, body }),
    "source_saved",
    "sources",
  );
}

// An industry's links: the register it belongs to (whose regulations it then shares), or regulations of its own.
// A new industry names itself in the form (`industry`: its source and name, as one value).
export async function setIndustry(known: { source: string; name: string } | null, _: ActionState, form: FormData): Promise<ActionState> {
  const industry = known ?? parseIndustryKey(text(form, "industry"));
  if (!industry) {
    return { error: "Choose the industry, as its source names it." };
  }
  const register = text(form, "register");
  const body = {
    register: register || null,
    governed_by: register ? [] : idList(text(form, "governed_by")),
    reports: idList(text(form, "reports")),
    reason: text(form, "reason"),
  };
  return changed(
    (api) =>
      api.PUT("/api/v1/market/sources/{source_id}/industries/{name}", {
        params: { path: { source_id: industry.source, name: industry.name } },
        body,
      }),
    "industry_saved",
    "industries",
  );
}

export async function withdrawIndustry(source: string, name: string, _: ActionState, form: FormData): Promise<ActionState> {
  return changed(
    (api) =>
      api.POST("/api/v1/market/sources/{source_id}/industries/{name}/withdraw", {
        params: { path: { source_id: source, name } },
        body: { reason: text(form, "reason") },
      }),
    "industry_withdrawn",
    "industries",
  );
}

// A sector: one curated industry across the sources' own names. A new one names its ID in the form.
export async function setSector(known: string | null, _: ActionState, form: FormData): Promise<ActionState> {
  const sectorId = known ?? text(form, "sector_id").trim();
  if (!sectorId) {
    return { error: "Give the sector an ID: lowercase words joined by hyphens, such as sharia-banking." };
  }
  const industries = form
    .getAll("industries")
    .map((key) => parseIndustryKey(String(key)))
    .filter((industry) => industry !== null);
  const body = { name: text(form, "name"), name_en: text(form, "name_en"), industries, reason: text(form, "reason") };
  return changed(
    (api) => api.PUT("/api/v1/market/sectors/{sector_id}", { params: { path: { sector_id: sectorId } }, body }),
    "sector_saved",
    "sectors",
  );
}

export async function withdrawSector(sectorId: string, _: ActionState, form: FormData): Promise<ActionState> {
  return changed(
    (api) =>
      api.POST("/api/v1/market/sectors/{sector_id}/withdraw", {
        params: { path: { sector_id: sectorId } },
        body: { reason: text(form, "reason") },
      }),
    "sector_withdrawn",
    "sectors",
  );
}
