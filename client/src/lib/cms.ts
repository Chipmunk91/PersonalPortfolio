/**
 * CMS API wrapper for fetching localized content
 * This simulates a headless CMS since we don't have an actual CMS connected
 */

// Cache for localized content to avoid redundant processing
const contentCache: Record<string, Record<string, PageContent>> = {};

export interface PageContent {
  title: string;
  body: string;
  metadata?: {
    lastUpdated?: string;
    [key: string]: any;
  };
}

// Mock CMS data for the Privacy Policy page
const mockPrivacyPolicyContent: Record<string, PageContent> = {
  en: {
    title: "Privacy Policy",
    body: `
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
        This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website. Please read this privacy policy carefully. We reserve the right to make changes to this Privacy Policy at any time and for any reason.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Collection of Your Information</h2>
      <p class="text-gray-700 dark:text-gray-300">We may collect information about you in a variety of ways, including:</p>
      
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Personal Data</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        While using our website, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. This may include, but is not limited to:
      </p>
      <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2">Email address</li>
        <li class="mb-2">First name and last name</li>
        <li class="mb-2">Phone number</li>
        <li class="mb-2">Address, State, Province, ZIP/Postal code, City</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Derivative Data</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Information our servers automatically collect when you access our website, such as your IP address, browser type, operating system, access times, and the pages you have viewed.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">Data From Contests and Giveaways</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Personal and other information you may provide when entering contests or giveaways or responding to surveys.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Use of Your Information</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:</p>
      <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2">Create and manage your account.</li>
        <li class="mb-2">Email you regarding your account or order.</li>
        <li class="mb-2">Fulfill and manage purchases, orders, payments, and other transactions related to the website.</li>
        <li class="mb-2">Increase the efficiency and operation of the website.</li>
        <li class="mb-2">Monitor and analyze usage and trends to improve your experience with the website.</li>
        <li class="mb-2">Notify you of updates to the website.</li>
        <li class="mb-2">Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
        <li class="mb-2">Request feedback and contact you about your use of the website.</li>
        <li class="mb-2">Resolve disputes and troubleshoot problems.</li>
      </ul>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Contact Us</h2>
      <p class="text-gray-700 dark:text-gray-300">
        If you have questions or comments about this Privacy Policy, please contact us through our contact form.
      </p>
    `,
    metadata: {
      lastUpdated: "2023-10-15"
    }
  },
  ja: {
    title: "プライバシーポリシー",
    body: `
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
        このプライバシーポリシーでは、当社のウェブサイトをご利用いただく際に収集、使用、開示、保護する情報について説明します。このプライバシーポリシーを注意深くお読みください。当社は、いつでも、いかなる理由でもこのプライバシーポリシーを変更する権利を留保します。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">情報の収集</h2>
      <p class="text-gray-700 dark:text-gray-300">当社は以下のような様々な方法であなたに関する情報を収集することがあります：</p>
      
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">個人データ</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        当社のウェブサイトをご利用いただく際に、お客様にご連絡やご本人確認のために使用できる個人を特定できる特定の情報の提供をお願いすることがあります。これには、以下の情報が含まれる場合がありますが、これらに限定されません：
      </p>
      <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2">メールアドレス</li>
        <li class="mb-2">氏名</li>
        <li class="mb-2">電話番号</li>
        <li class="mb-2">住所、都道府県、郵便番号、市区町村</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">派生データ</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        当社のウェブサイトにアクセスする際に、サーバーが自動的に収集する情報（IPアドレス、ブラウザの種類、オペレーティングシステム、アクセス時間、閲覧したページなど）。
      </p>

      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">コンテストやプレゼントからのデータ</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        コンテストやプレゼントに参加したり、アンケートに回答したりする際に提供する個人情報やその他の情報。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">お客様の情報の使用</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">お客様に関する正確な情報を持つことで、スムーズで効率的、かつカスタマイズされた体験を提供することができます。具体的には、ウェブサイトを通じて収集した情報を以下のような目的で使用することがあります：</p>
      <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2">アカウントの作成と管理。</li>
        <li class="mb-2">アカウントや注文に関するメールの送信。</li>
        <li class="mb-2">ウェブサイトに関連する購入、注文、支払い、その他の取引の履行と管理。</li>
        <li class="mb-2">ウェブサイトの効率と運営の向上。</li>
        <li class="mb-2">ウェブサイトでの体験を向上させるために、利用状況と傾向を監視・分析します。</li>
        <li class="mb-2">ウェブサイトの更新について通知します。</li>
        <li class="mb-2">不正取引の防止、盗難の監視、犯罪行為からの保護。</li>
        <li class="mb-2">フィードバックの要求とウェブサイトの使用に関するご連絡。</li>
        <li class="mb-2">紛争の解決とトラブルシューティング。</li>
      </ul>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">お問い合わせ</h2>
      <p class="text-gray-700 dark:text-gray-300">
        このプライバシーポリシーに関するご質問やご意見がある場合は、お問い合わせフォームからご連絡ください。
      </p>
    `,
    metadata: {
      lastUpdated: "2023-10-15"
    }
  },
  ko: {
    title: "개인정보 처리방침",
    body: `
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
        이 개인정보 처리방침은 당사 웹사이트를 방문할 때 개인정보를 어떻게 수집, 사용, 공개, 보호하는지 설명합니다. 이 개인정보 처리방침을 주의 깊게 읽어주시기 바랍니다. 당사는 언제든지 어떤 이유로든 이 개인정보 처리방침을 변경할 권리가 있습니다.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">개인정보 수집</h2>
      <p class="text-gray-700 dark:text-gray-300">당사는 다음과 같은 다양한 방법으로 귀하에 관한 정보를 수집할 수 있습니다:</p>
      
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">개인 데이터</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        당사의 웹사이트를 사용하는 동안, 귀하에게 연락하거나 식별하는 데 사용할 수 있는 특정 개인 식별 정보를 제공하도록 요청할 수 있습니다. 이는 다음을 포함할 수 있으나 이에 국한되지 않습니다:
      </p>
      <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2">이메일 주소</li>
        <li class="mb-2">이름과 성</li>
        <li class="mb-2">전화번호</li>
        <li class="mb-2">주소, 시/도, 우편번호, 도시</li>
      </ul>

      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">파생 데이터</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        당사 웹사이트에 접속할 때 서버가 자동으로 수집하는 정보로, IP 주소, 브라우저 유형, 운영 체제, 접속 시간, 열람한 페이지 등이 포함됩니다.
      </p>

      <h3 class="text-xl font-semibold text-gray-900 dark:text-white mt-6 mb-3">콘테스트 및 경품 응모 데이터</h3>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        콘테스트나 경품 행사에 참여하거나 설문조사에 응답할 때 제공할 수 있는 개인 정보 및 기타 정보입니다.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">개인정보 사용</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">귀하에 관한 정확한 정보를 보유하면 원활하고 효율적이며 맞춤화된 경험을 제공할 수 있습니다. 구체적으로, 웹사이트를 통해 수집된 정보는 다음과 같은 목적으로 사용될 수 있습니다:</p>
      <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2">계정 생성 및 관리</li>
        <li class="mb-2">계정 또는 주문에 관한 이메일 전송</li>
        <li class="mb-2">웹사이트와 관련된 구매, 주문, 결제 및 기타 거래 이행 및 관리</li>
        <li class="mb-2">웹사이트의 효율성 및 운영 향상</li>
        <li class="mb-2">웹사이트 경험을 개선하기 위한 사용 패턴 및 추세 모니터링 및 분석</li>
        <li class="mb-2">웹사이트 업데이트 알림</li>
        <li class="mb-2">사기 거래 예방, 도난 감시, 범죄 활동 방지</li>
        <li class="mb-2">피드백 요청 및 웹사이트 사용에 관한 연락</li>
        <li class="mb-2">분쟁 해결 및 문제 해결</li>
      </ul>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">문의하기</h2>
      <p class="text-gray-700 dark:text-gray-300">
        이 개인정보 처리방침에 관한 질문이나 의견이 있으시면, 문의 양식을 통해 연락해 주십시오.
      </p>
    `,
    metadata: {
      lastUpdated: "2023-10-15"
    }
  }
};

