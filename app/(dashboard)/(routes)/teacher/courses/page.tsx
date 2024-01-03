import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const CoursesPage = () => {
  return (
    <div>
      <Link href={"/teacher/create"}>
        <Button>Novo curso</Button>
      </Link>
    </div>
  );
};

export default CoursesPage;
