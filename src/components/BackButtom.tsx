"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/classMerge";

interface BackButtomProps {
  className?: string;
}

export function BackButtom({ className }: BackButtomProps) {
  const router = useRouter();

  return (
    <Button
      variant="ghost"
      type="button"
      className={cn(["text-app-gray-300 font-bold", className])}
      onClick={() => router.back()}
    >
      <ArrowLeft size={14} color="#535964" />
      Voltar
    </Button>
  );
}
