import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function KoreanPrivacyPolicy() {
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
                개인정보 처리방침
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

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">소개</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  이 개인정보 처리방침은 Hiroshi.dev("당사", "저희" 또는 "우리")가 웹사이트 방문자의 개인정보를 
                  수집, 사용 및 보호하는 방법을 설명합니다. 당사는 귀하의 개인정보를 존중하고 보호하기 위해 최선을 다하고 있습니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">수집하는 정보</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  당사는 다음과 같은 유형의 정보를 수집할 수 있습니다:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">문의하거나 뉴스레터를 구독할 때 자발적으로 제공하는 개인 정보(이름 및 이메일 주소 등).</li>
                  <li className="mb-2">IP 주소, 브라우저 유형 및 버전, 시간대 설정, 브라우저 플러그인 유형 및 버전, 운영 체제를 포함한 기술 데이터.</li>
                  <li className="mb-2">페이지 조회, 탐색 경로, 기능 상호 작용을 포함한 웹사이트 사용 방법에 관한 사용 데이터.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">정보 사용 방법</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  당사는 수집한 정보를 다음과 같은 목적으로 사용합니다:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">웹사이트 제공 및 유지 관리.</li>
                  <li className="mb-2">문의에 대한 응답 및 뉴스레터 발송을 포함한 사용자와의 소통.</li>
                  <li className="mb-2">웹사이트 성능 및 사용자 경험 분석 및 개선.</li>
                  <li className="mb-2">법적 의무 준수.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">데이터 보안</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  당사는 개인정보를 무단 액세스, 변경, 공개 또는 파기로부터 보호하기 위해 적절한 보안 조치를 구현합니다. 
                  그러나 인터넷을 통한 전송이나 전자 저장 방법은 100% 안전하지 않으며, 당사는 절대적인 보안을 보장할 수 없습니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">귀하의 권리</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  위치에 따라 귀하는 개인정보에 관한 다음과 같은 권리를 가질 수 있습니다:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">개인 데이터에 접근할 권리.</li>
                  <li className="mb-2">부정확하거나 불완전한 데이터를 수정할 권리.</li>
                  <li className="mb-2">개인 데이터의 삭제를 요청할 권리.</li>
                  <li className="mb-2">개인 데이터 처리를 제한하거나 반대할 권리.</li>
                  <li className="mb-2">데이터 이동성에 대한 권리.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">정책 변경 사항</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  당사는 때때로 이 개인정보 처리방침을 업데이트할 수 있습니다. 모든 변경 사항은 이 페이지에 게시되며, 
                  "최종 업데이트" 날짜가 그에 따라 수정됩니다. 당사는 이 개인정보 처리방침을 주기적으로 검토할 것을 권장합니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">문의하기</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  이 개인정보 처리방침이나 당사의 데이터 관행에 관한 질문이나 우려 사항이 있으시면 다음 주소로 문의하세요:
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