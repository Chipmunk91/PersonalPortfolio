/**
 * A flexible system for managing localized text content
 * This works alongside react-i18next but focused on larger content blocks
 */

// Define types for our locale content
export interface LocalePageContent {
  title: string;
  sections: Record<string, string>;
  metadata?: Record<string, any>;
}

// Content repository by page and language
interface ContentRepository {
  [pageKey: string]: {
    [locale: string]: LocalePageContent;
  };
}

// Our centralized content store
const contentRepository: ContentRepository = {
  // Privacy Policy content
  'privacy-policy': {
    'en': {
      title: 'Privacy Policy',
      sections: {
        'intro': 'This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. We reserve the right to make changes to this Privacy Policy at any time and for any reason.',
        'collection': 'We may collect information about you in a variety of ways, including personal data, derivative data, and information from contests and giveaways.',
        'personalData': 'While using our website, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to: email address, name, phone number, and address details.',
        'use': 'Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. We use this information for account management, communications, transaction processing, website improvement, and security.',
        'disclosure': 'We may share information we have collected about you in certain situations. Your information may be disclosed as required by law, to service providers, or for marketing with your consent.',
        'security': 'We use administrative, technical, and physical security measures to help protect your personal information, though no security measures are perfect.',
        'options': 'You may review or change your account information anytime and opt-out of communications through our unsubscribe features or by contacting us.',
        'contact': 'If you have questions or comments about this Privacy Policy, please contact us through our contact form.'
      },
      metadata: {
        lastUpdated: '2023-10-15'
      }
    },
    'ja': {
      title: 'プライバシーポリシー',
      sections: {
        'intro': 'このプライバシーポリシーでは、当社のウェブサイトをご利用いただく際に収集、使用、開示、保護する情報について説明します。このプライバシーポリシーを注意深くお読みください。当社は、いつでも、いかなる理由でもこのプライバシーポリシーを変更する権利を留保します。',
        'collection': '当社は以下のような様々な方法であなたに関する情報を収集することがあります：個人データ、派生データ、およびコンテストやプレゼントからのデータ。',
        'personalData': '当社のウェブサイトをご利用いただく際に、お客様にご連絡やご本人確認のために使用できる個人を特定できる特定の情報の提供をお願いすることがあります。これには、以下の情報が含まれる場合がありますが、これらに限定されません：メールアドレス、氏名、電話番号、住所情報。',
        'use': 'お客様に関する正確な情報を持つことで、スムーズで効率的、かつカスタマイズされた体験を提供することができます。この情報は、アカウント管理、コミュニケーション、取引処理、ウェブサイトの改善、およびセキュリティのために使用されます。',
        'disclosure': '当社はある特定の状況において、お客様について収集した情報を共有することがあります。お客様の情報は、法律で必要とされる場合、サービスプロバイダーに対して、または同意を得てマーケティング目的で開示されることがあります。',
        'security': '当社は、お客様の個人情報を保護するために、管理上、技術上、物理的なセキュリティ対策を講じていますが、完璧なセキュリティ対策はありません。',
        'options': 'お客様はいつでもアカウント情報を確認または変更することができ、当社の配信停止機能を通じて、または当社に連絡することにより、コミュニケーションからオプトアウトすることができます。',
        'contact': 'このプライバシーポリシーに関するご質問やご意見がある場合は、お問い合わせフォームからご連絡ください。'
      },
      metadata: {
        lastUpdated: '2023-10-15'
      }
    },
    'ko': {
      title: '개인정보 처리방침',
      sections: {
        'intro': '이 개인정보 처리방침은 당사 웹사이트를 방문할 때 개인정보를 어떻게 수집, 사용, 공개, 보호하는지 설명합니다. 이 개인정보 처리방침을 주의 깊게 읽어주시기 바랍니다. 당사는 언제든지 어떤 이유로든 이 개인정보 처리방침을 변경할 권리가 있습니다.',
        'collection': '당사는 다음과 같은 다양한 방법으로 귀하에 관한 정보를 수집할 수 있습니다: 개인 데이터, 파생 데이터, 콘테스트 및 경품 응모 데이터.',
        'personalData': '당사의 웹사이트를 사용하는 동안, 귀하에게 연락하거나 식별하는 데 사용할 수 있는 특정 개인 식별 정보를 제공하도록 요청할 수 있습니다. 이는 다음을 포함할 수 있으나 이에 국한되지 않습니다: 이메일 주소, 이름, 전화번호, 주소 정보.',
        'use': '귀하에 관한 정확한 정보를 보유하면 원활하고 효율적이며 맞춤화된 경험을 제공할 수 있습니다. 이 정보는 계정 관리, 커뮤니케이션, 거래 처리, 웹사이트 개선 및 보안을 위해 사용됩니다.',
        'disclosure': '당사는 특정 상황에서 귀하에 관해 수집한 정보를 공유할 수 있습니다. 귀하의 정보는 법률에 의해 요구되는 경우, 서비스 제공업체에게, 또는 귀하의 동의를 얻어 마케팅 목적으로 공개될 수 있습니다.',
        'security': '당사는 귀하의 개인정보를 보호하기 위해 관리적, 기술적, 물리적 보안 조치를 사용하지만, 완벽한 보안 조치는 없습니다.',
        'options': '귀하는 언제든지 계정 정보를 검토하거나 변경할 수 있으며, 당사의 구독 취소 기능을 통해 또는 당사에 연락하여 커뮤니케이션을 거부할 수 있습니다.',
        'contact': '이 개인정보 처리방침에 관한 질문이나 의견이 있으시면, 문의 양식을 통해 연락해 주십시오.'
      },
      metadata: {
        lastUpdated: '2023-10-15'
      }
    }
  },
  
  // Cookie Policy content
  'cookie-policy': {
    'en': {
      title: 'Cookie Policy',
      sections: {
        'intro': 'This Cookie Policy explains how we use cookies and similar technologies on our website.',
        'whatAreCookies': 'Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. They are used to remember your preferences and make the site work efficiently.',
        'howWeUse': 'We use cookies for several purposes, including essential website functions, performance measurement, enhanced functionality, and analytics.',
        'types': 'We use session cookies (temporary), persistent cookies (remain until deleted), first-party cookies (set by us), and third-party cookies (set by our partners).',
        'managing': 'Most web browsers allow you to manage your cookie preferences. You can set your browser to refuse cookies, or to alert you when cookies are being sent. If you disable cookies, some parts of our site may not function properly.',
        'changes': 'We may update our Cookie Policy from time to time. Any changes will be posted on this page and, where appropriate, notified to you.',
        'contact': 'If you have any questions about our use of cookies, please contact us through our contact form.'
      },
      metadata: {
        lastUpdated: '2023-09-20'
      }
    },
    'ja': {
      title: 'クッキーポリシー',
      sections: {
        'intro': 'このクッキーポリシーでは、当社のウェブサイトでクッキーや類似の技術をどのように使用しているかについて説明します。',
        'whatAreCookies': 'クッキーは、ウェブサイト、アプリ、オンラインメディア、広告などによってブラウザやデバイスに保存される小さなテキストファイルです。これらは、お客様の設定を記憶し、サイトを効率的に機能させるために使用されます。',
        'howWeUse': '当社は、必須のウェブサイト機能、パフォーマンス測定、機能の強化、および分析など、いくつかの目的でクッキーを使用しています。',
        'types': '当社は、セッションクッキー（一時的）、永続クッキー（削除されるまで残る）、ファーストパーティークッキー（当社によって設定）、サードパーティークッキー（当社のパートナーによって設定）を使用しています。',
        'managing': 'ほとんどのウェブブラウザでは、クッキーの設定を管理することができます。クッキーを拒否したり、クッキーが送信される際に警告を出すようにブラウザを設定することができます。クッキーを無効にすると、当サイトの一部が正常に機能しなくなる場合があります。',
        'changes': '当社は随時クッキーポリシーを更新することがあります。変更があった場合は、このページに掲載し、適宜お知らせします。',
        'contact': 'クッキーの使用に関するご質問は、お問い合わせフォームからご連絡ください。'
      },
      metadata: {
        lastUpdated: '2023-09-20'
      }
    },
    'ko': {
      title: '쿠키 정책',
      sections: {
        'intro': '이 쿠키 정책은 저희 웹사이트에서 쿠키 및 유사한 기술을 어떻게 사용하는지 설명합니다.',
        'whatAreCookies': '쿠키는 웹사이트, 앱, 온라인 미디어, 광고 등이 사용자의 브라우저나 기기에 저장하는 작은 텍스트 파일입니다. 이는 사용자의 환경 설정을 기억하고 사이트가 효율적으로 작동하도록 돕습니다.',
        'howWeUse': '저희는 필수 웹사이트 기능, 성능 측정, 기능 향상 및 분석 등 여러 목적으로 쿠키를 사용합니다.',
        'types': '저희는 세션 쿠키(임시), 영구 쿠키(삭제될 때까지 유지), 자사 쿠키(저희가 설정), 제3자 쿠키(파트너가 설정)를 사용합니다.',
        'managing': '대부분의 웹 브라우저에서는 쿠키 환경 설정을 관리할 수 있습니다. 쿠키를 거부하거나 쿠키가 전송될 때 알림을 받도록 브라우저를 설정할 수 있습니다. 쿠키를 비활성화하면 사이트의 일부 기능이 제대로 작동하지 않을 수 있습니다.',
        'changes': '저희는 때때로 쿠키 정책을 업데이트할 수 있습니다. 변경 사항이 있으면 이 페이지에 게시하고 적절한 경우 사용자에게 알려드립니다.',
        'contact': '쿠키 사용에 관한 질문이 있으시면 문의 양식을 통해 연락 주시기 바랍니다.'
      },
      metadata: {
        lastUpdated: '2023-09-20'
      }
    }
  },
  
  // Terms of Service content
  'terms-of-service': {
    'en': {
      title: 'Terms of Service',
      sections: {
        'intro': 'These Terms of Service ("Terms") govern your use of our website and services. Please read these Terms carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms.',
        'acceptance': 'By accessing this website, you are agreeing to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.',
        'useLicense': 'Permission is granted to temporarily view the materials on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, with specific restrictions on usage.',
        'accounts': 'If you create an account on the website, you are responsible for maintaining its security and the confidentiality of your password. You are fully responsible for all activities under your account.',
        'content': 'All content on our website is the property of us or our content suppliers and protected by international copyright laws.',
        'userSubmissions': 'By submitting content to our website, you grant us a non-exclusive, worldwide, royalty-free license to use that content in any media.',
        'disclaimer': 'The materials on our website are provided on an \'as is\' basis. We make no warranties, expressed or implied, about the accuracy or reliability of the content.',
        'limitations': 'We shall not be liable for any damages arising from the use or inability to use the materials on our website.',
        'links': 'We have not reviewed all linked sites and are not responsible for their contents.',
        'modifications': 'We may revise these Terms at any time without notice. By using this website, you agree to the current version of these Terms.',
        'governingLaw': 'These Terms shall be governed by applicable laws, without regard to conflict of law provisions.',
        'contact': 'If you have any questions about these Terms, please contact us through our contact form.'
      },
      metadata: {
        lastUpdated: '2023-09-10'
      }
    },
    'ja': {
      title: '利用規約',
      sections: {
        'intro': 'この利用規約（以下「本規約」といいます）は、当社のウェブサイトおよびサービスの利用に適用されます。ウェブサイトへのアクセスまたは利用前に、本規約を注意深くお読みください。サイトの一部にアクセスまたは利用することにより、あなたは本規約に拘束されることに同意したものとみなされます。',
        'acceptance': 'このウェブサイトにアクセスすることにより、あなたはこの利用規約、適用されるすべての法律および規制に拘束されることに同意し、適用される地域の法律の遵守に責任を負うことに同意するものとします。',
        'useLicense': '個人的、非商業的な一時的な閲覧のみを目的として、当社のウェブサイト上の資料を一時的に閲覧することが許可されます。これは権利の譲渡ではなく使用許諾の付与であり、使用に関する特定の制限があります。',
        'accounts': 'ウェブサイト上でアカウントを作成する場合、あなたはアカウントのセキュリティとパスワードの機密性を維持する責任があります。あなたは、アカウントの下で発生するすべての活動に全面的な責任を負います。',
        'content': '当社のウェブサイト上のすべてのコンテンツは、当社またはコンテンツ提供者の財産であり、国際著作権法によって保護されています。',
        'userSubmissions': '当社のウェブサイトにコンテンツを投稿することにより、あなたは当社に非独占的、世界的、ロイヤリティフリーのライセンスを付与し、そのコンテンツをあらゆるメディアで使用する権利を与えます。',
        'disclaimer': '当社のウェブサイト上の資料は「現状のまま」提供されています。当社は、コンテンツの正確性や信頼性について、明示または黙示を問わず、いかなる保証も行いません。',
        'limitations': '当社は、当社のウェブサイト上の資料の使用または使用不能から生じる損害について責任を負いません。',
        'links': '当社は、リンクされているすべてのサイトをレビューしておらず、それらの内容について責任を負いません。',
        'modifications': '当社は、予告なくいつでも本規約を改訂することがあります。このウェブサイトを使用することにより、あなたは現行バージョンの本規約に同意するものとします。',
        'governingLaw': '本規約は、法の抵触に関する規定にかかわらず、適用法に従って解釈されるものとします。',
        'contact': '本規約について質問がある場合は、お問い合わせフォームからご連絡ください。'
      },
      metadata: {
        lastUpdated: '2023-09-10'
      }
    },
    'ko': {
      title: '서비스 이용약관',
      sections: {
        'intro': '이 서비스 이용약관("약관")은 당사 웹사이트 및 서비스 이용에 적용됩니다. 당사 웹사이트에 접속하거나 이용하기 전에 이 약관을 주의 깊게 읽어주시기 바랍니다. 사이트의 어떤 부분에 접속하거나 이용함으로써, 귀하는 이 약관에 구속되는 것에 동의하게 됩니다.',
        'acceptance': '이 웹사이트에 접속함으로써, 귀하는 이 서비스 이용약관, 모든 관련 법률 및 규정에 구속되는 것에 동의하며, 모든 관련 지역 법률을 준수할 책임이 있음에 동의합니다.',
        'useLicense': '개인적, 비상업적 일시적 열람만을 목적으로 당사 웹사이트의 자료를 일시적으로 보는 것이 허가됩니다. 이는 권리의 이전이 아닌 라이선스의 부여이며, 사용에 관한 특정 제한이 있습니다.',
        'accounts': '웹사이트에 계정을 만드는 경우, 귀하는 계정의 보안과 비밀번호의 기밀성을 유지할 책임이 있습니다. 귀하는 계정 하에서 발생하는 모든 활동에 대해 전적인 책임을 집니다.',
        'content': '당사 웹사이트의 모든 콘텐츠는 당사 또는 콘텐츠 공급자의 재산이며 국제 저작권법에 의해 보호됩니다.',
        'userSubmissions': '당사 웹사이트에 콘텐츠를 제출함으로써, 귀하는 당사에 비독점적, 전 세계적, 로열티 없는 라이선스를 부여하여 해당 콘텐츠를 모든 매체에서 사용할 권리를 부여합니다.',
        'disclaimer': '당사 웹사이트의 자료는 \'있는 그대로\' 제공됩니다. 당사는 콘텐츠의 정확성이나 신뢰성에 대해 명시적이든 묵시적이든 어떠한 보증도 하지 않습니다.',
        'limitations': '당사는 당사 웹사이트 자료의 사용 또는 사용 불능으로 인해 발생하는 손해에 대해 책임을 지지 않습니다.',
        'links': '당사는 링크된 모든 사이트를 검토하지 않았으며 해당 내용에 대해 책임을 지지 않습니다.',
        'modifications': '당사는 예고 없이 언제든지 이 약관을 수정할 수 있습니다. 이 웹사이트를 사용함으로써, 귀하는 현재 버전의 약관에 동의하는 것입니다.',
        'governingLaw': '이 약관은 법률 충돌 규정에 관계없이 관련 법률에 따라 해석됩니다.',
        'contact': '이 약관에 관한 질문이 있으시면, 문의 양식을 통해 연락해 주십시오.'
      },
      metadata: {
        lastUpdated: '2023-09-10'
      }
    }
  }
};

