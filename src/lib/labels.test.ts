import { describe, expect, it } from "vitest";

import { asSentence, doneNotice, fieldLabel, holdCheck, reviewQueue, reviewQueueLabel, severityLabel, severityTone } from "./labels";

describe("what the console calls things", () => {
  it("names each review queue as curators know it", () => {
    expect(reviewQueueLabel("unresolved_citation")).toBe("Unlinked Citations");
    expect(reviewQueueLabel("conflict")).toBe("Conflicts");
    expect(reviewQueueLabel("quarantine")).toBe("Quarantine");
    expect(reviewQueueLabel("something_new")).toBe("Something new");
  });

  it("gives each health severity one tone", () => {
    expect(severityTone("ok")).toBe("ok");
    expect(severityTone("warning")).toBe("warning");
    expect(severityTone("critical")).toBe("critical");
    expect(severityTone("unknown")).toBe("neutral");
  });
});

describe("the API's messages, as sentences", () => {
  it("starts with a capital and ends with a full stop, once", () => {
    expect(asSentence("the username or password is wrong")).toBe("The username or password is wrong.");
    expect(asSentence("Already a sentence.")).toBe("Already a sentence.");
  });
});

describe("severities, as words", () => {
  it("writes OK as OK, and the rest as words", () => {
    expect(severityLabel("ok")).toBe("OK");
    expect(severityLabel("warning")).toBe("Warning");
  });
});

describe("the console's vocabulary, carried over from the first curation app", () => {
  it("names each check of the publish gate, and what to do about it", () => {
    expect(holdCheck("identity")).toEqual({ label: "Unidentified", todo: "Assign the document’s canonical ID." });
    expect(holdCheck("structure").label).toBe("Structure");
  });

  it("names each correctable field", () => {
    expect(fieldLabel("effective_on")).toBe("Effective");
    expect(fieldLabel("status_as_of")).toBe("Status As Of");
  });

  it("says why items land in a review queue, and what to do", () => {
    expect(reviewQueue("unresolved_citation").todo).toBe("Link the citation to the document it means.");
  });

  it("confirms each change in a sentence, and knows nothing of unknown ones", () => {
    expect(doneNotice("approved")).toBe("Approved. The document is checked again and published if it passes.");
    expect(doneNotice("anything-else")).toBeNull();
    expect(doneNotice("added")).toBe("Document added. It is published once it passes the publish gate.");
  });
});
