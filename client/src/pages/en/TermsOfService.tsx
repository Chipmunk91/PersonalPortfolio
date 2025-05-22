import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function EnglishTermsOfService() {
  const { i18n } = useTranslation();
  
  // Ensure we're using English
  useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 pt-28 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.h1 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Terms of Service
              </motion.h1>

              <motion.div 
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  Last updated: May 19, 2025
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  By accessing or using Hiroshi.dev ("the Website"), you agree to be bound by these Terms of Service ("Terms").
                  If you do not agree to these Terms, please do not use the Website.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">2. Changes to Terms</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to the Website.
                  Your continued use of the Website after any changes constitutes your acceptance of the new Terms.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">3. Use of the Website</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  You may use the Website for lawful purposes only. You are prohibited from:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">Using the Website in any way that violates any applicable laws or regulations.</li>
                  <li className="mb-2">Attempting to gain unauthorized access to any portion of the Website or any systems or networks connected to the Website.</li>
                  <li className="mb-2">Engaging in any conduct that restricts or inhibits anyone's use or enjoyment of the Website.</li>
                  <li className="mb-2">Using the Website to transmit any malware, viruses, or other malicious code.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">4. Intellectual Property</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  All content on the Website, including but not limited to text, graphics, logos, images, and software, is the property of 
                  Hiroshi.dev or its content suppliers and is protected by international copyright and intellectual property laws.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">5. User Content</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  By submitting any content to the Website (e.g., via contact forms or comments), you grant Hiroshi.dev a non-exclusive, 
                  royalty-free, perpetual, and worldwide license to use, modify, publicly display, reproduce, and distribute such content 
                  on and through the Website.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">6. Disclaimers</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  The Website is provided "as is" and "as available" without any warranties of any kind, express or implied.
                  We do not guarantee that the Website will be error-free, secure, or always available.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">7. Limitation of Liability</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  To the fullest extent permitted by law, Hiroshi.dev shall not be liable for any indirect, incidental, special, 
                  consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, 
                  arising from your use of the Website.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">8. Governing Law</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  These Terms shall be governed by and construed in accordance with the laws of Japan, without regard to its 
                  conflict of law provisions.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">9. Contact Us</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Email: legal@hiroshi.dev
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}