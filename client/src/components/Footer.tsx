import dilooLogoLongWhite from "@assets/Logo-long-White_1762393491468.png";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white py-12" data-testid="footer">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="mb-2">
            <img src={dilooLogoLongWhite} alt="Diloo Logo" className="h-8 w-auto" data-testid="img-logo" />
          </div>
          <p className="text-white/90 text-sm mb-6" data-testid="text-footer-slogan">
            Choose your style. Customize every detail.
          </p>
          <p className="text-white/80 text-sm" data-testid="text-footer-copyright">
            © 2025 Diloo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
