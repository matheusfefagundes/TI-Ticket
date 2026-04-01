"use client";

import { DeleteImage } from "../actions/DeleteImage";
import { GetUserImage } from "../actions/GetUserImage";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function useUserImage() {
  const { data: session, update } = useSession();

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const avatarUrl = uploadedImage ?? session?.user.image ?? null;

  const handleUploadChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!event.target.files) return;

    if (!session?.user.name || !session.user.email) {
      toast.error("Você precisa estar logado para atualizar a foto.");
      return;
    }

    const file = event.target.files?.[0];

    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setUploadedImage(previewUrl);

    const formData = new FormData();
    formData.append("file", file);

    formData.append("userId", session.user.id);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        console.log("Erro:", data.error);
        toast.error(data.error);
        setUploadedImage(null);
        return;
      }

      if (data.url) setUploadedImage(data.url);
      toast.success("Arquivo carregado com sucesso!");

      const userImage = await GetUserImage({
        userId: session.user.id,
        imageUrl: data.url,
      });
      setUploadedImage(userImage.image);

      await update({ image: userImage.image });
    } catch (error) {
      console.error("Erro no upload:", error);
    }
  };

  const handleDeleteImage = async () => {
    if (!session) return;

    try {
      await DeleteImage({ userId: session.user.id });

      setUploadedImage("");

      await update({ image: "" });

      toast.success("Foto excluída com sucesso!");
    } catch (error) {
      console.log(error);
      toast.error(
        "Não foi possível excluir a foto. Tente novamente mais tarde.",
      );
    }
  };

  return {
    avatarUrl,
    handleUploadChange,
    session,
    handleDeleteImage,
  };
}
