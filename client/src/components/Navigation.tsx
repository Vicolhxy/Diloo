import { Link, useLocation } from "wouter";
import dilooLogoLong from "@assets/Logo-long_1762134766829.png";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav 
      className="w-full bg-white border-b border-gray-200"
      data-testid="nav-bar"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home-logo">
            <div className="cursor-pointer hover-elevate rounded-lg px-3 py-2 -ml-3">
              <img src={dilooLogoLong} alt="Diloo Logo" className="h-8" data-testid="img-logo-nav" />
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link 
              href="/" 
              data-testid="link-nav-home"
              className={`text-sm font-medium cursor-pointer transition-colors inline-block ${
                location === "/" 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Home
            </Link>
            <Link 
              href="/feedback" 
              data-testid="link-nav-feedback"
              className={`text-sm font-medium cursor-pointer transition-colors inline-block ${
                location === "/feedback"
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
