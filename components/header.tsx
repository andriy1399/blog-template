"use client";

import { useState } from "react";
import { Bell, Search, PlusSquare, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeButton from "./theme-button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetTrigger } from "./ui/sheet";

interface HeaderProps {
  showCreatePost?: boolean;
  showNotifications?: boolean;
}

export function Header({
  showCreatePost = true,
  showNotifications = true,
}: HeaderProps) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const pathname = usePathname();

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
            {showCreatePost && (
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
            )}
            {showNotifications && (
              <Link href={"/notifications"}>
                <Button variant="ghost" size="icon">
                  <Bell className="h-6 w-6" />
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="icon">
              <User className="h-6 w-6" />
            </Button>
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