// Mock CMS data for the Cookie Policy page
const mockCookiePolicyContent: Record<string, PageContent> = {
  en: {
    title: "Cookie Policy",
    body: `
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
        This Cookie Policy explains how we use cookies and similar technologies on our website.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">What are cookies?</h2>
      <p class="text-gray-700 dark:text-gray-300">
        Cookies are small text files that are stored on your browser or device by websites, apps, online media, and advertisements. They are used to remember your preferences and make the site work efficiently.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">How we use cookies</h2>
      <p class="text-gray-700 dark:text-gray-300">We use cookies for several purposes, including:</p>
      <ul class="list-disc pl-6 mt-4 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2"><strong>Essential Cookies:</strong> These are necessary for the website to function properly. They enable basic functions like page navigation and access to secure areas of the website.</li>
        <li class="mb-2"><strong>Performance Cookies:</strong> These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</li>
        <li class="mb-2"><strong>Functionality Cookies:</strong> These allow us to remember choices you make and provide enhanced, more personal features.</li>
        <li class="mb-2"><strong>Analytics Cookies:</strong> These help us analyze how users use our website, allowing us to improve its functionality.</li>
      </ul>
    `,
    metadata: {
      lastUpdated: "2023-09-20"
    }
  },
  ja: {
    title: "クッキーポリシー",
    body: `
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
        このクッキーポリシーでは、当社のウェブサイトでクッキーや類似の技術をどのように使用しているかについて説明します。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">クッキーとは何ですか？</h2>
      <p class="text-gray-700 dark:text-gray-300">
        クッキーは、ウェブサイト、アプリ、オンラインメディア、広告などによってブラウザやデバイスに保存される小さなテキストファイルです。これらは、お客様の設定を記憶し、サイトを効率的に機能させるために使用されます。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">クッキーの使用方法</h2>
      <p class="text-gray-700 dark:text-gray-300">当社は以下のような目的でクッキーを使用しています：</p>
      <ul class="list-disc pl-6 mt-4 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2"><strong>必須クッキー：</strong> これらはウェブサイトが適切に機能するために必要なものです。ページナビゲーションやウェブサイトのセキュアエリアへのアクセスなどの基本的な機能を可能にします。</li>
        <li class="mb-2"><strong>パフォーマンスクッキー：</strong> これらのクッキーは、匿名で情報を収集・報告することによって、訪問者が当社のウェブサイトとどのように相互作用しているかを理解するのに役立ちます。</li>
        <li class="mb-2"><strong>機能性クッキー：</strong> これらにより、お客様の選択を記憶し、より強化されたパーソナルな機能を提供することができます。</li>
        <li class="mb-2"><strong>分析クッキー：</strong> これらは、ユーザーが当社のウェブサイトをどのように使用しているかを分析し、その機能性を向上させるのに役立ちます。</li>
      </ul>
    `,
    metadata: {
      lastUpdated: "2023-09-20"
    }
  },
  ko: {
    title: "쿠키 정책",
    body: `
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
        이 쿠키 정책은 저희 웹사이트에서 쿠키 및 유사한 기술을 어떻게 사용하는지 설명합니다.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">쿠키란 무엇인가요?</h2>
      <p class="text-gray-700 dark:text-gray-300">
        쿠키는 웹사이트, 앱, 온라인 미디어, 광고 등이 사용자의 브라우저나 기기에 저장하는 작은 텍스트 파일입니다. 이는 사용자의 환경 설정을 기억하고 사이트가 효율적으로 작동하도록 돕습니다.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">쿠키 사용 방법</h2>
      <p class="text-gray-700 dark:text-gray-300">저희는 다음과 같은 목적으로 쿠키를 사용합니다:</p>
      <ul class="list-disc pl-6 mt-4 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2"><strong>필수 쿠키:</strong> 웹사이트가 제대로 작동하기 위해 필요합니다. 페이지 탐색과 웹사이트의 보안 영역 접근과 같은 기본 기능을 가능하게 합니다.</li>
        <li class="mb-2"><strong>성능 쿠키:</strong> 이 쿠키는 방문자가 저희 웹사이트와 어떻게 상호작용하는지 이해할 수 있도록 익명으로 정보를 수집하고 보고합니다.</li>
        <li class="mb-2"><strong>기능성 쿠키:</strong> 이를 통해 사용자가 선택한 사항을 기억하고 보다 향상된 맞춤형 기능을 제공할 수 있습니다.</li>
        <li class="mb-2"><strong>분석 쿠키:</strong> 사용자가 저희 웹사이트를 어떻게 사용하는지 분석하여 기능을 개선하는 데 도움을 줍니다.</li>
      </ul>
    `,
    metadata: {
      lastUpdated: "2023-09-20"
    }
  }
};

