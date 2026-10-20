import type { ReactNode } from "react";

import { CARD } from "./styles";

// A data table in a card: header row on a sunken band, rows divided by a hairline. Tables built by hand (a
// document's fields) share these looks.
export const TABLE_FRAME = `${CARD} overflow-x-auto`;
export const TABLE =
  "w-full text-sm [&_td]:px-4 [&_td]:py-3 [&_th]:px-4 [&_th]:py-3 [&_tbody_tr+tr]:border-t [&_tbody_tr+tr]:border-line";
export const TABLE_HEAD = "border-b border-line bg-sunken/60 text-left text-xs font-medium text-muted";

// Columns listed in `numeric` align right (their cells should be tabular numbers).
export function Table({ head, numeric = [], children }: { head: string[]; numeric?: number[]; children: ReactNode }) {
  return (
    <div className={TABLE_FRAME}>
      <table className={TABLE}>
        <thead className={TABLE_HEAD}>
          <tr>
            {head.map((label, column) => (
              <th key={label} scope="col" className={numeric.includes(column) ? "text-right" : undefined}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}
