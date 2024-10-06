"use client";
import Image from 'next/image';
import { useState } from "react";
import { Bell, Search, PlusSquare, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeButton from "./theme-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetTrigger } from "./ui/sheet";
import { signOut, useSession } from "next-auth/react";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 bg-header text-header-foreground shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>
            <Link href="/">
              <div className="text-2xl font-bold">Logo</div>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 mx-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full max-w-md"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setShowMobileSearch(!showMobileSearch)}
            >
              <Search className="h-6 w-6" />
            </Button>

            {status === "loading" ? (
              <Skeleton className="h-9 w-32 rounded-md bg-muted" />
            ) : status === "authenticated" && session ? (
              <>
                <Link href={"/create-post"}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={
                      pathname === "/create-post"
                        ? "bg-muted text-muted-foreground"
                        : ""
                    }
                  >
                    <PlusSquare className="h-6 w-6" />
                  </Button>
                </Link>
                <Link href={"/notifications"}>
                  <Button variant="ghost" size="icon">
                    <Bell className="h-6 w-6" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={cn({
                        "bg-muted text-muted-foreground":
                          pathname === "/profile",
                        "rounded-full": session.user?.image,
                      })}
                    >
                      {session.user?.image ? (
                        <Image
                          src={session.user.image}
                          alt={session.user?.name || "User Profile"}
                          width={32} // Adjust size as needed
                          height={32}
                          className="rounded-full"
                          priority // Optional: Loads the image with high priority
                        />
                      ) : (
                        <User className="h-6 w-6" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-header text-header-foreground w-[90vw] md:w-56"
                    align="center"
                    collisionPadding={16}
                  >
                    <DropdownMenuLabel>
                      <Link href="/profile">
                        <p className="text-base">{session.user?.name}</p>
                        {session.user?.email ?? (
                          <span className="text-sm">{session.user?.email}</span>
                        )}
                      </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href="/dashboard" className="w-full">
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/create-post" className="w-full">
                        Create Post
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/reading-list" className="w-full">
                        Reading list
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href="/settings" className="w-full">
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <Button
                      variant="outline"
                      onClick={() => signOut({ callbackUrl: "/" })}
                      size={"sm"}
                      className="w-full"
                    >
                      Sign out
                    </Button>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link href={"/signin"} className="hidden md:block">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link href={"/signup"}>
                  <Button variant="ghost">Create account</Button>
                </Link>
              </>
            )}

            <ThemeButton />
          </div>
        </div>

        {showMobileSearch && (
          <div className="md:hidden py-2">
            <Input type="search" placeholder="Search..." className="w-full" />
          </div>
        )}
      </div>
    </header>
  );
}