// Mock CMS data for the Terms of Service page
const mockTermsOfServiceContent: Record<string, PageContent> = {
  en: {
    title: "Terms of Service",
    body: `
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
        These Terms of Service ("Terms") govern your use of our website and services. Please read these Terms carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. Acceptance of Terms</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        By accessing this website, you are agreeing to be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. Use License</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        Permission is granted to temporarily view the materials (information or software) on our website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      </p>
      <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2">modify or copy the materials;</li>
        <li class="mb-2">use the materials for any commercial purpose, or for any public display (commercial or non-commercial);</li>
        <li class="mb-2">attempt to decompile or reverse engineer any software contained on our website;</li>
        <li class="mb-2">remove any copyright or other proprietary notations from the materials; or</li>
        <li class="mb-2">transfer the materials to another person or "mirror" the materials on any other server.</li>
      </ul>
    `,
    metadata: {
      lastUpdated: "2023-09-10"
    }
  },
  ja: {
    title: "利用規約",
    body: `
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
        この利用規約（以下「本規約」といいます）は、当社のウェブサイトおよびサービスの利用に適用されます。ウェブサイトへのアクセスまたは利用前に、本規約を注意深くお読みください。サイトの一部にアクセスまたは利用することにより、あなたは本規約に拘束されることに同意したものとみなされます。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. 規約の受諾</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        このウェブサイトにアクセスすることにより、あなたはこの利用規約、適用されるすべての法律および規制に拘束されることに同意し、適用される地域の法律の遵守に責任を負うことに同意するものとします。これらの条件のいずれかに同意しない場合は、このサイトを使用したりアクセスしたりすることは禁止されています。
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. 使用許諾</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        個人的、非商業的な一時的な閲覧のみを目的として、当社のウェブサイト上の資料（情報またはソフトウェア）を一時的に閲覧することが許可されます。これは権利の譲渡ではなく使用許諾の付与であり、この使用許諾の下では以下のことはできません：
      </p>
      <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2">資料を修正またはコピーすること；</li>
        <li class="mb-2">資料を商業目的で使用すること、または公的な表示（商業的または非商業的）のために使用すること；</li>
        <li class="mb-2">当社のウェブサイトに含まれるソフトウェアの逆コンパイルまたはリバースエンジニアリングを試みること；</li>
        <li class="mb-2">資料から著作権表示またはその他の所有権表示を削除すること；または</li>
        <li class="mb-2">資料を他の人に転送したり、他のサーバー上で「ミラーリング」したりすること。</li>
      </ul>
    `,
    metadata: {
      lastUpdated: "2023-09-10"
    }
  },
  ko: {
    title: "서비스 이용약관",
    body: `
      <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
        이 서비스 이용약관("약관")은 당사 웹사이트 및 서비스 이용에 적용됩니다. 당사 웹사이트에 접속하거나 이용하기 전에 이 약관을 주의 깊게 읽어주시기 바랍니다. 사이트의 어떤 부분에 접속하거나 이용함으로써, 귀하는 이 약관에 구속되는 것에 동의하게 됩니다.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">1. 약관 수락</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        이 웹사이트에 접속함으로써, 귀하는 이 서비스 이용약관, 모든 관련 법률 및 규정에 구속되는 것에 동의하며, 모든 관련 지역 법률을 준수할 책임이 있음에 동의합니다. 이 약관 중 어느 조항에 동의하지 않는 경우, 이 사이트를 이용하거나 접속하는 것이 금지됩니다.
      </p>

      <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">2. 이용 허가</h2>
      <p class="text-gray-700 dark:text-gray-300 mb-4">
        개인적, 비상업적 일시적 열람만을 목적으로 당사 웹사이트의 자료(정보 또는 소프트웨어)를 일시적으로 보는 것이 허가됩니다. 이는 권리의 이전이 아닌 라이선스의 부여이며, 이 라이선스 하에서 귀하는 다음과 같은 행위를 할 수 없습니다:
      </p>
      <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
        <li class="mb-2">자료를 수정하거나 복사하는 행위;</li>
        <li class="mb-2">자료를 상업적 목적으로 사용하거나, 공개 전시(상업적 또는 비상업적)를 위해 사용하는 행위;</li>
        <li class="mb-2">당사 웹사이트에 포함된 소프트웨어를 역컴파일하거나 리버스 엔지니어링하려는 시도;</li>
        <li class="mb-2">자료에서 저작권 또는 기타 소유권 표시를 제거하는 행위; 또는</li>
        <li class="mb-2">자료를 다른 사람에게 전송하거나 다른 서버에 '미러링'하는 행위.</li>
      </ul>
    `,
    metadata: {
      lastUpdated: "2023-09-10"
    }
  }
};

