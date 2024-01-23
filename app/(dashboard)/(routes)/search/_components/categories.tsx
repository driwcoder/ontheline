"use client";

import { Category } from "@prisma/client";
import {
  FcEngineering,
  FcBusiness,
  FcFilmReel,
  FcMultipleDevices,
  FcMusic,
  FcOldTimeCamera,
  FcSalesPerformance,
  FcSportsMode,
  FcVoicePresentation,
} from "react-icons/fc";
import { IconType } from "react-icons/lib";
import { CategoryItem } from "./category-item";

interface CategoriesProps {
  items: Category[];
}

const iconMap: Record<Category["name"], IconType> = {
  "Música": FcMusic,
  "Fotografia": FcOldTimeCamera,
  "Bem estar": FcSportsMode,
  "Contabeis": FcSalesPerformance,
  "Ciência da Computação": FcMultipleDevices,
  "Marketing Digital": FcBusiness,
  "Comunicação": FcVoicePresentation,
};

export const Categories = ({ items }: CategoriesProps) => {
  return (
    <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
      {items.map((item) => (
        <CategoryItem
          key={item.id}
          label={item.name}
          icon={iconMap[item.name]}
          value={item.id}
        />
      ))}
    </div>
  );
};
