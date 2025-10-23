import { Link, useLocation } from "wouter";
import dilooLogoOriginal from "@assets/Diloo-logo-original_1761244957235.png";

export default function Navigation() {
  const [location] = useLocation();

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 bg-white/[0.14] backdrop-blur-md border-b border-gray-200/50"
      data-testid="nav-bar"
    >
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-home-logo">
            <div className="flex items-center gap-2 cursor-pointer hover-elevate rounded-lg px-3 py-2 -ml-3">
              <img src={dilooLogoOriginal} alt="Diloo Logo" className="w-8 h-8" data-testid="img-logo-nav" />
              <span className="text-gray-900 font-semibold text-lg hidden sm:inline">Diloo</span>
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
