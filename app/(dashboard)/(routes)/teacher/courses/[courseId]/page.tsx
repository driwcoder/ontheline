import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import {
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

import { db } from "@/lib/db";
import { TitleForm } from "./_components/title-form";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { CategoryForm } from "./_components/category-form";

const CourseIdPage = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
      userId,
    },
    include: {
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });
  console.log(categories);
  if (!course) {
    return redirect("/");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price,
    course.categoryId,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      <div className="flex flex-col gap-y-2 md:w-[600px]">
        <h1 className="text-2xl font-medium">Configurações do curso</h1>
        <span className="text-sm text-slate-700">
          Complete os campos vazios {completionText}
        </span>
        <TitleForm initialData={course} courseId={course.id} />
        <DescriptionForm initialData={course} courseId={course.id} />
        <ImageForm initialData={course} courseId={course.id} />
        <CategoryForm
          initialData={course}
          courseId={course.id}
          options={categories.map((category) => ({
            label: category.name,
            value: category.id,
          }))}
        />
      </div>
    </>
  );
};

export default CourseIdPage;