// Mock CMS data for the Home page
const mockHomeContent: Record<string, PageContent> = {
  en: {
    title: "Data Visualization for AI",
    body: `
      <div class="hero-section">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          Data Visualization for AI
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
          Building intuitive interfaces that make complex AI models understandable and accessible to everyone.
        </p>
      </div>
      
      <div class="features-section">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Specialized in
        </h2>
        <div class="features-list">
          <div class="feature-item">
            <h3>Interactive Visualizations</h3>
            <p>Building dynamic, responsive visual interfaces that let users explore complex data intuitively.</p>
          </div>
          <div class="feature-item">
            <h3>AI Model Interpretability</h3>
            <p>Making complex AI/ML models transparent and understandable through visual and interactive tools.</p>
          </div>
          <div class="feature-item">
            <h3>UX/UI Design</h3>
            <p>Creating intuitive, accessible interfaces that make complex data visualizations easy to understand.</p>
          </div>
        </div>
      </div>
      
      <div class="cta-section">
        <h2>Ready to transform your data into intuitive visuals?</h2>
        <p>Let's collaborate on your next project and create powerful, interactive visualizations that drive insights.</p>
      </div>
    `,
    metadata: {
      heroImage: "/images/hero-bg.jpg",
      skills: ["D3.js", "React", "TensorFlow", "Visualization", "UX Research", "Python"]
    }
  },
  ja: {
    title: "AIのためのデータ可視化",
    body: `
      <div class="hero-section">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          AIのためのデータ可視化
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
          複雑なAIモデルを誰にでも理解しやすく、アクセスしやすくする直感的なインターフェイスを構築します。
        </p>
      </div>
      
      <div class="features-section">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          専門分野
        </h2>
        <div class="features-list">
          <div class="feature-item">
            <h3>インタラクティブな可視化</h3>
            <p>ユーザーが複雑なデータを直感的に探索できるダイナミックでレスポンシブなビジュアルインターフェイスを構築します。</p>
          </div>
          <div class="feature-item">
            <h3>AIモデルの解釈可能性</h3>
            <p>視覚的でインタラクティブなツールを通じて、複雑なAI/MLモデルを透明で理解しやすくします。</p>
          </div>
          <div class="feature-item">
            <h3>UX/UIデザイン</h3>
            <p>複雑なデータの可視化を理解しやすくする直感的でアクセスしやすいインターフェイスを作成します。</p>
          </div>
        </div>
      </div>
      
      <div class="cta-section">
        <h2>データを直感的に視覚化する準備はできていますか？</h2>
        <p>次のプロジェクトで協力し、洞察を促進する強力でインタラクティブな可視化を作成しましょう。</p>
      </div>
    `,
    metadata: {
      heroImage: "/images/hero-bg.jpg",
      skills: ["D3.js", "React", "TensorFlow", "可視化", "UXリサーチ", "Python"]
    }
  },
  ko: {
    title: "AI를 위한 데이터 시각화",
    body: `
      <div class="hero-section">
        <h1 class="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
          AI를 위한 데이터 시각화
        </h1>
        <p class="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mb-8">
          복잡한 AI 모델을 모든 사람이 이해하고 접근할 수 있게 만드는 직관적인 인터페이스를 구축합니다.
        </p>
      </div>
      
      <div class="features-section">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          전문 분야
        </h2>
        <div class="features-list">
          <div class="feature-item">
            <h3>인터랙티브 시각화</h3>
            <p>사용자가 복잡한 데이터를 직관적으로 탐색할 수 있는 동적이고 반응형 시각적 인터페이스를 구축합니다.</p>
          </div>
          <div class="feature-item">
            <h3>AI 모델 해석 가능성</h3>
            <p>시각적이고 상호작용적인 도구를 통해 복잡한 AI/ML 모델을 투명하고 이해하기 쉽게 만듭니다.</p>
          </div>
          <div class="feature-item">
            <h3>UX/UI 디자인</h3>
            <p>복잡한 데이터 시각화를 쉽게 이해할 수 있는 직관적이고 접근하기 쉬운 인터페이스를 만듭니다.</p>
          </div>
        </div>
      </div>
      
      <div class="cta-section">
        <h2>데이터를 직관적인 시각화로 변환할 준비가 되셨나요?</h2>
        <p>다음 프로젝트에서 협력하여 인사이트를 도출하는 강력하고 상호작용적인 시각화를 만들어 보세요.</p>
      </div>
    `,
    metadata: {
      heroImage: "/images/hero-bg.jpg",
      skills: ["D3.js", "React", "TensorFlow", "시각화", "UX 리서치", "Python"]
    }
  }
};

