"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Form } from "../Form";
import { Field, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  ChangePasswordData,
  changePasswordSchema,
} from "@/schemas/change-password";
import { useChangePassword } from "@/hooks/useChangePassword";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";

interface PopupChangePasswordProps {
  userId: string;
}

export function PopupChangePassword({ userId }: PopupChangePasswordProps) {
  const { onSubmit, isOpen, setIsOpen } = useChangePassword(userId);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onTouched",
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          className="text-app-gray-200 px-2 py-1.5 text-xs font-bold"
        >
          Alterar
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-app-gray-600 border-0 p-0">
        <DialogHeader className="border-app-gray-500 flex items-center gap-3 border-b px-6 py-5">
          <DialogTitle className="text-app-gray-200 font-bold">
            Alterar senha
          </DialogTitle>
        </DialogHeader>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="border-app-gray-500 border-b p-8">
            <Field>
              <FieldLabel
                htmlFor="current-password"
                className="text-app-gray-300 text-[10px] font-bold uppercase"
              >
                Senha atual
              </FieldLabel>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  {...register("currentPassword")}
                  placeholder="Digite sua senha atual"
                  className="placeholder:text-md placeholder:text-app-gray-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-app-gray-400 hover:text-app-gray-200"
                >
                  {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.currentPassword && (
                <span className="mt-1 text-xs text-red-500">
                  {errors.currentPassword.message}
                </span>
              )}
            </Field>
            <Field>
              <FieldLabel
                htmlFor="new-password"
                className="text-app-gray-300 text-[10px] font-bold uppercase"
              >
                Nova senha
              </FieldLabel>
              <div className="relative">
                <Input
                  id="new-password"
                  type={showNewPassword ? "text" : "password"}
                  {...register("newPassword")}
                  placeholder="Digite sua nova senha"
                  className="placeholder:text-md placeholder:text-app-gray-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-app-gray-400 hover:text-app-gray-200"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.newPassword && (
                <span className="mt-1 text-xs text-red-500">
                  {errors.newPassword.message}
                </span>
              )}
            </Field>
            <Field>
              <FieldLabel
                htmlFor="confirm-password"
                className="text-app-gray-300 text-[10px] font-bold uppercase"
              >
                Confirme sua senha
              </FieldLabel>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmNewPassword")}
                  placeholder="Confirme sua nova senha"
                  className="placeholder:text-md placeholder:text-app-gray-400 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-app-gray-400 hover:text-app-gray-200"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmNewPassword && (
                <span className="mt-1 text-xs text-red-500">
                  {errors.confirmNewPassword.message}
                </span>
              )}
            </Field>
          </FieldGroup>
          <Field className="px-7 pb-6">
            <Button
              disabled={isSubmitting}
              type="submit"
            >
              Salvar
            </Button>
          </Field>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