/**
 * Get localized text content for a specific page
 * @param pageKey - Key identifier for the page (e.g., 'privacy-policy')
 * @param locale - Language code (e.g., 'en', 'ja', 'ko')
 * @param fallbackLocale - Fallback language code if requested locale is not available
 * @returns The page content or null if not found
 */
export function getLocalePageContent(
  pageKey: string, 
  locale: string, 
  fallbackLocale: string = 'en'
): LocalePageContent | null {
  // Check if pageKey exists
  if (!contentRepository[pageKey]) {
    console.warn(`No content found for page ${pageKey}`);
    return null;
  }
  
  // Check if locale exists for this page
  if (contentRepository[pageKey][locale]) {
    return contentRepository[pageKey][locale];
  }
  
  // Fall back to fallbackLocale if specified locale is not available
  if (contentRepository[pageKey][fallbackLocale]) {
    console.warn(`Falling back to ${fallbackLocale} for page ${pageKey}`);
    return contentRepository[pageKey][fallbackLocale];
  }
  
  console.warn(`No content found for page ${pageKey} in locale ${locale} or fallback ${fallbackLocale}`);
  return null;
}

/**
 * Get a specific section from localized page content
 * @param pageKey - Key identifier for the page
 * @param locale - Language code
 * @param sectionKey - Key for the specific content section
 * @param fallbackLocale - Fallback language if requested locale isn't available
 * @returns The section content or empty string if not found
 */
export function getLocalizedSection(
  pageKey: string,
  locale: string,
  sectionKey: string,
  fallbackLocale: string = 'en'
): string {
  const pageContent = getLocalePageContent(pageKey, locale, fallbackLocale);
  
  if (!pageContent) {
    return '';
  }
  
  return pageContent.sections[sectionKey] || '';
}

/**
 * Get available locales for the application
 */
export function getAvailableLocales(): string[] {
  return ['en', 'ja', 'ko'];
}