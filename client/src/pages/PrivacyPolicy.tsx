import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none">
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
              We may collect the following types of information when you visit our website:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">
                <strong>Contact Information:</strong> If you subscribe to our newsletter or contact us, we may collect your name and email address.
              </li>
              <li className="mb-2">
                <strong>Usage Data:</strong> We collect information about how you interact with our website, including pages visited, time spent on pages, and other similar information.
              </li>
              <li className="mb-2">
                <strong>Technical Data:</strong> We may collect your IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system, and other technology information.
              </li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">How We Use Your Information</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We use the information we collect for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">To provide and maintain our website</li>
              <li className="mb-2">To notify you about changes to our website or services</li>
              <li className="mb-2">To send you our newsletter if you have subscribed</li>
              <li className="mb-2">To respond to your inquiries and provide customer support</li>
              <li className="mb-2">To analyze how users interact with our website to improve functionality and user experience</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Data Security</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We implement appropriate security measures to protect your personal information against unauthorized access, 
              alteration, disclosure, or destruction. However, please note that no method of transmission over the internet 
              or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Third-Party Links</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or 
              content of these websites. We encourage you to read the privacy policies of any third-party websites you visit.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Your Rights</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Depending on your location, you may have certain rights regarding your personal information, including:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">The right to access your personal information</li>
              <li className="mb-2">The right to rectify inaccurate personal information</li>
              <li className="mb-2">The right to erase your personal information</li>
              <li className="mb-2">The right to restrict processing of your personal information</li>
              <li className="mb-2">The right to data portability</li>
              <li className="mb-2">The right to object to the processing of your personal information</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Changes to This Privacy Policy</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Contact Us</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: privacy@hiroshi.dev
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}