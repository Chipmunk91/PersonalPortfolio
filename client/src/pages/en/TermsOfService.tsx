import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';

export default function EnglishTermsOfService() {
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
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="lead">
            These Terms of Service ("Terms") govern your use of our website and services. Please read these Terms carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing this website, you are agreeing to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>

          <h2>2. Use License</h2>
          <p>
            Permission is granted to temporarily view the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
          </p>
          <ul>
            <li>modify or copy the materials;</li>
            <li>use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
            <li>attempt to decompile or reverse engineer any software contained on our website;</li>
            <li>remove any copyright or other proprietary notations from the materials; or</li>
            <li>transfer the materials to another person or "mirror" the materials on any other server.</li>
          </ul>
          <p>
            This license shall automatically terminate if you violate any of these restrictions and may be terminated by us at any time. Upon terminating your viewing of these materials or upon the termination of this license, you must destroy any downloaded materials in your possession whether in electronic or printed format.
          </p>

          <h2>3. User Accounts</h2>
          <p>
            If you create an account on the website, you are responsible for maintaining the security of your account and the confidentiality of your password. You are fully responsible for all activities that occur under your account and any other actions taken in connection with the account.
          </p>
          <p>
            You must immediately notify us of any unauthorized use of your account or any other breaches of security. We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.
          </p>

          <h2>4. Content and Copyright</h2>
          <p>
            All content included on our website, such as text, graphics, logos, images, audio clips, video clips, data compilations, and software, is the property of ours or our content suppliers and protected by international copyright laws.
          </p>
          <p>
            The compilation of all content on this site is the exclusive property of ours and is protected by international copyright laws. All software used on this site is the property of ours or our software suppliers and is protected by international copyright laws.
          </p>

          <h2>5. User Submissions</h2>
          <p>
            By submitting content or information to our website, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, and display such content throughout the world in any media.
          </p>
          <p>
            You represent and warrant that you own or control all the rights to the content you submit, and that the content is accurate, not confidential, and not in violation of any contractual restrictions or other third party rights.
          </p>

          <h2>6. Disclaimer</h2>
          <p>
            The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
          </p>
          <p>
            Further, we do not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on our website or otherwise relating to such materials or on any sites linked to this site.
          </p>

          <h2>7. Limitations</h2>
          <p>
            In no event shall we or our suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.
          </p>

          <h2>8. Revisions and Errata</h2>
          <p>
            The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on this website are accurate, complete, or current. We may make changes to the materials contained on the website at any time without notice. We do not, however, make any commitment to update the materials.
          </p>

          <h2>9. Links</h2>
          <p>
            We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.
          </p>

          <h2>10. Modifications</h2>
          <p>
            We may revise these Terms of Service for our website at any time without notice. By using this website you are agreeing to be bound by the then current version of these Terms of Service.
          </p>

          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed and construed in accordance with applicable laws, without regard to its conflict of law provisions.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us through our contact form.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}