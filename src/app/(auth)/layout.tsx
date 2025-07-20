import Link from "next/link";
import { Package, X } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
            <Link href="/" className="flex items-center gap-2">
                <Package className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-bold font-headline text-foreground">CampusFind</h1>
            </Link>
        </div>
        <div className="bg-card p-8 rounded-lg shadow-lg relative">
            <Link href="/" className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors">
                <X className="h-6 w-6" />
                <span className="sr-only">Close</span>
            </Link>
            {children}
        </div>
      </div>
    </div>
  )
}
