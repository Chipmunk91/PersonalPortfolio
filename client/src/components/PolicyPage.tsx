import React, { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { getLocalePageContent } from '@/lib/localeText';

interface PolicyPageProps {
  pageKey: 'privacy-policy' | 'cookie-policy' | 'terms-of-service';
  language: string;
}

/**
 * A reusable policy page component that handles the common structure for 
 * policy pages (Privacy Policy, Cookie Policy, Terms of Service)
 * while pulling content from our centralized locale repository
 */
export function PolicyPage({ pageKey, language }: PolicyPageProps) {
  const { i18n } = useTranslation();
  
  // Ensure we're using the correct language
  useEffect(() => {
    if (language && i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [i18n, language]);

  // Get the localized content for this page
  const pageContent = getLocalePageContent(pageKey, language);
  
  if (!pageContent) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Content Not Found</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sorry, this content is not available in this language.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Build the policy page content based on the locale data
  const renderPolicyContent = () => {
    switch (pageKey) {
      case 'privacy-policy':
        return renderPrivacyPolicy();
      case 'cookie-policy':
        return renderCookiePolicy();
      case 'terms-of-service':
        return renderTermsOfService();
      default:
        return <p>Content not available</p>;
    }
  };

  // Render template for Privacy Policy
  const renderPrivacyPolicy = () => {
    return (
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {pageContent.sections.intro}
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Collection of Your Information' : 
           language === 'ja' ? '情報の収集' : '개인정보 수집'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.collection}</p>
        
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">
          {language === 'en' ? 'Personal Data' : 
           language === 'ja' ? '個人データ' : '개인 데이터'}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.personalData}</p>
        <ul className="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
          <li className="mb-2">{language === 'en' ? 'Email address' : 
                              language === 'ja' ? 'メールアドレス' : '이메일 주소'}</li>
          <li className="mb-2">{language === 'en' ? 'First name and last name' : 
                              language === 'ja' ? '氏名' : '이름과 성'}</li>
          <li className="mb-2">{language === 'en' ? 'Phone number' : 
                              language === 'ja' ? '電話番号' : '전화번호'}</li>
          <li className="mb-2">{language === 'en' ? 'Address, State, Province, ZIP/Postal code, City' : 
                              language === 'ja' ? '住所、都道府県、郵便番号、市区町村' : 
                                                 '주소, 시/도, 우편번호, 도시'}</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Use of Your Information' : 
           language === 'ja' ? 'お客様の情報の使用' : '개인정보 사용'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.use}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Disclosure of Your Information' : 
           language === 'ja' ? '情報の開示' : '개인정보 공개'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.disclosure}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Security of Your Information' : 
           language === 'ja' ? 'お客様の情報のセキュリティ' : '개인정보 보안'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.security}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Options Regarding Your Information' : 
           language === 'ja' ? 'お客様の情報に関するオプション' : '개인정보 관련 옵션'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.options}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Contact Us' : 
           language === 'ja' ? 'お問い合わせ' : '문의하기'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{pageContent.sections.contact}</p>
        
        {pageContent.metadata?.lastUpdated && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Last updated: ' : 
               language === 'ja' ? '最終更新日: ' : '마지막 업데이트: '}
              {pageContent.metadata.lastUpdated}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Render template for Cookie Policy
  const renderCookiePolicy = () => {
    return (
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {pageContent.sections.intro}
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'What are cookies?' : 
           language === 'ja' ? 'クッキーとは何ですか？' : '쿠키란 무엇인가요?'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.whatAreCookies}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'How we use cookies' : 
           language === 'ja' ? 'クッキーの使用方法' : '쿠키 사용 방법'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.howWeUse}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Types of cookies we use' : 
           language === 'ja' ? '使用しているクッキーの種類' : '사용하는 쿠키 유형'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.types}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Managing cookies' : 
           language === 'ja' ? 'クッキーの管理' : '쿠키 관리'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.managing}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Changes to this policy' : 
           language === 'ja' ? 'このポリシーの変更' : '정책 변경'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.changes}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Contact us' : 
           language === 'ja' ? 'お問い合わせ' : '문의하기'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{pageContent.sections.contact}</p>
        
        {pageContent.metadata?.lastUpdated && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Last updated: ' : 
               language === 'ja' ? '最終更新日: ' : '마지막 업데이트: '}
              {pageContent.metadata.lastUpdated}
            </p>
          </div>
        )}
      </div>
    );
  };

  // Render template for Terms of Service
  const renderTermsOfService = () => {
    return (
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
          {pageContent.sections.intro}
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? '1. Acceptance of Terms' : 
           language === 'ja' ? '1. 規約の受諾' : '1. 약관 수락'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.acceptance}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? '2. Use License' : 
           language === 'ja' ? '2. 使用許諾' : '2. 이용 허가'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.useLicense}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? '3. User Accounts' : 
           language === 'ja' ? '3. ユーザーアカウント' : '3. 사용자 계정'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.accounts}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? '4. Content and Copyright' : 
           language === 'ja' ? '4. コンテンツと著作権' : '4. 콘텐츠 및 저작권'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">{pageContent.sections.content}</p>

        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">
          {language === 'en' ? 'Contact Us' : 
           language === 'ja' ? 'お問い合わせ' : '문의하기'}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{pageContent.sections.contact}</p>
        
        {pageContent.metadata?.lastUpdated && (
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {language === 'en' ? 'Last updated: ' : 
               language === 'ja' ? '最終更新日: ' : '마지막 업데이트: '}
              {pageContent.metadata.lastUpdated}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
            {pageContent.title}
          </h1>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
            {renderPolicyContent()}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}