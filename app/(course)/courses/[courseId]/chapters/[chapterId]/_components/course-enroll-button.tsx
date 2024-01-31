"use client";

import axios from "axios";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import { toast } from "@/components/ui/use-toast";

interface CourseEnrollButtonProps {
  price: number;
  courseId: string;
}

export const CourseEnrollButton = ({
  price,
  courseId,
}: CourseEnrollButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await axios.post(`/api/courses/${courseId}/checkout`)

      window.location.assign(response.data.url);
    } catch {
      toast({
        title: "Algo errado aconteceu",
        description: "Tente novamente mais tarde.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      size="sm"
      className="w-full md:w-auto"
    >
      Adquira por {formatPrice(price)}
    </Button>
  )
}