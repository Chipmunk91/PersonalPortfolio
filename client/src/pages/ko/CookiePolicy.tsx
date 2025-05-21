import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';

export default function KoreanCookiePolicy() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Korean
  useEffect(() => {
    if (i18n.language !== 'ko') {
      i18n.changeLanguage('ko');
    }
  }, [i18n]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">쿠키 정책</h1>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                이 쿠키 정책은 저희 웹사이트에서 쿠키 및 유사한 기술을 어떻게 사용하는지 설명합니다.
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">쿠키란 무엇인가요?</h2>
              <p className="text-gray-700 dark:text-gray-300">
                쿠키는 웹사이트, 앱, 온라인 미디어, 광고 등이 사용자의 브라우저나 기기에 저장하는 작은 텍스트 파일입니다. 이는 사용자의 환경 설정을 기억하고 사이트가 효율적으로 작동하도록 돕습니다.
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">쿠키 사용 방법</h2>
              <p className="text-gray-700 dark:text-gray-300">저희는 다음과 같은 목적으로 쿠키를 사용합니다:</p>
              <ul className="list-disc pl-6 mt-4 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2"><strong>필수 쿠키:</strong> 웹사이트가 제대로 작동하기 위해 필요합니다. 페이지 탐색과 웹사이트의 보안 영역 접근과 같은 기본 기능을 가능하게 합니다.</li>
                <li className="mb-2"><strong>성능 쿠키:</strong> 이 쿠키는 방문자가 저희 웹사이트와 어떻게 상호작용하는지 이해할 수 있도록 익명으로 정보를 수집하고 보고합니다.</li>
                <li className="mb-2"><strong>기능성 쿠키:</strong> 이를 통해 사용자가 선택한 사항을 기억하고 보다 향상된 맞춤형 기능을 제공할 수 있습니다.</li>
                <li className="mb-2"><strong>분석 쿠키:</strong> 사용자가 저희 웹사이트를 어떻게 사용하는지 분석하여 기능을 개선하는 데 도움을 줍니다.</li>
              </ul>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">사용하는 쿠키 유형</h2>
              <ul className="list-disc pl-6 mt-4 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2"><strong>세션 쿠키:</strong> 임시적이며 브라우저를 닫으면 만료됩니다.</li>
                <li className="mb-2"><strong>영구 쿠키:</strong> 삭제하거나 만료될 때까지 사용자의 기기에 남아 있습니다.</li>
                <li className="mb-2"><strong>자사 쿠키:</strong> 저희 웹사이트에서 설정됩니다.</li>
                <li className="mb-2"><strong>제3자 쿠키:</strong> 저희 파트너 및 서비스 제공업체에 의해 설정됩니다.</li>
              </ul>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">쿠키 관리</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                대부분의 웹 브라우저에서는 쿠키 환경 설정을 관리할 수 있습니다. 쿠키를 거부하거나 쿠키가 전송될 때 알림을 받도록 브라우저를 설정할 수 있습니다. 브라우저의 도움말 기능에 방법이 설명되어 있습니다.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                쿠키를 비활성화하면 사이트의 일부 기능이 제대로 작동하지 않을 수 있으니 참고하시기 바랍니다.
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">정책 변경</h2>
              <p className="text-gray-700 dark:text-gray-300">
                저희는 때때로 쿠키 정책을 업데이트할 수 있습니다. 변경 사항이 있으면 이 페이지에 게시하고 적절한 경우 사용자에게 알려드립니다.
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">문의하기</h2>
              <p className="text-gray-700 dark:text-gray-300">
                쿠키 사용에 관한 질문이 있으시면 문의 양식을 통해 연락 주시기 바랍니다.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}