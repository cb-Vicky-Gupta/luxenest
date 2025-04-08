import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Column<T> = {
  header: string;
  accessor: keyof T;
  className?: string;
};

type CustomTableProps<T> = {
  data?: T[];
  columns: Column<T>[];
  caption?: string;
  footer?: {
    label: string;
    value: string;
  };
};

export function CustomTable<T extends { [key: string]: any }>({
  data,
  columns,
  caption,
  footer,
}: CustomTableProps<T>) {
  return (
    <Table>
      {caption && <TableCaption>{caption}</TableCaption>}

      <TableHeader>
        <TableRow>
          {columns.map((col, index) => (
            <TableHead key={index} className={col.className}>
              {col.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.map((row, i) => (
          <TableRow key={i}>
            {columns.map((col, j) => (
              <TableCell key={j} className={col.className}>
                {row[col.accessor]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>

      {footer && (
        <TableFooter>
          <TableRow>
            <TableCell colSpan={columns.length - 1}>{footer.label}</TableCell>
            <TableCell className="text-right">{footer.value}</TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}
