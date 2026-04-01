"use client";

import { RefObject, useEffect, useState } from "react";

export function useToggleMenu(ref?: RefObject<HTMLElement | null>) {
  const [clickMenu, setClickMenu] = useState(false);
  const [clickProfile, setClickProfile] = useState(false);

  function openMenu() {
    setClickMenu(clickMenu === false ? true : false);
    setClickProfile(false);
  }

  function openProfile() {
    setClickProfile(clickProfile === false ? true : false);
    setClickMenu(false);
  }

  function closeMenu() {
    setClickMenu(false);
  }

  function closeProfile() {
    setClickProfile(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      const target = event.target as HTMLElement;

      if (ref?.current && ref.current.contains(target)) {
        return;
      }

      if (
        target.closest('[role="dialog"]') ||
        target.closest("[data-radix-portal]") ||
        target.closest('[data-state="open"]')
      ) {
        return;
      }

      setClickMenu(false);
      setClickProfile(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref]);

  return {
    clickMenu,
    clickProfile,
    openMenu,
    openProfile,
    closeMenu,
    closeProfile,
  };
}
