"use client";
import axios from "axios";

import { Trash } from "lucide-react";
import { useState } from "react";

import { useRouter } from "next/navigation";

import ConfirmModal from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useConfettiStore } from "@/use-confetti-store";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

export const Actions = ({
  disabled,
  courseId,
  isPublished,
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore()
  const [isLoading, setIsLoading] = useState(false);
  
  const onClick = async () => {
    try {
      setIsLoading(true);

      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast({
          title: "Curso despublicado",
          description: "Seu curso não está mais disponível",
          variant: "success",
        });
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast({
          title: "Curso publicado",
          description: "Seu curso agora está disponível",
          variant: "success",
        });
        confetti.onOpen()
      }

      router.refresh();
    } catch {
      toast({
        title: "Algo deu errado",
        description: "Seu curso não foi públicado, tente mais tarde",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      toast({
        title: "Curso deletado",
        description: "O curso foi excluído com sucesso",
        variant: "success",
      });
      router.refresh();
      router.push(`/teacher/courses/`);
    } catch {
      toast({
        title: "Algo deu errado",
        description: "Seu curso não foi excluído, tente mais tarde",
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
