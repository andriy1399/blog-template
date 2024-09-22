"use client";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

const pagesWithSidebar = ["/", "/latest", "/top"];

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showSidebar = pagesWithSidebar.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 grid grid-cols-5 relative">
        <Sidebar showSidebar={showSidebar} />
        <main
          className={cn("col-span-5 p-4", { "md:col-span-4": showSidebar })}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
