import { cn } from "@/lib/utils";
import SideNav from "./side-nav";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

type Props = {
  showDesktop?: boolean;
  isSidebarOpen?: boolean;
};
export function Sidebar({ showDesktop }: Props) {
  // const pathname = usePathname();

  return (
    <div className="col-span-0 md:col-span-1 relative ">
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
