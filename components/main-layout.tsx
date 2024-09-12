import { useState } from "react";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header showCreatePost={true} showNotifications={true} />
      <div className="container mx-auto px-4 grid grid-cols-5 relative">
        <Sidebar showDesktop={true} />
        <main className="col-span-5 md:col-span-4 p-4">{children}</main>
      </div>
    </div>
  );
}
