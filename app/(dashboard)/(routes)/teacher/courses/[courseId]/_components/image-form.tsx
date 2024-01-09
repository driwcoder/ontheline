"use client";

import * as z from "zod";
import axios from "axios";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { Course } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { FileUpload } from "@/components/file-upload";

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Imagem obrigatória",
  }),
});

export const ImageForm = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}`, values);
      toast({
        title: "Descrição atualizada",
        description: "Sua descrição foi alterada com sucesso!",
        variant: "success",
      });
      toggleEdit();
      router.refresh();
    } catch {
      toast({
        title: "Erro!",
        description: "Algo inesperado aconteceu! Tente novamente mais tarde.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-2 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Imagem do curso
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancelar</>}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Adicione uma imagem
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Trocar imagem
            </>
          )}
        </Button>
      </div>
      {!isEditing &&
        (!initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rouinded-md"
              src={initialData.imageUrl}
            />
          </div>
        ))}

      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseImage"
            onChange={(url) => {
              if (url) {
                onSubmit({ imageUrl: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Proporção recomendada 16:9
          </div>
        </div>
      )}
    </div>
  );
};
