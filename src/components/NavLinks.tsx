"use client";

import { menuListByRole } from "@/utils/menuListByRole";
import { Button } from "./ui/button";
import Image from "next/image";
import { useMemo } from "react";
import { cn } from "@/lib/classMerge";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Session } from "next-auth";

interface NavLinkProps {
  onClose?: () => void;
  title?: string;
}

export function NavLinks({ onClose, title }: NavLinkProps) {
  const pathname = usePathname();
  const { data: sessionData } = useSession();

  const session = sessionData as (Session & { user: { role: string } }) | null;

  const activeLabel = useMemo(() => {
    if (!session?.user?.role) return null;

    const currentMenuItems =
      menuListByRole[session.user.role as keyof typeof menuListByRole];
    const activeItem = currentMenuItems?.find((item) =>
      pathname.startsWith(item.path),
    );

    return activeItem?.label ?? null;
  }, [pathname, session?.user?.role]);

  const handleClick = () => {
    if (onClose) {
      onClose();
    }
  };

  if (!session?.user?.role) return null;

  const menuItems =
    menuListByRole[session.user.role as keyof typeof menuListByRole];

  return (
    <>
      {title && (
        <h3 className="text-app-gray-400 mb-3 text-[10px] font-bold uppercase">
          {title}
        </h3>
      )}
      {menuItems?.map((user) => (
        <Button
          className={cn([
            "flex items-center justify-start gap-3 p-3 text-start text-sm",
            activeLabel === user.label
              ? "text-app-gray-600"
              : "text-app-gray-400",
          ])}
          variant={activeLabel === user.label ? "secondary" : "ghost"}
          key={user.label}
          onClick={handleClick}
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
