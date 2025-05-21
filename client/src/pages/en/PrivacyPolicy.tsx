import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';

export default function EnglishPrivacyPolicy() {
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
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">Privacy Policy</h1>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. We reserve the right to make changes to this Privacy Policy at any time and for any reason.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Collection of Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300">We may collect information about you in a variety of ways, including:</p>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Personal Data</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                While using our website, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Email address</li>
                <li className="mb-2">First name and last name</li>
                <li className="mb-2">Phone number</li>
                <li className="mb-2">Address, State, Province, ZIP/Postal code, City</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Derivative Data</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Information our servers automatically collect when you access our website, such as your IP address, browser type, operating system, access times, and the pages you have viewed.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Data From Contests and Giveaways</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Personal and other information you may provide when entering contests or giveaways or responding to surveys.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Use of Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:</p>
              <ul className="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Create and manage your account.</li>
                <li className="mb-2">Email you regarding your account or order.</li>
                <li className="mb-2">Fulfill and manage purchases, orders, payments, and other transactions related to the website.</li>
                <li className="mb-2">Increase the efficiency and operation of the website.</li>
                <li className="mb-2">Monitor and analyze usage and trends to improve your experience with the website.</li>
                <li className="mb-2">Notify you of updates to the website.</li>
                <li className="mb-2">Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
                <li className="mb-2">Request feedback and contact you about your use of the website.</li>
                <li className="mb-2">Resolve disputes and troubleshoot problems.</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Disclosure of Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">By Law or to Protect Rights</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Third-Party Service Providers</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Marketing Communications</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Security of Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
              </p>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Options Regarding Your Information</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Account Information</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                You may at any time review or change the information in your account by:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Logging into your account settings and updating your account</li>
                <li className="mb-2">Contacting us using the contact information provided below</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Emails and Communications</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:
              </p>
              <ul className="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">Clicking the unsubscribe link in our emails</li>
                <li className="mb-2">Contacting us using the contact information provided below</li>
              </ul>

              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300">
                If you have questions or comments about this Privacy Policy, please contact us through our contact form.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}