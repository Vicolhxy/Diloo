import dilooLogo from "@assets/Diloo-logo_1761159003004.png";

export default function Footer() {
  return (
    <footer className="w-full bg-primary text-white py-12" data-testid="footer">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-3 mb-2">
            <img src={dilooLogo} alt="Diloo Logo" className="w-12 h-12" data-testid="img-logo" />
            <h3 className="text-2xl md:text-3xl font-bold" data-testid="text-footer-brand">
              DILOO
            </h3>
          </div>
          <p className="text-white/90 text-sm mb-6" data-testid="text-footer-slogan">
            Expert-crafted AI styles. Always on trend.
          </p>
          <p className="text-white/80 text-sm" data-testid="text-footer-copyright">
            © 2025 Diloo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
