import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package } from "lucide-react";
import { UserNav } from "@/components/auth/UserNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <Package className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">CampusFind</span>
          </Link>
        </div>
        <nav className="flex items-center gap-4 text-sm lg:gap-6">
          <Button variant="ghost" asChild>
             <Link href="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
             <Link href="/report">Report Item</Link>
          </Button>
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
