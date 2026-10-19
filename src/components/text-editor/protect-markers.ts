import { EditorState, type Extension, RangeSet, RangeValue, StateField } from "@codemirror/state";
import { Decoration, type DecorationSet, EditorView } from "@codemirror/view";

import { pageMarkerRanges } from "@/lib/page-markers";

class Marker extends RangeValue {}
const MARKER = new Marker();
const LOOK = Decoration.mark({ class: "cm-page-marker", attributes: { title: "Page marker: kept as it is" } });

// Where the markers are: found once, then moved along with every change around them (no rescan of a long text on
// each keystroke).
const markers = StateField.define<RangeSet<Marker>>({
  create: (state) => RangeSet.of(pageMarkerRanges(state.doc.toString()).map(([from, to]) => MARKER.range(from, to))),
  update: (ranges, tr) => ranges.map(tr.changes),
});

// Markers look different, so a curator sees what they can't change.
const looks = StateField.define<DecorationSet>({
  create: (state) => decorated(state.field(markers)),
  update: (_, tr) => decorated(tr.state.field(markers)),
  provide: (field) => EditorView.decorations.from(field),
});

// A change that touches a marker line doesn't happen: not inside it, not at its edges, not the line breaks that
// keep it a line of its own. Writing on the lines around it is free.
const keepMarkers = EditorState.changeFilter.of((tr) => {
  const ranges = tr.startState.field(markers);
  let touches = false;
  tr.changes.iterChangedRanges((fromA, toA) => {
    ranges.between(Math.max(0, fromA - 1), toA + 1, (from, to) => {
      if (fromA <= to && toA >= from) {
        touches = true;
        return false;
      }
    });
  });
  return !touches;
});

export function protectPageMarkers(): Extension {
  return [markers, looks, keepMarkers];
}

function decorated(ranges: RangeSet<Marker>): DecorationSet {
  const marks: ReturnType<typeof LOOK.range>[] = [];
  ranges.between(0, Number.MAX_SAFE_INTEGER, (from, to) => {
    marks.push(LOOK.range(from, to));
  });
  return Decoration.set(marks);
}
