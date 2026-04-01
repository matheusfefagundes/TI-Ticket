"use client";

import { useState } from "react";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";
import { NavLinks } from "./NavLinks";
import { Button } from "./ui/button";
import { ProfileOptions } from "./ProfileOptions";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      <div className="border-app-gray-200 mt-3 mb-auto border-b px-5 py-6">
        <AppHeader />
      </div>

      <div className="border-app-gray-200 justify-start border-b px-4 pt-5">
        <NavLinks />
      </div>

      <div className="relative">
        <Button
          variant="ghost"
          asChild
          onClick={() => (isOpen === true ? setIsOpen(false) : setIsOpen(true))}
        >
          <AppFooter />
        </Button>
        {isOpen && (
          <div className="absolute bottom-2 left-full w-50">
            <ProfileOptions />
          </div>
        )}
      </div>
    </div>
  );
}
