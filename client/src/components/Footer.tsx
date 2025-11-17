import { Link } from "wouter";
import { Mail } from "lucide-react";
import dilooLogoBlack from "@assets/Logo-long-Black_1763346818703.png";

export default function Footer() {
  return (
    <footer className="w-full bg-primary py-12" data-testid="footer">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          {/* Left Section: Logo & Slogan */}
          <div className="flex flex-col">
            <div className="mb-3">
              <img src={dilooLogoBlack} alt="Diloo Logo" className="h-8 w-auto" data-testid="img-logo" />
            </div>
            <p className="text-gray-900 text-sm mb-4" data-testid="text-footer-slogan">
              Choose your style. Customize every detail.
            </p>
            <p className="text-gray-700 text-sm" data-testid="text-footer-copyright">
              © 2025 Diloo. All rights reserved.
            </p>
          </div>

          {/* Right Section: Legal & Contact */}
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Legal Links */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3" data-testid="text-legal-heading">Legal</h4>
              <div className="flex flex-col gap-2">
                <Link href="/terms">
                  <a className="text-sm text-gray-700 hover:text-gray-900 transition-colors" data-testid="link-terms">
                    Terms & Conditions
                  </a>
                </Link>
                <Link href="/privacy">
                  <a className="text-sm text-gray-700 hover:text-gray-900 transition-colors" data-testid="link-privacy">
                    Privacy Policy
                  </a>
                </Link>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-bold text-gray-900 mb-3" data-testid="text-contact-heading">Contact Us</h4>
              <a 
                href="mailto:info@diloo.ca" 
                className="flex items-center text-sm text-gray-700 hover:text-gray-900 transition-colors"
                data-testid="link-email"
              >
                <Mail className="w-4 h-4 mr-2" />
                info@diloo.ca
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