// Mock CMS data for the About page
const mockAboutContent: Record<string, PageContent> = {
  en: {
    title: "About Me",
    body: `
      <div class="about-intro">
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          Hi there! I'm a data visualization specialist focused on making AI models more interpretable and accessible. With over 8 years of experience creating interactive data experiences, I help organizations and researchers communicate complex information effectively.
        </p>
      </div>
      
      <div class="about-expertise">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">My Expertise</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          My work sits at the intersection of AI, data visualization, and human-computer interaction. I specialize in:
        </p>
        <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
          <li class="mb-2">Designing interactive dashboards that help users understand AI predictions</li>
          <li class="mb-2">Creating tools that explain how machine learning models make decisions</li>
          <li class="mb-2">Developing visualization techniques that reveal patterns in complex datasets</li>
          <li class="mb-2">Building user-friendly interfaces for technical and non-technical audiences</li>
        </ul>
      </div>
      
      <div class="about-background">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">Background</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          With a background in computational visualization and human-computer interaction, I've collaborated with research labs, tech companies, and healthcare organizations to develop intuitive ways of understanding complex data and AI systems.
        </p>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          My projects have been featured in IEEE Visualization, ACM CHI, and other top visualization venues. I'm passionate about making technical concepts accessible through thoughtful design and interactive experiences.
        </p>
      </div>
    `,
    metadata: {
      profileImage: "/images/profile.jpg",
      timeline: [
        { year: "2019-Present", title: "AI Visualization Consultant", company: "Various Clients" },
        { year: "2016-2019", title: "Senior Data Visualization Engineer", company: "TechViz Inc." },
        { year: "2014-2016", title: "UX Researcher", company: "DataLab Research" }
      ]
    }
  },
  ja: {
    title: "自己紹介",
    body: `
      <div class="about-intro">
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          こんにちは！AIモデルをより解釈しやすく、アクセスしやすくすることに焦点を当てたデータ可視化の専門家です。インタラクティブなデータ体験の作成において8年以上の経験を持ち、組織や研究者が複雑な情報を効果的に伝えるのを支援しています。
        </p>
      </div>
      
      <div class="about-expertise">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">専門分野</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          私の仕事は、AI、データ可視化、ヒューマンコンピュータインタラクションの交差点にあります。以下の分野に特化しています：
        </p>
        <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
          <li class="mb-2">ユーザーがAI予測を理解するのに役立つインタラクティブなダッシュボードの設計</li>
          <li class="mb-2">機械学習モデルがどのように決定を下すかを説明するツールの作成</li>
          <li class="mb-2">複雑なデータセットのパターンを明らかにする可視化技術の開発</li>
          <li class="mb-2">技術的・非技術的な視聴者のためのユーザーフレンドリーなインターフェイスの構築</li>
        </ul>
      </div>
      
      <div class="about-background">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">経歴</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          計算可視化とヒューマンコンピュータインタラクションのバックグラウンドを持ち、研究室、テクノロジー企業、医療機関と協力して、複雑なデータとAIシステムを理解するための直感的な方法を開発してきました。
        </p>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          私のプロジェクトはIEEE Visualization、ACM CHIなどのトップクラスの可視化の場で紹介されています。思慮深いデザインとインタラクティブな体験を通じて、技術的な概念をアクセスしやすくすることに情熱を持っています。
        </p>
      </div>
    `,
    metadata: {
      profileImage: "/images/profile.jpg",
      timeline: [
        { year: "2019-現在", title: "AI可視化コンサルタント", company: "様々なクライアント" },
        { year: "2016-2019", title: "シニアデータ可視化エンジニア", company: "TechViz Inc." },
        { year: "2014-2016", title: "UXリサーチャー", company: "DataLab Research" }
      ]
    }
  },
  ko: {
    title: "소개",
    body: `
      <div class="about-intro">
        <p class="text-lg text-gray-700 dark:text-gray-300 mb-6">
          안녕하세요! AI 모델을 더 해석하기 쉽고 접근하기 쉽게 만드는 데 중점을 둔 데이터 시각화 전문가입니다. 인터랙티브한 데이터 경험을 만드는 8년 이상의 경험을 바탕으로 조직과 연구자들이 복잡한 정보를 효과적으로 전달할 수 있도록 돕고 있습니다.
        </p>
      </div>
      
      <div class="about-expertise">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">전문 분야</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          제 작업은 AI, 데이터 시각화, 인간-컴퓨터 상호작용의 교차점에 있습니다. 다음 분야를 전문으로 합니다:
        </p>
        <ul class="list-disc pl-6 mt-2 mb-6 text-gray-700 dark:text-gray-300">
          <li class="mb-2">사용자가 AI 예측을 이해하는 데 도움이 되는 인터랙티브 대시보드 설계</li>
          <li class="mb-2">머신 러닝 모델이 결정을 내리는 방식을 설명하는 도구 제작</li>
          <li class="mb-2">복잡한 데이터셋의 패턴을 드러내는 시각화 기술 개발</li>
          <li class="mb-2">기술적 및 비기술적 사용자를 위한 사용자 친화적 인터페이스 구축</li>
        </ul>
      </div>
      
      <div class="about-background">
        <h2 class="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">배경</h2>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          계산 시각화 및 인간-컴퓨터 상호작용 배경을 바탕으로, 연구소, 기술 기업, 의료 기관과 협력하여 복잡한 데이터와 AI 시스템을 이해하기 위한 직관적인 방법을 개발해 왔습니다.
        </p>
        <p class="text-gray-700 dark:text-gray-300 mb-4">
          제 프로젝트는 IEEE Visualization, ACM CHI 및 기타 최고 수준의 시각화 행사에서 소개되었습니다. 사려 깊은 디자인과 인터랙티브한 경험을 통해 기술적 개념을 접근하기 쉽게 만드는 데 열정을 가지고 있습니다.
        </p>
      </div>
    `,
    metadata: {
      profileImage: "/images/profile.jpg",
      timeline: [
        { year: "2019-현재", title: "AI 시각화 컨설턴트", company: "다양한 클라이언트" },
        { year: "2016-2019", title: "시니어 데이터 시각화 엔지니어", company: "TechViz Inc." },
        { year: "2014-2016", title: "UX 연구원", company: "DataLab Research" }
      ]
    }
  }
};

