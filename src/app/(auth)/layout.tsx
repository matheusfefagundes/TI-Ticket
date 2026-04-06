import Image from "next/image";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-screen w-full items-center justify-center p-4">
      
      <Image 
        src="/Login_Background.png"
        fill
        alt="Imagem de fundo"
        className="object-cover -z-10"
      />
      
      {/* ADICIONADO: max-h-[95vh] e flex flex-col */}
      <div className="bg-app-gray-600 relative flex max-h-[95vh] w-full max-w-md flex-col overflow-y-auto rounded-2xl shadow-2xl [&::-webkit-scrollbar]:hidden">
        <div className="flex shrink-0 items-center justify-center gap-3 py-6 pt-8">
          <Image
            src="/Logo_IconDark.svg"
            alt="Ícone do ti-ticket"
            height={40}
            width={40}
            className="object-cover"
          />
          <h2 className="text-brand-dark text-xl font-bold">TI-Ticket</h2>
        </div>
        
        <div className="px-6 pb-8">
          {children}
        </div>
      </div>
    </div>
  );
}