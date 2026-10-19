// What a curation action answers its form with when it can't apply: the reason, and per-field messages when the
// API gave them. On success an action redirects instead, so there is nothing to answer.
export type ActionState = { error?: string; fields?: Record<string, string> };

export const NOTHING_YET: ActionState = {};
