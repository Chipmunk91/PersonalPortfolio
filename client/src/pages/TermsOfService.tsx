import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsOfService() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Last updated: May 19, 2025
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Introduction</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Welcome to Hiroshi.dev. These Terms of Service ("Terms") govern your use of our website and services. 
              By accessing or using our website, you agree to be bound by these Terms. If you disagree with any part of 
              the Terms, you may not access our website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Intellectual Property</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              The content on this website, including but not limited to text, images, graphics, code, and design, 
              is owned by or licensed to Hiroshi.dev and is protected by copyright, trademark, and other intellectual 
              property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, 
              publicly perform, republish, download, store, or transmit any of the material on our website without our 
              prior written consent.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">User Contributions</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Any content you submit to our website, such as comments or messages, may be used by us for any purpose 
              consistent with our Privacy Policy. You retain ownership of your content, but grant us a non-exclusive, 
              royalty-free, perpetual, irrevocable, and fully sublicensable right to use, reproduce, modify, adapt, 
              publish, translate, create derivative works from, distribute, and display such content throughout the world 
              in any media.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Prohibited Uses</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              You agree not to use our website:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">In any way that violates any applicable federal, state, local, or international law or regulation</li>
              <li className="mb-2">To transmit any material that is defamatory, obscene, indecent, abusive, offensive, harassing, or otherwise objectionable</li>
              <li className="mb-2">To impersonate or attempt to impersonate us, our employees, another user, or any other person or entity</li>
              <li className="mb-2">To engage in any other conduct that restricts or inhibits anyone's use or enjoyment of the website</li>
              <li className="mb-2">To attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of the website</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Disclaimer of Warranties</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Your use of our website and services is at your sole risk. Our website and services are provided on an "AS IS" 
              and "AS AVAILABLE" basis, without warranties of any kind, either express or implied. We do not guarantee that 
              our website will be secure or free from errors or viruses.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Limitation of Liability</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              To the fullest extent permitted by applicable law, in no event will we be liable for any damages arising out 
              of or in connection with your use of our website or services. This includes, but is not limited to, direct, 
              indirect, consequential, incidental, and punitive damages.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Indemnification</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              You agree to defend, indemnify, and hold us harmless from and against any claims, liabilities, damages, 
              judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these 
              Terms or your use of the website.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Changes to the Terms</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We may revise and update these Terms from time to time at our sole discretion. All changes are effective 
              immediately when we post them. Your continued use of the website following the posting of revised Terms 
              means that you accept and agree to the changes.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Contact Us</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: terms@hiroshi.dev
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}