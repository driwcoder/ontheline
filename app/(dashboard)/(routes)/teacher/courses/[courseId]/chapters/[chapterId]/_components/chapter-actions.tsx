"use client";
import axios from "axios";

import { Trash } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/unpublish`);
        toast({
          title: "Capítulo despublicado",
          description: "Seu capítulo não está mais disponível no curso",
          variant: "success",
        });
      } else {
        await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/publish`);
        toast({
          title: "Capítulo publicado",
          description: "Seu capítulo agora está disponível no curso",
          variant: "success",
        });
      }

      router.refresh();
    } catch {
      toast({
        title: "Algo deu errado",
        description: "Seu capítulo não foi públicado, tente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast({
        title: "Capítulo deletado",
        description: "O capítulo foi excluído com sucesso",
        variant: "success",
      });
      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
    } catch {
      toast({
        title: "Algo deu errado",
        description: "Seu capítulo não foi públicado, tente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Despublicar" : "Publicar"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
