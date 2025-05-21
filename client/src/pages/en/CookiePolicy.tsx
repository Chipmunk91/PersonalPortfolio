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
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Cookie Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="lead">
            This Cookie Policy explains how we use cookies and similar technologies on our website.
          </p>

          <h2>What are cookies?</h2>
          <p>
            Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. They are used to remember your preferences and make the site work efficiently.
          </p>

          <h2>How we use cookies</h2>
          <p>We use cookies for several purposes, including:</p>
          <ul>
            <li><strong>Essential Cookies:</strong> These are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.</li>
            <li><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
            <li><strong>Functionality Cookies:</strong> These allow us to remember choices you make and provide enhanced, more personal features.</li>
            <li><strong>Analytics Cookies:</strong> These help us analyze how users use our website, allowing us to improve its functionality.</li>
          </ul>

          <h2>Types of cookies we use</h2>
          <ul>
            <li><strong>Session Cookies:</strong> These are temporary and expire when you close your browser.</li>
            <li><strong>Persistent Cookies:</strong> These remain on your device until you delete them or they expire.</li>
            <li><strong>First-Party Cookies:</strong> These are set by our website.</li>
            <li><strong>Third-Party Cookies:</strong> These are set by our partners and service providers.</li>
          </ul>

          <h2>Managing cookies</h2>
          <p>
            Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. The Help function in your browser should explain how.
          </p>
          <p>
            If you disable cookies, please note that some parts of our site may not function properly.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update our Cookie Policy from time to time. Any changes will be posted on this page and, where appropriate, notified to you.
          </p>

          <h2>Contact us</h2>
          <p>
            If you have any questions about our use of cookies, please contact us through our contact form.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}