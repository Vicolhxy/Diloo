import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <Navigation />
      
      <div className="pt-24 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-white rounded-2xl p-8 md:p-12">
            <h1 
              className="text-3xl md:text-4xl font-bold text-black mb-6"
              style={{fontFamily: 'Hanuman, serif'}}
              data-testid="text-privacy-title"
            >
              Privacy Policy — DILOO
            </h1>
            
            <p className="text-sm text-gray-600 mb-8">
              <strong>Last Updated:</strong> 2025-11-16
            </p>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
              <p>
                At <strong>DILOO</strong> ("we", "us", or "our"), your privacy and data protection are our highest priority.
                This Privacy Policy explains what data we collect, how we use it, how we protect it, and what rights you have.
                This policy applies to all services offered under <strong>diloo.ca</strong>.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                1. Information We Collect
              </h2>
              
              <p>We only collect information necessary to deliver our services.</p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">1.1 Personal Information</h3>
              <p>When you use our services, we may collect:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Email address</strong> (to deliver your final HD image)</li>
                <li><strong>Payment-related information</strong> (processed securely by third-party payment providers; we do not store full card details)</li>
                <li><strong>Uploaded photos</strong>, including images you choose to process on our platform</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">1.2 Automatically Collected Data</h3>
              <p>We may collect anonymized usage data such as:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Device type</li>
                <li>Browser information</li>
                <li>Pages visited</li>
                <li>General behavior analytics (non-personal)</li>
              </ul>
              <p>This information cannot identify you personally.</p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                2. How We Use Your Information
              </h2>

              <p>Your data is used strictly for delivering and improving our services.</p>
              <p>We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Process your uploaded image</li>
                <li>Generate and deliver your high-resolution result</li>
                <li>Send essential service-related emails (e.g., delivery notification)</li>
                <li>Improve website performance and functionality</li>
                <li>Handle support or refund requests</li>
              </ul>

              <p>We <strong>do not</strong> use your images or personal data for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Advertising</li>
                <li>AI training</li>
                <li>Public display</li>
                <li>Sharing or selling to third parties (except essential service providers)</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                3. Image Storage and Deletion
              </h2>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">3.1 Image Retention</h3>
              <p>
                Uploaded and generated images are stored securely on our servers for <strong>90 days</strong>.
              </p>
              <p>This allows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Re-delivery if your email fails</li>
                <li>Customer support requests</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">3.2 Automatic Deletion</h3>
              <p>All images are <strong>automatically deleted after 90 days</strong>.</p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">3.3 No Secondary Use</h3>
              <p>Your photos are <strong>never reused</strong>, sold, published, or used to train models.</p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                4. Sharing Your Data
              </h2>

              <p>We only share information with trusted third parties necessary to operate our service:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Payment processors</strong> (for secure payment completion)</li>
                <li><strong>Cloud hosting providers</strong> (for processing and temporary storage)</li>
                <li><strong>Email delivery services</strong> (for sending your HD image)</li>
              </ul>

              <p>These partners are contractually required to follow strict data protection practices.</p>
              <p>We do <strong>not</strong> share personal data with advertisers or data brokers.</p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                5. Legal Basis & Compliance
              </h2>

              <p>We comply with all applicable <strong>Canadian privacy laws</strong>, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>PIPEDA (Personal Information Protection and Electronic Documents Act)</li>
                <li>Provincial privacy regulations where applicable</li>
              </ul>
              <p>We also follow industry-standard security practices to protect your data.</p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                6. Your Rights
              </h2>

              <p>Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent</li>
                <li>Request data portability</li>
                <li>Object to certain data processing activities</li>
              </ul>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">6.1 How to Make a Request</h3>
              <p>You can exercise your rights at any time by contacting:</p>
              <p className="font-semibold">info@diloo.ca</p>
              <p>We will respond within a reasonable time frame and in accordance with Canadian law.</p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                7. Data Security
              </h2>

              <p>We implement strict security measures to protect your information, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encrypted data transfer (HTTPS/TLS)</li>
                <li>Secure, access-controlled storage</li>
                <li>Limited employee access to personal data</li>
                <li>Industry-standard server protection</li>
              </ul>
              <p>No method of transmission is 100% secure, but we make every reasonable effort to safeguard your data.</p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                8. Cookies
              </h2>

              <p>We use minimal cookies and tracking technologies.</p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">8.1 Essential Cookies</h3>
              <p>Required for website functionality.</p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">8.2 Optional/Analytics Cookies</h3>
              <p>Used only with user consent for improving performance. You may decline non-essential cookies at any time.</p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                9. Third-Party Services
              </h2>

              <p>
                Our service may include links to external sites or tools.
                We are not responsible for their privacy practices.
                We recommend reviewing their policies separately.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                10. Children's Privacy
              </h2>

              <p>
                Our service is not intended for users under <strong>13 years old</strong>.
                If you are under 13, a parent or legal guardian must supervise and approve usage.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                11. Changes to This Policy
              </h2>

              <p>
                We may update this Privacy Policy from time to time.
                Changes will be posted on <strong>diloo.ca</strong>, and continued use of our service constitutes acceptance of the updated policy.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                12. Contact Us
              </h2>

              <p>If you have any questions, concerns, or requests related to privacy, please contact:</p>
              <p className="font-semibold">Email: info@diloo.ca</p>
              <p className="font-semibold">Website: https://www.diloo.ca</p>
              <p>We are committed to keeping your information safe and respecting your privacy.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
