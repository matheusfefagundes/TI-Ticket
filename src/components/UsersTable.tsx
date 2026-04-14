"use client";

import { DataTable } from "@/components/DataTable";
import { InitialsAvatar } from "@/components/InitialsAvatar";
import { TimeSlotsTechnicial } from "@/components/TimeSlotsTechnicial";
import { Button } from "@/components/ui/button";
import { useIsRoute } from "@/hooks/useIsRoute";
import { cn } from "@/lib/classMerge";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DeleteUser } from "./DeleteUser";
import Link from "next/link";
import { PopupClient } from "./PopupClient";

export type Users = {
  id: string;
  name: string;
  email: string;
  availabilities: {
    schedules: string[];
  }[];
};

type UsersTableProps = {
  data: Users[];
};

export function UsersTable({ data }: UsersTableProps) {
  const isClient = useIsRoute({ ref: "/admin/users/clients" });

  const columns: ColumnDef<Users>[] = [
    {
      accessorKey: "name",
      header: () => <p className="text-app-gray-400 text-sm">Nome</p>,
      cell: ({ row }) => {
        const user = row.original.name;

        return (
          <div className="flex items-center gap-3">
            <div className="bg-brand-dark flex h-5 w-5 items-center justify-center rounded-full">
              {<InitialsAvatar className="text-[8.75px]" name={user} />}{" "}
            </div>
            <p>{user}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "email",
      header: () => {
        return (
          <p
            className={cn([
              "text-app-gray-400 text-sm md:table-cell",
              isClient ? "" : "hidden",
            ])}
          >
            E-mail
          </p>
        );
      },
      cell: ({ row }) => {
        const email = row.original.email;

        return (
          <div className={cn(["md:table-cell", isClient ? "" : "hidden"])}>
            {email}
          </div>
        );
      },
    },
    {
      accessorKey: "availabilities",
      header: () => {
        return !isClient ? (
          <p className="text-app-gray-400 text-sm">Disponibilidade</p>
        ) : null;
      },
      cell: ({ row }) => {
        const schedules = row.original.availabilities[0];

        return (
          schedules &&
          !isClient && <TimeSlotsTechnicial availabilities={schedules} />
        );
      },
    },
    {
      accessorKey: "id",
      header: "",
      cell: ({ row }) => {
        return (
          <div className="flex justify-end gap-2">
            <DeleteUser userId={row.original.id} name={row.original.name} />
            {isClient ? (
              <PopupClient
                name={row.original.name}
                email={row.original.email}
                userId={row.original.id}
              />
            ) : (
              <Button
                size="icon-sm"
                variant="ghost"
                className="bg-app-gray-500 hover:bg-app-gray-400 transition-colors"
                asChild
              >
                <Link
                  href={`/admin/users/technicians/technician-profile/${row.original.id}`}
                >
                  <Image
                    src="/icons/pen-line.svg"
                    alt="Ícone de lápis"
                    width={14}
                    height={14}
                  />
                </Link>
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  return <DataTable columns={columns} data={data} />;
}
