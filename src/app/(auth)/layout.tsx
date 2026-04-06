import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-screen w-full pt-8 lg:grid lg:grid-cols-2">
      <Image 
        src="/Login_Background.png"
        fill
        alt="Imagem de fundo"
        className="object-cover"
      />
      <div className="bg-app-gray-600 relative overflow-y-hidden rounded-t-2xl lg:col-start-2 lg:overflow-y-auto [&::-webkit-scrollbar]:hidden">
        <div className="flex items-center justify-center gap-3 py-6 pt-8">
          <Image
            src="/Logo_IconDark.svg"
            alt="Ícone do ti-ticket"
            height={40}
            width={40}
            className="object-cover"
          />
          <h2 className="text-brand-dark text-xl font-bold">TI-Ticket</h2>
        </div>
        {children}
      </div>
    </div>
  );
}
