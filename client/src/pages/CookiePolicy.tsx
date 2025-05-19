import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function CookiePolicy() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Cookie Policy</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              Last updated: May 19, 2025
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">What Are Cookies</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Cookies are small pieces of text sent to your web browser by a website you visit. A cookie file is stored 
              in your web browser and allows the website or a third-party to recognize you and make your next visit 
              easier and more useful to you.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">How We Use Cookies</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">
                <strong>Essential Cookies:</strong> These cookies are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.
              </li>
              <li className="mb-2">
                <strong>Preference Cookies:</strong> These cookies allow us to remember choices you make (such as your preferred language or the region you are in) and provide enhanced, more personal features.
              </li>
              <li className="mb-2">
                <strong>Analytics Cookies:</strong> These cookies collect information about how visitors use our website, which pages they visited, and if they get error messages from web pages. These cookies don't collect information that identifies a visitor.
              </li>
              <li className="mb-2">
                <strong>Marketing Cookies:</strong> These cookies are used to track visitors across websites. They are used to display ads that are relevant and engaging for the individual user.
              </li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Types of Cookies We Use</h2>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Session Cookies</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Session cookies are temporary cookies that are used to remember you during the course of your visit to the website, 
                and they expire when you close the web browser.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Persistent Cookies</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Persistent cookies are used to remember your preferences within our website and remain on your desktop or mobile 
                device even after you close your browser or restart your computer. They ensure a consistent and efficient experience 
                for you while visiting our website.
              </p>
              
              <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">Third-Party Cookies</h3>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                In addition to our own cookies, we may also use various third-party cookies to report usage statistics, 
                deliver advertisements, and so on.
              </p>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Managing Cookies</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, 
              including how to see what cookies have been set, visit <a href="https://www.allaboutcookies.org" className="text-primary-600 dark:text-primary-400 hover:underline">www.allaboutcookies.org</a>.
            </p>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies. 
              If you disable or refuse cookies, please note that some parts of this website may become inaccessible or not function properly.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Changes to This Cookie Policy</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              We may update our Cookie Policy from time to time. We will notify you of any changes by posting the new 
              Cookie Policy on this page and updating the "Last updated" date at the top.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Contact Us</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              If you have any questions about our Cookie Policy, please contact us at:
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: cookies@hiroshi.dev
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}