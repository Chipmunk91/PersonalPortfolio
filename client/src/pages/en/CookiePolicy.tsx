import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';

export default function EnglishCookiePolicy() {
  const { i18n } = useTranslation();
  
  // Ensure we're using English
  useEffect(() => {
    if (i18n.language !== 'en') {
      i18n.changeLanguage('en');
    }
  }, [i18n]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">Cookie Policy</h1>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                This Cookie Policy explains how we use cookies and similar technologies on our website.
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">What are cookies?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. They are used to remember your preferences and make the site work efficiently.
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">How we use cookies</h2>
              <p className="text-gray-700 dark:text-gray-300">We use cookies for several purposes, including:</p>
              <ul className="list-disc pl-6 mt-4 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2"><strong>Essential Cookies:</strong> These are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.</li>
                <li className="mb-2"><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
                <li className="mb-2"><strong>Functionality Cookies:</strong> These allow us to remember choices you make and provide enhanced, more personal features.</li>
                <li className="mb-2"><strong>Analytics Cookies:</strong> These help us analyze how users use our website, allowing us to improve its functionality.</li>
              </ul>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Types of cookies we use</h2>
              <ul className="list-disc pl-6 mt-4 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2"><strong>Session Cookies:</strong> These are temporary and expire when you close your browser.</li>
                <li className="mb-2"><strong>Persistent Cookies:</strong> These remain on your device until you delete them or they expire.</li>
                <li className="mb-2"><strong>First-Party Cookies:</strong> These are set by our website.</li>
                <li className="mb-2"><strong>Third-Party Cookies:</strong> These are set by our partners and service providers.</li>
              </ul>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Managing cookies</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The Help function in your browser should explain how.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                If you disable cookies, please note that some parts of our site may not function properly.
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Changes to this policy</h2>
              <p className="text-gray-700 dark:text-gray-300">
                We may update our Cookie Policy from time to time. Any changes will be posted on this page and, where appropriate, notified to you.
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Contact us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have any questions about our use of cookies, please contact us through our contact form.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}