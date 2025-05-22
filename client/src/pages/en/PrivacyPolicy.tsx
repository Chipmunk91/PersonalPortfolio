import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function EnglishPrivacyPolicy() {
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
                Privacy Policy
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

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Introduction</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  This Privacy Policy explains how Hiroshi.dev ("we", "our", or "us") collects, uses, and protects your 
                  personal information when you visit our website. We respect your privacy and are committed to protecting 
                  your personal data.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Information We Collect</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">Personal information (such as name and email address) that you voluntarily provide when contacting us or subscribing to our newsletter.</li>
                  <li className="mb-2">Technical data, including IP address, browser type and version, time zone setting, browser plug-in types and versions, and operating system.</li>
                  <li className="mb-2">Usage data about how you use our website, including page views, navigation paths, and interaction with features.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">How We Use Your Information</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">To provide and maintain our website.</li>
                  <li className="mb-2">To communicate with you, including responding to inquiries and sending newsletters.</li>
                  <li className="mb-2">To analyze and improve our website's performance and user experience.</li>
                  <li className="mb-2">To comply with legal obligations.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Data Security</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We implement appropriate security measures to protect your personal information from unauthorized access, 
                  alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic 
                  storage is 100% secure, and we cannot guarantee absolute security.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Your Rights</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Depending on your location, you may have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">The right to access your personal data.</li>
                  <li className="mb-2">The right to correct inaccurate or incomplete data.</li>
                  <li className="mb-2">The right to request deletion of your personal data.</li>
                  <li className="mb-2">The right to restrict or object to processing of your personal data.</li>
                  <li className="mb-2">The right to data portability.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Changes to This Policy</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We may update this Privacy Policy from time to time. Any changes will be posted on this page, and the 
                  "Last updated" date will be revised accordingly. We encourage you to review this Privacy Policy periodically.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Contact Us</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  Email: privacy@hiroshi.dev
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