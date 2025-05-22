import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function EnglishCookiePolicy() {
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
                Cookie Policy
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

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">What Are Cookies</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Cookies are small text files that are placed on your computer or mobile device when you visit a website. 
                  Cookies are widely used by website owners to make their websites work, or to work more efficiently, 
                  as well as to provide reporting information.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">How We Use Cookies</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Hiroshi.dev uses cookies for several purposes, including:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2"><strong>Essential cookies:</strong> These are necessary for the website to function properly and cannot be switched off in our systems.</li>
                  <li className="mb-2"><strong>Performance cookies:</strong> These help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                  <li className="mb-2"><strong>Functionality cookies:</strong> These enable the website to provide enhanced functionality and personalization, such as remembering your preferences.</li>
                  <li className="mb-2"><strong>Targeting cookies:</strong> These may be set through our site by our advertising partners to build a profile of your interests.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Types of Cookies We Use</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We use the following types of cookies on our website:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2"><strong>Session cookies:</strong> These temporary cookies expire when you close your browser.</li>
                  <li className="mb-2"><strong>Persistent cookies:</strong> These remain on your device until they expire or you delete them.</li>
                  <li className="mb-2"><strong>First-party cookies:</strong> These are set by the website you are visiting.</li>
                  <li className="mb-2"><strong>Third-party cookies:</strong> These are set by a domain other than the one you are visiting.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Managing Cookies</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Most web browsers allow some control of most cookies through the browser settings. To find out more 
                  about cookies, including how to see what cookies have been set, visit 
                  <a href="https://www.aboutcookies.org" className="text-blue-600 dark:text-blue-400 hover:underline"> www.aboutcookies.org</a>.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  You can set your browser not to accept cookies, and the above website tells you how to remove cookies 
                  from your browser. However, in a few cases, some of our website features may not function as a result.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Changes to Our Cookie Policy</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  We may update our Cookie Policy from time to time. Any changes will be posted on this page, and the 
                  "Last updated" date will be revised accordingly. We encourage you to periodically review this Cookie 
                  Policy to stay informed about how we are using cookies.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Contact Us</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  If you have any questions about our Cookie Policy, please contact us at:
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