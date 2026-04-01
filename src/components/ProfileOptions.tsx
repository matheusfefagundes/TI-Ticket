import { cn } from "../lib/classMerge";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import { useLogout } from "../hooks/useLogout";
import { useProfile } from "../hooks/useProfile";
import { PopupProfile } from "./PopupProfile";

interface ProfileOptionsProps {
  className?: string;
  onClose?: () => void;
}

export function ProfileOptions({ className, onClose }: ProfileOptionsProps) {
  const { logoutAction } = useLogout();
  const { hasRole } = useProfile();

  return (
    <div
      className={cn([
        "bg-app-gray-100 relative z-50 mx-3 space-y-4 rounded-2xl px-5 py-4",
        className,
      ])}
    >
      <h3 className="text-app-gray-400 text-[10px] font-bold uppercase">
        Opções
      </h3>

      {!hasRole("admin") && (
        <div>
          {
            <PopupProfile
              onClick={onClose}
              className="flex w-max items-center gap-2 p-0"
            >
              <Image
                src="/icons/circle-user.svg"
                alt="Ícone de usuário"
                width={20}
                height={20}
              />
              <p className="text-app-gray-500 cursor-pointer text-base">
                Perfil
              </p>
            </PopupProfile>
          }
        </div>
      )}

      <Button
        className="ml-3 flex items-center gap-2"
        size="icon"
        onClick={logoutAction}
        variant="ghost"
      >
        <LogOut size={20} className="text-feedback-danger" />
        <p className="text-feedback-danger cursor-pointer text-base">Sair</p>
      </Button>
    </div>
  );
}
