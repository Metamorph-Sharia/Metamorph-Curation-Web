// Leaving a page with entries not yet sent asks first. One listener for the whole page, however many forms it
// has (the document page has a dozen): each form only says whether it has unsaved entries.
const unsaved = new Set<symbol>();
let listening = false;

export function markUnsaved(form: symbol): void {
  unsaved.add(form);
  if (!listening && typeof window !== "undefined") {
    window.addEventListener("beforeunload", (event) => {
      if (unsaved.size) {
        event.preventDefault();
      }
    });
    listening = true;
  }
}

export function markSaved(form: symbol): void {
  unsaved.delete(form);
}
