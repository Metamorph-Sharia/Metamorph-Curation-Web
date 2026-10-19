import type { ReactNode } from "react";

// A data table on the console's surface: header row on a sunken band, rows divided by a hairline. Columns listed
// in `numeric` align right (their cells should be tabular numbers).
export function Table({ head, numeric = [], children }: { head: string[]; numeric?: number[]; children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-ui border border-line bg-surface">
      <table className="w-full text-sm [&_td]:px-4 [&_td]:py-2.5 [&_th]:px-4 [&_th]:py-2.5 [&_tbody_tr+tr]:border-t [&_tbody_tr+tr]:border-line">
        <thead className="bg-sunken text-left text-xs font-medium text-muted">
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
