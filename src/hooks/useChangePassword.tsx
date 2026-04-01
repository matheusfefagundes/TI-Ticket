"use client";

import { ChangePasswordAction } from "../actions/ChangePasswordAction";
import { ChangePasswordData } from "../schemas/change-password";
import { useState } from "react";
import { toast } from "sonner";

export function useChangePassword(userId: string) {
  const [isOpen, setIsOpen] = useState(false);

  const onSubmit = async (data: ChangePasswordData) => {
    try {
      const response = await ChangePasswordAction(userId, data);

      if (!response?.success) {
        toast.error(response?.message);
        return;
      }

      if (response.success) {
        setIsOpen(false);
      }

      toast.success(response.message);
    } catch (error) {
      console.log(error);
      toast.error(
        "Não foi possível alterar a senha. Tente novamente mais tarde.",
      );
    }
  };

  return {
    onSubmit,
    isOpen,
    setIsOpen,
  };
}
