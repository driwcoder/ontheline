"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
import { SearchInput } from "./search-input";
import { isTeacher } from "@/lib/teacher";

const NavbarRoutes = () => {
  const pathname = usePathname();
  const { userId } = useAuth()
  const isTeacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");
  const isSearchPage = pathname === "/search"

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
           <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto items-center">
        {isTeacherPage || isPlayerPage ? (
          <Link href="/">
            <Button variant={'ghost'}>
              <LogOut className="h-4 w-4 mr-2" />
              <p>Sair</p>
            </Button>
          </Link>
        ) : isTeacher(userId) ? (
          <Link href="/teacher/courses">
            <Button size={"sm"} variant={"ghost"}>
              Modo Professor
            </Button>
          </Link>
        ) : null}
        <UserButton afterSignOutUrl="/" />
      </div>
    </>
  );
};

export default NavbarRoutes;
