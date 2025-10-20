import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="h-12 w-12 bg-white/20 rounded-md flex items-center justify-center" data-testid="logo-placeholder">
                <div className="text-2xl font-bold">D</div>
              </div>
              <div>
                <h3 className="text-2xl font-bold" data-testid="text-footer-brand">Diloo</h3>
              </div>
            </div>
            <p className="text-sm text-primary-foreground/70 max-w-sm" data-testid="text-footer-slogan">
              让每一张照片都成为艺术
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold mb-4" data-testid="text-footer-product-title">产品</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>
                  <Link href="#styles" className="hover:text-primary-foreground transition-colors" data-testid="link-styles">
                    选择风格
                  </Link>
                </li>
                <li>
                  <Link href="#upload" className="hover:text-primary-foreground transition-colors" data-testid="link-upload">
                    上传照片
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="hover:text-primary-foreground transition-colors" data-testid="link-pricing">
                    价格
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4" data-testid="text-footer-company-title">公司</h4>
              <ul className="space-y-2 text-sm text-primary-foreground/70">
                <li>
                  <Link href="#about" className="hover:text-primary-foreground transition-colors" data-testid="link-about">
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link href="#contact" className="hover:text-primary-foreground transition-colors" data-testid="link-contact">
                    联系我们
                  </Link>
                </li>
                <li>
                  <Link href="#privacy" className="hover:text-primary-foreground transition-colors" data-testid="link-privacy">
                    隐私政策
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 pt-8">
          <p className="text-sm text-primary-foreground/60 text-center" data-testid="text-copyright">
            © 2025 Diloo. 保留所有权利。
          </p>
        </div>
      </div>
    </footer>
  );
}
