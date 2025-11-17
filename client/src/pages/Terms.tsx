import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function Terms() {
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
              data-testid="text-terms-title"
            >
              Terms & Conditions — DILOO
            </h1>
            
            <p className="text-sm text-gray-600 mb-8">
              <strong>Last Updated:</strong> 2025-11-16
            </p>

            <div className="prose prose-gray max-w-none space-y-6 text-gray-700 leading-relaxed">
              <p>
                Welcome to <strong>DILOO</strong> (operated under the domain <strong>diloo.ca</strong>, "we", "us", or "our").
                By accessing our website or purchasing our AI-generated photo services, you agree to the following Terms & Conditions ("Terms").
                Please read them carefully before using our services.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                1. Service Description
              </h2>
              
              <h3 className="text-xl font-semibold text-black mt-6 mb-2">1.1 What We Provide</h3>
              <p>
                DILOO offers AI-generated photo creation services. Users upload an input image, select their preferred styles or parameters, and after payment, we deliver a high-resolution, watermark-free final image to the email address provided.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">1.2 Completion of Transaction</h3>
              <p>
                Once the final high-resolution image has been successfully delivered to your email, the transaction is considered complete.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                2. Data Storage & Privacy
              </h2>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">2.1 Storage Period</h3>
              <p>
                We store uploaded and generated images on our servers for <strong>90 days</strong> solely for backup and re-download purposes.
                All images are automatically deleted after the 90-day storage period.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">2.2 Privacy Commitment</h3>
              <p>We <strong>do not</strong>:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>sell, share, or trade your images,</li>
                <li>publish or showcase your images publicly,</li>
                <li>reuse your images for training or promotional purposes.</li>
              </ul>
              <p>Your content remains <strong>fully private</strong>.</p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">2.3 Data Protection</h3>
              <p>
                We protect your personal information in compliance with applicable <strong>Canadian privacy laws</strong>, including secure handling of email addresses, upload data, and payment-related information.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                3. Ownership & Usage Rights
              </h2>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">3.1 Ownership of Uploaded Content</h3>
              <p>You retain full ownership of all photos or content you upload to DILOO.</p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">3.2 License to Generated Images</h3>
              <p>
                Upon purchase, you receive full usage rights to the final generated images.
                You may save, display, print, or use them commercially, provided all use complies with applicable laws.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">3.3 Prohibited Uses</h3>
              <p>You may not use generated images in ways that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>violate laws or regulations,</li>
                <li>infringe on third-party rights,</li>
                <li>mislead, harm, or defraud others.</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                4. Refund Policy
              </h2>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">4.1 Refund Window</h3>
              <p>You may request a refund within <strong>7 days</strong> of your purchase.</p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">4.2 Refund Limitations</h3>
              <p>Refunds will <strong>not</strong> be issued after the 7-day period has passed.</p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">4.3 Refund Method</h3>
              <p>Approved refunds will be issued to the original payment method only.</p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                5. Disclaimers
              </h2>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">5.1 No Guarantee of Suitability</h3>
              <p>
                We do not guarantee that generated images meet the requirements for official or specialized use (e.g., passports, visas, government IDs, workplace verification).
                Users must verify suitability before use.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">5.2 User Responsibility</h3>
              <p>
                You assume full responsibility for how the images are used.
                We are not liable for rejections, losses, or disputes arising from use of the generated content.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                6. Limitation of Liability
              </h2>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">6.1 Maximum Liability</h3>
              <p>
                To the fullest extent permitted by law, DILOO's total liability for any direct damages is limited to the amount you paid for the service.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">6.2 Indemnification</h3>
              <p>You agree to indemnify and hold DILOO harmless from any claims arising from:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>misuse of the service,</li>
                <li>legal violations, or</li>
                <li>breach of these Terms.</li>
              </ul>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                7. Age Requirement
              </h2>
              <p>
                You must be <strong>13 years or older</strong> to use our services.
                If under 13, a parent or guardian must provide consent and act on your behalf.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                8. Governing Law & Dispute Resolution
              </h2>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">8.1 Applicable Law</h3>
              <p>
                These Terms are governed by the laws of <strong>Canada</strong>, without regard to conflict-of-law rules.
              </p>

              <h3 className="text-xl font-semibold text-black mt-6 mb-2">8.2 Dispute Resolution</h3>
              <p>
                If a dispute cannot be resolved through communication, it shall be submitted to the competent courts in the Canadian jurisdiction where DILOO operates.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                9. Changes to Terms
              </h2>
              <p>
                We may update these Terms at any time.
                Updates will be posted on <strong>diloo.ca</strong>.
                Continued use of the website or services after updates constitutes acceptance of the revised Terms.
              </p>

              <h2 className="text-2xl font-bold text-black mt-12 mb-4" style={{fontFamily: 'Hanuman, serif'}}>
                10. Contact Information
              </h2>
              <p>
                For questions, refund requests, or data deletion inquiries, please contact us:
              </p>
              <p className="font-semibold">
                Email: info@diloo.ca
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
