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
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="lead">
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. We reserve the right to make changes to this Privacy Policy at any time and for any reason.
          </p>

          <h2>Collection of Your Information</h2>
          <p>We may collect information about you in a variety of ways, including:</p>
          <h3>Personal Data</h3>
          <p>
            While using our website, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
          </p>
          <ul>
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
            <li>Address, State, Province, ZIP/Postal code, City</li>
          </ul>

          <h3>Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access our website, such as your IP address, browser type, operating system, access times, and the pages you have viewed.
          </p>

          <h3>Data From Contests and Giveaways</h3>
          <p>
            Personal and other information you may provide when entering contests or giveaways or responding to surveys.
          </p>

          <h2>Use of Your Information</h2>
          <p>Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:</p>
          <ul>
            <li>Create and manage your account.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the website.</li>
            <li>Increase the efficiency and operation of the website.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the website.</li>
            <li>Notify you of updates to the website.</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            <li>Request feedback and contact you about your use of the website.</li>
            <li>Resolve disputes and troubleshoot problems.</li>
          </ul>

          <h2>Disclosure of Your Information</h2>
          <p>We may share information we have collected about you in certain situations. Your information may be disclosed as follows:</p>

          <h3>By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
          </p>

          <h3>Third-Party Service Providers</h3>
          <p>
            We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
          </p>

          <h3>Marketing Communications</h3>
          <p>
            With your consent, or with an opportunity for you to withdraw consent, we may share your information with third parties for marketing purposes.
          </p>

          <h2>Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2>Options Regarding Your Information</h2>
          <h3>Account Information</h3>
          <p>
            You may at any time review or change the information in your account by:
          </p>
          <ul>
            <li>Logging into your account settings and updating your account</li>
            <li>Contacting us using the contact information provided below</li>
          </ul>

          <h3>Emails and Communications</h3>
          <p>
            If you no longer wish to receive correspondence, emails, or other communications from us, you may opt-out by:
          </p>
          <ul>
            <li>Clicking the unsubscribe link in our emails</li>
            <li>Contacting us using the contact information provided below</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us through our contact form.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}