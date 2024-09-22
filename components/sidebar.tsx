import { cn } from "@/lib/utils";
import SideNav from "./side-nav";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

type Props = {
  showSidebar?: boolean;
};

export function Sidebar({ showSidebar }: Props) {
  return (
    <div
      className={cn("col-span-0 relative ", { "md:col-span-1": showSidebar })}
    >
      {showSidebar && (
        <aside
          className={cn(`
        hidden
        w-full
        sticky left-0 z-50 bg-header text-header-foreground
        top-20
        rounded-lg
        border border-ring
        bottom-0
        min-h-[calc(100vh-90px)]
        md:block
      `)}
        >
          <SideNav />
        </aside>
      )}

      <SheetContent side={"left"} className="bg-header text-header-foreground">
        <SheetHeader>
          <SheetTitle></SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <SideNav className="px-0" />
      </SheetContent>
    </div>
  );
}
