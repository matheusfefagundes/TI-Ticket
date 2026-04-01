"use client";

import { MenuIcon, X } from "lucide-react";
import { Button } from "./ui/button";

import { NavLinks } from "./NavLinks";
import { ProfileOptions } from "./ProfileOptions";
import { AppHeader } from "./AppHeader";
import { useToggleMenu } from "@/hooks/useToggleMenu";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { InitialsAvatar } from "./InitialsAvatar";

export function MobileHeader() {
  const { data: session } = useSession();

  const menuRef = useRef<HTMLDivElement | null>(null);

  const data = useToggleMenu(menuRef);

  if (!session?.user.name) return;

  return (
    <div className="relative z-50 lg:hidden" ref={menuRef}>
      <div className="flex justify-between p-6 lg:hidden">
        <div className="flex items-center gap-4">
          <div>
            <Button size="icon-lg" onClick={data.openMenu}>
              {data.clickMenu ? <X /> : <MenuIcon />}
            </Button>
          </div>
          <AppHeader />
        </div>
        <Button
          type="button"
          variant="ghost"
          className="bg-brand-dark hover:bg-brand-base flex h-10 w-10 cursor-pointer items-center justify-center rounded-full"
          onClick={data.openProfile}
        >
          {<InitialsAvatar name={session.user.name} />}
        </Button>
      </div>

      {data.clickMenu && (
        <div className="bg-app-gray-100 mx-3 mt-6 grid h-max gap-1 rounded-2xl px-5 py-4">
          <NavLinks title="Menu" onClose={() => data.closeMenu()} />
        </div>
      )}
      {data.clickProfile && (
        <div className="mt-6">
          <ProfileOptions onClose={() => data.closeProfile} />
        </div>
      )}
    </div>
  );
}
