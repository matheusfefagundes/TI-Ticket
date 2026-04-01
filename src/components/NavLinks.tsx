"use client";

import { menuListByRole } from "@/utils/menuListByRole";
import { Button } from "./ui/button";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/classMerge";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface NavLinkProps {
  onClose?: () => void;
  title?: string;
}

export function NavLinks({ onClose, title }: NavLinkProps) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);

  const session = useSession();

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!session.data?.user.role) return null;

  return (
    <>
      {title && (
        <h3 className="text-app-gray-400 mb-3 text-[10px] font-bold uppercase">
          {title}
        </h3>
      )}
      {menuListByRole[session.data.user.role].map((user) => (
        <Button
          className={cn([
            "flex items-center justify-start gap-3 p-3 text-start text-sm",
            activeLabel === user.label
              ? "text-app-gray-600"
              : "text-app-gray-400",
          ])}
          variant={activeLabel === user.label ? "secondary" : "ghost"}
          key={user.label}
          onClick={() => {
            setActiveLabel(user.label);
            handleClick();
          }}
          asChild
        >
          <Link href={user.path}>
            <Image
              width={20}
              height={20}
              src={activeLabel === user.label ? user.iconHover : user.icon}
              alt={user.label}
            />
            {user.label}
          </Link>
        </Button>
      ))}
    </>
  );
}
