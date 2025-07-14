import Link from "next/link";
import { Package } from "lucide-react";

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
        <div className="bg-card p-8 rounded-lg shadow-lg">
            {children}
        </div>
      </div>
    </div>
  )
}
