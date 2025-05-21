/**
 * CMS API wrapper for fetching localized content
 * 
 * This simulates fetching content from a headless CMS by using our
 * local translation files. In a real implementation, this would
 * call a CMS API endpoint with locale parameter.
 */

import { Language } from "@/contexts/LanguageContext";

export interface PageContent {
  title: string;
  lastUpdated?: string;
  content: {
    [key: string]: any;
  };
}

// For PolicyPage type content
export interface PolicyContent extends PageContent {
  content: {
    introduction: string;
    sections: {
      title: string;
      body: string;
      subsections?: {
        title: string;
        body: string;
      }[];
    }[];
  };
}

// Simulated CMS data for policy pages
const policiesContent: Record<string, Record<Language, PolicyContent>> = {
  "privacy-policy": {
    "en": {
      title: "Privacy Policy",
      lastUpdated: "May 19, 2025",
      content: {
        introduction: "This Privacy Policy explains how Hiroshi.dev ('we', 'our', or 'us') collects, uses, and protects your personal information when you visit our website. We respect your privacy and are committed to protecting your personal data.",
        sections: [
          {
            title: "Information We Collect",
            body: "We may collect the following types of information when you visit our website:",
            subsections: [
              {
                title: "Contact Information",
                body: "If you subscribe to our newsletter or contact us, we may collect your name and email address."
              },
              {
                title: "Usage Data",
                body: "We collect information about how you interact with our website, including pages visited, time spent on pages, and other similar information."
              },
              {
                title: "Technical Data",
                body: "We may collect your IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system, and other technology information."
              }
            ]
          },
          {
            title: "How We Use Your Information",
            body: "We use the information we collect for the following purposes:",
            subsections: [
              { 
                title: "", 
                body: "To provide and maintain our website" 
              },
              { 
                title: "", 
                body: "To notify you about changes to our website or services" 
              },
              { 
                title: "", 
                body: "To send you our newsletter if you have subscribed" 
              },
              { 
                title: "", 
                body: "To respond to your inquiries and provide customer support" 
              },
              { 
                title: "", 
                body: "To analyze how users interact with our website to improve functionality and user experience" 
              }
            ]
          },
          {
            title: "Data Security",
            body: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security."
          },
          {
            title: "Third-Party Links",
            body: "Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of these websites. We encourage you to read the privacy policies of any third-party websites you visit."
          },
          {
            title: "Your Rights",
            body: "Depending on your location, you may have certain rights regarding your personal information, including:",
            subsections: [
              { title: "", body: "The right to access your personal information" },
              { title: "", body: "The right to rectify inaccurate personal information" },
              { title: "", body: "The right to erase your personal information" },
              { title: "", body: "The right to restrict processing of your personal information" },
              { title: "", body: "The right to data portability" },
              { title: "", body: "The right to object to the processing of your personal information" }
            ]
          },
          {
            title: "Changes to This Privacy Policy",
            body: "We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the \"Last updated\" date at the top of this policy."
          },
          {
            title: "Contact Us",
            body: "If you have any questions about this Privacy Policy, please contact us at:\n\nEmail: privacy@hiroshi.dev"
          }
        ]
      }
    },
    "ja": {
      title: "プライバシーポリシー",
      lastUpdated: "2025年5月19日",
      content: {
        introduction: "このプライバシーポリシーは、Hiroshi.dev（「当社」または「私たち」）が、当ウェブサイトをご利用の際にどのように個人情報を収集、使用、保護するかを説明しています。当社はあなたのプライバシーを尊重し、個人データの保護に取り組んでいます。",
        sections: [
          {
            title: "収集する情報",
            body: "当社は、当ウェブサイトをご利用の際に以下の種類の情報を収集することがあります：",
            subsections: [
              {
                title: "連絡先情報",
                body: "ニュースレターの登録やお問い合わせをされる場合、お名前とメールアドレスを収集することがあります。"
              },
              {
                title: "利用データ",
                body: "当社は、閲覧されたページ、ページの滞在時間、その他類似の情報など、当ウェブサイトとのやり取りに関する情報を収集します。"
              },
              {
                title: "技術データ",
                body: "IPアドレス、ブラウザの種類とバージョン、タイムゾーン設定、ブラウザのプラグインの種類とバージョン、オペレーティングシステム、その他の技術情報を収集することがあります。"
              }
            ]
          },
          {
            title: "情報の使用方法",
            body: "収集した情報は以下の目的で使用します：",
            subsections: [
              { title: "", body: "ウェブサイトの提供と維持" },
              { title: "", body: "ウェブサイトやサービスの変更についての通知" },
              { title: "", body: "登録されている場合のニュースレターの送信" },
              { title: "", body: "お問い合わせへの対応とカスタマーサポートの提供" },
              { title: "", body: "機能性とユーザー体験を向上させるためのウェブサイトの利用状況の分析" }
            ]
          },
          {
            title: "データセキュリティ",
            body: "当社は、個人情報を不正アクセス、改ざん、開示、破壊から保護するために適切なセキュリティ対策を実施しています。ただし、インターネット経由の送信や電子的な保存方法は100%安全ではなく、絶対的なセキュリティを保証することはできませんのでご了承ください。"
          },
          {
            title: "第三者リンク",
            body: "当ウェブサイトには、第三者のウェブサイトへのリンクが含まれることがあります。当社は、これらのウェブサイトのプライバシー慣行やコンテンツについて責任を負いません。訪問される第三者のウェブサイトのプライバシーポリシーをお読みになることをお勧めします。"
          },
          {
            title: "あなたの権利",
            body: "お住まいの地域によって、あなたの個人情報に関する以下のような権利を持つことがあります：",
            subsections: [
              { title: "", body: "個人情報へのアクセス権" },
              { title: "", body: "不正確な個人情報を修正する権利" },
              { title: "", body: "個人情報を消去する権利" },
              { title: "", body: "個人情報の処理を制限する権利" },
              { title: "", body: "データポータビリティの権利" },
              { title: "", body: "個人情報の処理に反対する権利" }
            ]
          },
          {
            title: "プライバシーポリシーの変更",
            body: "当社は、このプライバシーポリシーを随時更新することがあります。変更があった場合は、このページに新しいプライバシーポリシーを掲載し、ポリシー上部の「最終更新日」を更新してお知らせします。"
          },
          {
            title: "お問い合わせ",
            body: "このプライバシーポリシーについてご質問がある場合は、以下までお問い合わせください：\n\nメール: privacy@hiroshi.dev"
          }
        ]
      }
    },
    "ko": {
      title: "개인정보 처리방침",
      lastUpdated: "2025년 5월 19일",
      content: {
        introduction: "이 개인정보 처리방침은 Hiroshi.dev(\"당사\", \"우리\" 또는 \"저희\")가 웹사이트를 방문할 때 귀하의 개인정보를 수집, 사용, 보호하는 방법을 설명합니다. 당사는 귀하의 개인정보 보호를 중요하게 생각하며 귀하의 개인 데이터를 보호하기 위해 최선을 다하고 있습니다.",
        sections: [
          {
            title: "수집하는 정보",
            body: "당사는 웹사이트를 방문할 때 다음과 같은 유형의 정보를 수집할 수 있습니다:",
            subsections: [
              {
                title: "연락처 정보",
                body: "뉴스레터를 구독하거나 문의하는 경우, 이름과 이메일 주소를 수집할 수 있습니다."
              },
              {
                title: "사용 데이터",
                body: "방문한 페이지, 페이지에서 보낸 시간 및 기타 유사한 정보를 포함하여 웹사이트와 상호 작용하는 방식에 대한 정보를 수집합니다."
              },
              {
                title: "기술 데이터",
                body: "IP 주소, 브라우저 유형 및 버전, 시간대 설정, 브라우저 플러그인 유형 및 버전, 운영 체제 및 기타 기술 정보를 수집할 수 있습니다."
              }
            ]
          },
          {
            title: "정보 사용 방법",
            body: "수집한 정보는 다음과 같은 목적으로 사용됩니다:",
            subsections: [
              { title: "", body: "웹사이트 제공 및 유지" },
              { title: "", body: "웹사이트 또는 서비스 변경 사항 알림" },
              { title: "", body: "구독한 경우 뉴스레터 발송" },
              { title: "", body: "문의 응답 및 고객 지원 제공" },
              { title: "", body: "기능성과 사용자 경험을 개선하기 위해 사용자가 웹사이트와 상호 작용하는 방식 분석" }
            ]
          },
          {
            title: "데이터 보안",
            body: "당사는 개인정보를 무단 접근, 변경, 공개 또는 파괴로부터 보호하기 위해 적절한 보안 조치를 구현합니다. 그러나 인터넷을 통한 전송이나 전자 저장 방식은 100% 안전하지 않으며, 절대적인 보안을 보장할 수 없음을 유의하시기 바랍니다."
          },
          {
            title: "제3자 링크",
            body: "당사 웹사이트에는 제3자 웹사이트로의 링크가 포함될 수 있습니다. 당사는 이러한 웹사이트의 개인정보 처리 방침이나 콘텐츠에 대해 책임을 지지 않습니다. 방문하는 제3자 웹사이트의 개인정보 처리방침을 읽어보실 것을 권장합니다."
          },
          {
            title: "귀하의 권리",
            body: "귀하의 위치에 따라 개인정보와 관련하여 다음과 같은 권리를 가질 수 있습니다:",
            subsections: [
              { title: "", body: "개인정보에 대한 접근 권리" },
              { title: "", body: "부정확한 개인정보 수정 권리" },
              { title: "", body: "개인정보 삭제 권리" },
              { title: "", body: "개인정보 처리 제한 권리" },
              { title: "", body: "데이터 이동성에 대한 권리" },
              { title: "", body: "개인정보 처리에 대한 이의 제기 권리" }
            ]
          },
          {
            title: "개인정보 처리방침 변경",
            body: "당사는 수시로 개인정보 처리방침을 업데이트할 수 있습니다. 변경 사항이 있는 경우 이 페이지에 새로운 개인정보 처리방침을 게시하고 이 정책 상단의 \"마지막 업데이트\" 날짜를 업데이트하여 알려드립니다."
          },
          {
            title: "문의하기",
            body: "이 개인정보 처리방침에 대해 질문이 있으시면 다음 연락처로 문의해 주십시오:\n\n이메일: privacy@hiroshi.dev"
          }
        ]
      }
    }
  },
  "cookie-policy": {
    // Content for cookie policy would go here
    "en": {
      title: "Cookie Policy",
      lastUpdated: "May 19, 2025",
      content: {
        introduction: "This Cookie Policy explains how we use cookies and similar technologies on our website.",
        sections: [
          {
            title: "What are cookies?",
            body: "Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. They are used to remember your preferences and make the site work efficiently."
          },
          // Add more sections as needed
        ]
      }
    },
    "ja": {
      title: "クッキーポリシー",
      lastUpdated: "2025年5月19日",
      content: {
        introduction: "このクッキーポリシーでは、当社のウェブサイトでクッキーや類似の技術をどのように使用しているかについて説明します。",
        sections: [
          {
            title: "クッキーとは何ですか？",
            body: "クッキーは、ウェブサイト、アプリ、オンラインメディア、広告などによってブラウザやデバイスに保存される小さなテキストファイルです。これらは、お客様の設定を記憶し、サイトを効率的に機能させるために使用されます。"
          },
          // Add more sections as needed
        ]
      }
    },
    "ko": {
      title: "쿠키 정책",
      lastUpdated: "2025년 5월 19일",
      content: {
        introduction: "이 쿠키 정책은 저희 웹사이트에서 쿠키 및 유사한 기술을 어떻게 사용하는지 설명합니다.",
        sections: [
          {
            title: "쿠키란 무엇인가요?",
            body: "쿠키는 웹사이트, 앱, 온라인 미디어, 광고 등이 사용자의 브라우저나 기기에 저장하는 작은 텍스트 파일입니다. 이는 사용자의 환경 설정을 기억하고 사이트가 효율적으로 작동하도록 돕습니다."
          },
          // Add more sections as needed
        ]
      }
    }
  },
  "terms-of-service": {
    // Content for terms of service would go here
    "en": {
      title: "Terms of Service",
      lastUpdated: "May 19, 2025",
      content: {
        introduction: "These Terms of Service ('Terms') govern your use of our website and services. Please read these Terms carefully before accessing or using our website.",
        sections: [
          {
            title: "Acceptance of Terms",
            body: "By accessing this website, you are agreeing to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws."
          },
          // Add more sections as needed
        ]
      }
    },
    "ja": {
      title: "利用規約",
      lastUpdated: "2025年5月19日",
      content: {
        introduction: "この利用規約（以下「本規約」といいます）は、当社のウェブサイトおよびサービスの利用に適用されます。ウェブサイトへのアクセスまたは利用前に、本規約を注意深くお読みください。",
        sections: [
          {
            title: "規約の受諾",
            body: "このウェブサイトにアクセスすることにより、あなたはこの利用規約、適用されるすべての法律および規制に拘束されることに同意し、適用される地域の法律の遵守に責任を負うことに同意するものとします。"
          },
          // Add more sections as needed
        ]
      }
    },
    "ko": {
      title: "서비스 이용약관",
      lastUpdated: "2025년 5월 19일",
      content: {
        introduction: "이 서비스 이용약관('약관')은 당사 웹사이트 및 서비스 이용에 적용됩니다. 당사 웹사이트에 접속하거나 이용하기 전에 이 약관을 주의 깊게 읽어주시기 바랍니다.",
        sections: [
          {
            title: "약관 수락",
            body: "이 웹사이트에 접속함으로써, 귀하는 이 서비스 이용약관, 모든 관련 법률 및 규정에 구속되는 것에 동의하며, 모든 관련 지역 법률을 준수할 책임이 있음에 동의합니다."
          },
          // Add more sections as needed
        ]
      }
    }
  }
};

/**
 * Fetch page content from our simulated CMS
 * @param pageSlug The slug/identifier of the page
 * @param locale The language code
 * @returns The page content in the specified language
 */
export async function fetchPage(pageSlug: string, locale: Language): Promise<PageContent | null> {
  // In a real implementation, this would be an API call to a headless CMS
  // For now, we're simulating with our local data
  
  if (policiesContent[pageSlug] && policiesContent[pageSlug][locale]) {
    return policiesContent[pageSlug][locale];
  }
  
  // If no content is found, return null
  return null;
}

/**
 * Fetch policy page content
 * @param policyType The type of policy (privacy-policy, cookie-policy, terms-of-service)
 * @param locale The language code
 * @returns The policy content in the specified language
 */
export async function fetchPolicyPage(policyType: string, locale: Language): Promise<PolicyContent | null> {
  const content = await fetchPage(policyType, locale);
  return content as PolicyContent | null;
}