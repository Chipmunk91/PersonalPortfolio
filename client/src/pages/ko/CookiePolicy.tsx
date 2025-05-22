import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function KoreanCookiePolicy() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Korean
  useEffect(() => {
    if (i18n.language !== 'ko') {
      i18n.changeLanguage('ko');
    }
  }, [i18n]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-20 pt-28 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <motion.h1 
                className="text-3xl font-bold text-gray-900 dark:text-white mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                쿠키 정책
              </motion.h1>

              <motion.div 
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  최종 업데이트: 2025년 5월 19일
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">쿠키란 무엇인가요</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  쿠키는 웹사이트를 방문할 때 컴퓨터나 모바일 기기에 저장되는 작은 텍스트 파일입니다. 
                  쿠키는 웹사이트 소유자가 웹사이트를 작동시키거나, 더 효율적으로 작동하도록 하거나, 
                  보고 정보를 제공하기 위해 널리 사용됩니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">쿠키 사용 방법</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Hiroshi.dev는 다음과 같은 여러 목적으로 쿠키를 사용합니다:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2"><strong>필수 쿠키:</strong> 이는 웹사이트가 제대로 작동하기 위해 필요하며 당사 시스템에서 끌 수 없습니다.</li>
                  <li className="mb-2"><strong>성능 쿠키:</strong> 이는 익명으로 정보를 수집하고 보고함으로써 방문자가 웹사이트와 어떻게 상호작용하는지 이해하는 데 도움이 됩니다.</li>
                  <li className="mb-2"><strong>기능성 쿠키:</strong> 이를 통해 웹사이트는 귀하의 선호도를 기억하는 등 향상된 기능과 개인화를 제공할 수 있습니다.</li>
                  <li className="mb-2"><strong>타겟팅 쿠키:</strong> 이는 귀하의 관심사 프로필을 구축하기 위해 당사 광고 파트너에 의해 당사 사이트를 통해 설정될 수 있습니다.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">사용하는 쿠키 유형</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  당사는 웹사이트에서 다음과 같은 유형의 쿠키를 사용합니다:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2"><strong>세션 쿠키:</strong> 이 임시 쿠키는 브라우저를 닫을 때 만료됩니다.</li>
                  <li className="mb-2"><strong>영구 쿠키:</strong> 이는 만료되거나 삭제할 때까지 기기에 남아 있습니다.</li>
                  <li className="mb-2"><strong>자사 쿠키:</strong> 이는 방문 중인 웹사이트에 의해 설정됩니다.</li>
                  <li className="mb-2"><strong>제3자 쿠키:</strong> 이는 방문 중인 도메인 이외의 도메인에 의해 설정됩니다.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">쿠키 관리</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  대부분의 웹 브라우저는 브라우저 설정을 통해 대부분의 쿠키를 어느 정도 제어할 수 있습니다. 
                  쿠키에 대해 더 자세히 알아보려면, 어떤 쿠키가 설정되었는지 확인하는 방법을 포함하여, 
                  <a href="https://www.aboutcookies.org" className="text-blue-600 dark:text-blue-400 hover:underline"> www.aboutcookies.org</a>를 방문하세요.
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  브라우저가 쿠키를 수락하지 않도록 설정할 수 있으며, 위 웹사이트는 브라우저에서 쿠키를 제거하는 방법을 알려줍니다. 
                  그러나 일부 경우에는 당사 웹사이트 기능이 결과적으로 작동하지 않을 수 있습니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">쿠키 정책 변경</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  당사는 때때로 쿠키 정책을 업데이트할 수 있습니다. 변경 사항은 이 페이지에 게시되며, 
                  "최종 업데이트" 날짜가 그에 따라 수정됩니다. 당사가 쿠키를 어떻게 사용하는지에 대해 
                  계속 정보를 얻기 위해 이 쿠키 정책을 주기적으로 검토하는 것이 좋습니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">문의하기</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  당사의 쿠키 정책에 대해 질문이 있으시면 다음으로 문의하십시오:
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  이메일: privacy@hiroshi.dev
                </p>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}