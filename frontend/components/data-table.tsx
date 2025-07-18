"use client";
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconGenderFemale,
  IconGenderMale,
  IconUser,
} from "@tabler/icons-react";
import { z } from "zod";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export const schema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  gender: z.string(),
  birthday: z.date(),
  age: z.string(),
});

const columns: ColumnDef<z.infer<typeof schema>>[] = [
  {
    accessorKey: "name",
    header: () => (
      <div className="py-[10px] px-[12px] min-w-[254px] text-left">Name</div>
    ),
    cell: ({ row }) => {
      const name = row.getValue("name") as string;
      const namePart1 = name.split(" ")[0]?.[0].toUpperCase();
      const namePart2 = name.split(" ")[1]?.[0].toUpperCase();

      return (
        <div className="py-2 px-[12px] flex content-center items-center">
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback>{namePart1 + namePart2}</AvatarFallback>
          </Avatar>
          <div className="flex-col px-2">
            <div className="font-semibold">{name}</div>
            <div>{row.original.email}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "gender",
    header: () => (
      <div className="py-[10px] px-[12px] min-w-[100px] text-left">Gender</div>
    ),
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string;
      const formatGender =
        gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase();

      return (
        <div className="py-2 px-[12px] flex items-center text-left">
          {gender?.toLowerCase() === "female" && (
            <Badge variant="outline">
              <IconGenderFemale size={14} color="#ec0043" />
              {formatGender}
            </Badge>
          )}
          {gender?.toLowerCase() === "male" && (
            <Badge variant="outline">
              <IconGenderMale size={14} color="#0664f5" />
              {formatGender}
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "birthday",
    header: () => (
      <div className="py-[10px] px-[12px] min-w-[140px] text-left">
        Birth Date
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="py-2 px-[12px] text-left">
          {format(new Date(row.getValue("birthday")), "MMM d, yyyy")}
        </div>
      );
    },
  },
  {
    accessorKey: "age",
    header: () => (
      <div className="py-[10px] px-[12px] min-w-[80px] text-left">Age</div>
    ),
    cell: ({ row }) => {
      return (
        <div className="py-2 px-[12px] text-left">{row.getValue("age")}</div>
      );
    },
  },
  {
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
            size="icon"
          >
            <IconDotsVertical />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => e.preventDefault()}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export function DataTable({ data }: { data: z.infer<typeof schema>[] }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md border">
        <Table className="min-w-full table-auto">
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="items-center">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <div className="flex flex-col justify-center items-center p-24">
                    <IconUser size={64} color="#a1a1aa" />
                    <Label className="text-sm">Add Profile</Label>
                    <Label className="text-muted-foreground">
                      You haven't added any profiles yet.
                    </Label>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between px-4">
        <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
          {table.getFilteredRowModel().rows.length} total item(s) found.
        </div>
        <div className="flex w-full items-center gap-8 lg:w-fit">
          <div className="flex w-fit items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </div>
          <div className="ml-auto flex items-center gap-2 lg:ml-0">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="size-8"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden size-8 lg:flex"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