// Initialize the content cache with our mock data
contentCache['privacy-policy'] = mockPrivacyPolicyContent;
contentCache['cookie-policy'] = mockCookiePolicyContent;
contentCache['terms-of-service'] = mockTermsOfServiceContent;
contentCache['home'] = mockHomeContent;
contentCache['about'] = mockAboutContent;

/**
 * Fetches localized content for a specific page
 * @param pageSlug - The slug/identifier for the page (e.g., 'privacy-policy')
 * @param locale - The language code (e.g., 'en', 'ja', 'ko')
 * @returns The page content or null if not found
 */
export async function fetchPage(pageSlug: string, locale: string): Promise<PageContent | null> {
  try {
    // Check if content is cached
    if (contentCache[pageSlug] && contentCache[pageSlug][locale]) {
      return contentCache[pageSlug][locale];
    }

    // In a real implementation, we would make an API call to the CMS here
    // For now, we'll just return null for missing content
    console.warn(`No content found for page ${pageSlug} in locale ${locale}`);
    return null;
  } catch (error) {
    console.error('Error fetching page content:', error);
    return null;
  }
}

/**
 * Get all available locales for the application
 * @returns An array of locale codes
 */
export function getAvailableLocales(): string[] {
  return ['en', 'ja', 'ko'];
}

/**
 * Get all pages that support localization
 * @returns An array of page slugs
 */
export function getLocalizedPages(): string[] {
  return Object.keys(contentCache);
}

/**
 * Get all available locale and page combinations for static path generation
 * @returns An array of { locale, pageSlug } objects
 */
export function getAllLocalizedPaths(): Array<{ locale: string, pageSlug: string }> {
  const locales = getAvailableLocales();
  const pages = getLocalizedPages();
  
  const paths: Array<{ locale: string, pageSlug: string }> = [];
  
  for (const pageSlug of pages) {
    for (const locale of locales) {
      // Only include combinations that have content
      if (contentCache[pageSlug] && contentCache[pageSlug][locale]) {
        paths.push({ locale, pageSlug });
      }
    }
  }
  
  return paths;
}