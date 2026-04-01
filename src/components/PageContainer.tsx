"use client";

import { ReactNode } from "react";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import { useIsRoute } from "../hooks/useIsRoute";
import Link from "next/link";
import { PopupService } from "./PopupService";
import { cn } from "../lib/classMerge";

interface PageContainerProps {
  children: ReactNode;
  title: string;
  id?: string;
  actionRef?: string;
  className?: string;
}

export function PageContainer({
  title,
  children,
  actionRef,
  className,
}: PageContainerProps) {
  const isRouteTechnicians = useIsRoute({ ref: "/admin/users/technicians" });
  const isRouteServices = useIsRoute({ ref: "/admin/services" });

  return (
    <div
      className={cn(["container mt-7 w-full space-y-6 md:px-12", className])}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-brand-dark text-xl font-bold">{title}</h1>
        {isRouteTechnicians && actionRef && (
          <Link href={actionRef}>
            <Button>
              <PlusIcon />
              <p className="hidden md:block">Novo</p>
            </Button>
          </Link>
        )}
        {isRouteServices && (
          <PopupService title="Cadastro de serviço">
            <Button>
              <PlusIcon />
              <p className="hidden md:block">Novo</p>
            </Button>
          </PopupService>
        )}
      </div>

      {children}
    </div>
  );
}
