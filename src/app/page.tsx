import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { University, Package, Search, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Package className="h-8 w-8 text-primary" />
          <h1 className="text-2xl font-bold font-headline text-foreground">CampusFind</h1>
        </Link>
        <nav>
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        </nav>
      </header>
      <main className="flex-grow">
        <section className="text-center py-20 lg:py-32 bg-primary/10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-bold font-headline text-foreground mb-4">
              Lost something? Found something?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              CampusFind is the central hub for lost and found items on campus. Reconnect with your belongings quickly and easily.
            </p>
            <div className="flex justify-center gap-4">
              <Button size="lg" asChild className="bg-accent hover:bg-accent/90 text-white">
                <Link href="/report">Report a Found Item</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/report">Report a Lost Item</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 lg:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-center font-headline mb-12">How It Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center bg-card shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-primary/20 rounded-full p-3 w-fit">
                    <University className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Report an Item</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Quickly submit a report for any item you've lost or found on campus through a simple form.</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-primary/20 rounded-full p-3 w-fit">
                    <Search className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Search & Filter</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Browse all reported items. Use powerful search and filters to find what you're looking for.</p>
                </CardContent>
              </Card>
              <Card className="text-center bg-card shadow-lg">
                <CardHeader>
                  <div className="mx-auto bg-primary/20 rounded-full p-3 w-fit">
                    <Package className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="font-headline mt-4">Get Reunited</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our system helps connect finders with owners to facilitate a happy reunion with your items.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-muted-foreground">
          <p className="text-sm">&copy; {new Date().getFullYear()} CampusFind. All rights reserved.</p>
          <div className="flex items-center gap-4 mt-4 sm:mt-0">
            <Link href="https://github.com/rubulhoquechoudhury/gdgoncampus-assignment" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
