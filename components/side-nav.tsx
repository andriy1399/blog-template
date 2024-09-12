"use client";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { Home, ListCheck, Star } from "lucide-react";

const SideNav = ({ className }: { className?: string }) => {
  const pathname = usePathname();

  return (
    <nav className={cn("p-4 space-y-2", className)}>
      <Link href="/">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            pathname === "/" && "bg-muted text-muted-foreground"
          )}
        >
          <Home className="mr-2 h-4 w-4" />
          Home
        </Button>
      </Link>
      <Link href="/tags">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            pathname === "/tags" && "bg-muted text-muted-foreground"
          )}
        >
          <ListCheck className="mr-2 h-4 w-4" />
          Tags
        </Button>
      </Link>

      <Link href="/about">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start",
            pathname === "/about" && "bg-muted text-muted-foreground"
          )}
        >
          <Star className="mr-2 h-4 w-4" />
          About
        </Button>
      </Link>
    </nav>
  );
};

export default SideNav;
