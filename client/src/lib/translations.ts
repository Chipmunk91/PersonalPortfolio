import { Language } from "@/contexts/LanguageContext";

type TranslationKey = 
  | 'navHome'
  | 'navAbout'
  | 'navProjects'
  | 'navBlog'
  | 'navContact'
  | 'heroTitle'
  | 'heroSubtitle'
  | 'heroButton'
  | 'specializedIn'
  | 'interactiveVisualizationsTitle'
  | 'interactiveVisualizationsDesc'
  | 'aiModelTitle'
  | 'aiModelDesc'
  | 'uxuiTitle'
  | 'uxuiDesc'
  | 'learnMoreButton'
  | 'featuredProjectsTitle'
  | 'featuredProjectsSubtitle'
  | 'viewAllProjects'
  | 'latestInsightsTitle'
  | 'latestInsightsSubtitle'
  | 'readAllArticles'
  | 'readArticle'
  | 'ctaTitle'
  | 'ctaSubtitle'
  | 'getInTouch'
  | 'footerNavigation'
  | 'footerLegal'
  | 'footerRights'
  | 'privacyPolicy'
  | 'termsOfService'
  | 'cookiePolicy';

type TranslationsType = {
  [key in Language]: {
    [key in TranslationKey]: string;
  };
};

export const translations: TranslationsType = {
  en: {
    navHome: 'Home',
    navAbout: 'About',
    navProjects: 'Projects',
    navBlog: 'Blog',
    navContact: 'Contact Me',
    heroTitle: 'I build interactive AI visualization tools',
    heroSubtitle: 'Helping companies transform complex data into intuitive, interactive experiences that drive insights and decision-making.',
    heroButton: 'Explore My Work',
    specializedIn: 'Specialized in',
    interactiveVisualizationsTitle: 'Interactive Visualizations',
    interactiveVisualizationsDesc: 'Building dynamic, responsive visual interfaces that let users explore complex data intuitively.',
    aiModelTitle: 'AI Model Interpretability',
    aiModelDesc: 'Making complex AI/ML models transparent and understandable through visual and interactive tools.',
    uxuiTitle: 'UX/UI Design',
    uxuiDesc: 'Creating intuitive, accessible interfaces that make complex data visualizations easy to understand.',
    learnMoreButton: 'Learn more about my expertise',
    featuredProjectsTitle: 'Featured Projects',
    featuredProjectsSubtitle: 'Some of my recent work',
    viewAllProjects: 'View all projects',
    latestInsightsTitle: 'Latest Insights',
    latestInsightsSubtitle: 'Thoughts and tutorials on AI visualization',
    readAllArticles: 'Read all articles',
    readArticle: 'Read article',
    ctaTitle: 'Ready to transform your data into intuitive visuals?',
    ctaSubtitle: 'Let\'s collaborate on your next project and create powerful, interactive visualizations that drive insights.',
    getInTouch: 'Get in touch',
    footerNavigation: 'Navigation',
    footerLegal: 'Legal',
    footerRights: 'All rights reserved.',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    cookiePolicy: 'Cookie Policy'
  },
  ko: {
    navHome: '홈',
    navAbout: '소개',
    navProjects: '프로젝트',
    navBlog: '블로그',
    navContact: '연락하기',
    heroTitle: '인터랙티브 AI 시각화 도구를 만듭니다',
    heroSubtitle: '기업이 복잡한 데이터를 직관적이고 인터랙티브한 경험으로 변환하여 통찰력과 의사 결정을 촉진하도록 지원합니다.',
    heroButton: '작업 살펴보기',
    specializedIn: '전문 분야',
    interactiveVisualizationsTitle: '인터랙티브 시각화',
    interactiveVisualizationsDesc: '사용자가 복잡한 데이터를 직관적으로 탐색할 수 있는 동적이고 반응형 시각적 인터페이스를 구축합니다.',
    aiModelTitle: 'AI 모델 해석 가능성',
    aiModelDesc: '시각적 및 인터랙티브 도구를 통해 복잡한 AI/ML 모델을 투명하고 이해하기 쉽게 만듭니다.',
    uxuiTitle: 'UX/UI 디자인',
    uxuiDesc: '복잡한 데이터 시각화를 쉽게 이해할 수 있는 직관적이고 접근 가능한 인터페이스를 만듭니다.',
    learnMoreButton: '나의 전문성에 대해 더 알아보기',
    featuredProjectsTitle: '주요 프로젝트',
    featuredProjectsSubtitle: '최근 작업 중 일부',
    viewAllProjects: '모든 프로젝트 보기',
    latestInsightsTitle: '최신 인사이트',
    latestInsightsSubtitle: 'AI 시각화에 관한 생각과 튜토리얼',
    readAllArticles: '모든 글 읽기',
    readArticle: '글 읽기',
    ctaTitle: '데이터를 직관적인 시각화로 변환할 준비가 되셨나요?',
    ctaSubtitle: '다음 프로젝트에서 협력하여 통찰력을 제공하는 강력하고 인터랙티브한 시각화를 만들어 보세요.',
    getInTouch: '연락하기',
    footerNavigation: '네비게이션',
    footerLegal: '법적 정보',
    footerRights: '모든 권리 보유.',
    privacyPolicy: '개인정보 처리방침',
    termsOfService: '서비스 이용약관',
    cookiePolicy: '쿠키 정책'
  },
  ja: {
    navHome: 'ホーム',
    navAbout: '概要',
    navProjects: 'プロジェクト',
    navBlog: 'ブログ',
    navContact: 'お問い合わせ',
    heroTitle: 'インタラクティブなAI可視化ツールを構築します',
    heroSubtitle: '企業が複雑なデータを直感的でインタラクティブな体験に変換し、洞察と意思決定を促進するのを支援します。',
    heroButton: '作品を見る',
    specializedIn: '専門分野',
    interactiveVisualizationsTitle: 'インタラクティブな可視化',
    interactiveVisualizationsDesc: 'ユーザーが複雑なデータを直感的に探索できる、動的で応答性の高い視覚的インターフェースを構築します。',
    aiModelTitle: 'AIモデルの解釈可能性',
    aiModelDesc: '視覚的およびインタラクティブなツールを通じて、複雑なAI/MLモデルを透明で理解しやすくします。',
    uxuiTitle: 'UX/UIデザイン',
    uxuiDesc: '複雑なデータ可視化を簡単に理解できる、直感的でアクセスしやすいインターフェースを作成します。',
    learnMoreButton: '専門知識についてもっと知る',
    featuredProjectsTitle: '注目のプロジェクト',
    featuredProjectsSubtitle: '最近の作品の一部',
    viewAllProjects: 'すべてのプロジェクトを見る',
    latestInsightsTitle: '最新のインサイト',
    latestInsightsSubtitle: 'AI可視化に関する考えとチュートリアル',
    readAllArticles: 'すべての記事を読む',
    readArticle: '記事を読む',
    ctaTitle: 'データを直感的な視覚化に変換する準備はできていますか？',
    ctaSubtitle: '次のプロジェクトで協力して、洞察力を引き出す強力でインタラクティブな可視化を作成しましょう。',
    getInTouch: 'お問い合わせ',
    footerNavigation: 'ナビゲーション',
    footerLegal: '法的情報',
    footerRights: '全著作権所有。',
    privacyPolicy: 'プライバシーポリシー',
    termsOfService: '利用規約',
    cookiePolicy: 'クッキーポリシー'
  }
};

export function getTranslation(language: Language, key: TranslationKey): string {
  return translations[language][key];
}