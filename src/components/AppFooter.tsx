"use client";

import { useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { InitialsAvatar } from "./InitialsAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUserImage } from "../hooks/useUserImage";
import { cn } from "../lib/classMerge";

interface AppFooterProps {
  onClick?: () => void;
}

export function AppFooter({ onClick }: AppFooterProps) {
  const { data } = useSession();
  const { avatarUrl } = useUserImage();

  if (!data?.user.name) return;

  return (
    <div className="flex gap-3 px-4 py-5">
      <Button
        type="button"
        variant="ghost"
        onClick={onClick}
        className={cn([
          "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full",
          !avatarUrl && "bg-brand-dark",
        ])}
      >
        <Avatar>
          <AvatarImage src={avatarUrl || ""} width={48} height={48} />
          <AvatarFallback className="bg-app-gray-500 text-app-gray-200 font-bold">
            <div className="bg-brand-dark hover:bg-brand-base flex h-10 w-10 cursor-pointer items-center justify-center rounded-full">
              <InitialsAvatar name={data.user.name} />
            </div>
          </AvatarFallback>
        </Avatar>
      </Button>

      <div>
        <h2 className="text-app-gray-600 text-sm">{data?.user.name}</h2>
        <p className="text-app-gray-400 text-xs">{data?.user.email}</p>
      </div>
    </div>
  );
}
