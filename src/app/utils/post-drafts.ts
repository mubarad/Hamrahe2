import { PostDraft } from "../types/post-types";

const DRAFTS_KEY = "hamrahe_post_drafts";
const RECOVERED_KEY = "hamrahe_recovered_draft";

export function getSavedDrafts(): PostDraft[] {
  try {
    const raw = localStorage.getItem(DRAFTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveDraft(draft: Omit<PostDraft, "id" | "lastEdited"> & { id?: string }): PostDraft {
  const drafts = getSavedDrafts();
  const id = draft.id || `draft_${Date.now()}`;
  const newDraft: PostDraft = {
    ...draft,
    id,
    lastEdited: Date.now(),
  };

  const existingIdx = drafts.findIndex(d => d.id === id);
  if (existingIdx >= 0) {
    drafts[existingIdx] = newDraft;
  } else {
    drafts.unshift(newDraft);
  }

  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  return newDraft;
}

export function deleteDraft(id: string): void {
  const drafts = getSavedDrafts().filter(d => d.id !== id);
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

export function setRecoveredBuffer(content: Partial<PostDraft> | null): void {
  if (!content) {
    localStorage.removeItem(RECOVERED_KEY);
  } else {
    localStorage.setItem(RECOVERED_KEY, JSON.stringify({ ...content, timestamp: Date.now() }));
  }
}

export function getRecoveredBuffer(): Partial<PostDraft> | null {
  try {
    const raw = localStorage.getItem(RECOVERED_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
