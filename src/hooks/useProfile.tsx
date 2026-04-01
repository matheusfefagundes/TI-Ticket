"use client";

import { UserRole } from "@/generated/client/enums";
import { useSession } from "next-auth/react";

export function useProfile() {
  const { data: session } = useSession();

  const role = session?.user.role as UserRole;

  const hasRole = (requiredRole: UserRole) => {
    const userRole = role === requiredRole;

    return userRole;
  };

  const hasAnyRole = (roles: UserRole[]) => {
    const userRoles = !!role && roles.includes(role);

    return userRoles;
  };

  return {
    role,
    hasRole,
    hasAnyRole,
  };
}
