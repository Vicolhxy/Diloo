import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Navigation() {
  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10"
      data-testid="nav-bar"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home">
            <div className="flex items-center gap-2 cursor-pointer hover-elevate rounded-lg px-3 py-2 -ml-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-white font-bold text-xl">
                D
              </div>
              <span className="text-white font-semibold text-lg hidden sm:inline">DILOO</span>
            </div>
          </Link>

          <Button 
            variant="default"
            className="bg-primary text-white hover:bg-primary/90"
            data-testid="button-get-started"
          >
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
