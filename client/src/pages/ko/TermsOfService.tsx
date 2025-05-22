import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function KoreanTermsOfService() {
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
                이용약관
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

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">1. 약관 수락</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Hiroshi.dev("웹사이트")에 접속하거나 이용함으로써, 귀하는 이 이용약관("약관")에 구속되는 것에 동의합니다.
                  이 약관에 동의하지 않으시면 웹사이트를 이용하지 마십시오.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">2. 약관 변경</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  당사는 언제든지 이 약관을 수정할 권리를 보유합니다. 변경사항은 웹사이트에 게시되는 즉시 효력을 발생합니다.
                  변경 후에도 웹사이트를 계속 이용하는 경우, 귀하는 새로운 약관을 수락한 것으로 간주됩니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">3. 웹사이트 이용</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  귀하는 합법적인 목적으로만 웹사이트를 이용할 수 있습니다. 다음 행위는 금지됩니다:
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">적용되는 법률이나 규정을 위반하는 방식으로 웹사이트를 이용하는 행위.</li>
                  <li className="mb-2">웹사이트의 어떤 부분이나 웹사이트에 연결된 시스템이나 네트워크에 무단으로 접근하려는 시도.</li>
                  <li className="mb-2">다른 사람의 웹사이트 이용이나 향유를 제한하거나 방해하는 행위.</li>
                  <li className="mb-2">악성 소프트웨어, 바이러스, 또는 기타 악의적인 코드를 전송하기 위해 웹사이트를 이용하는 행위.</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">4. 지적 재산권</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  텍스트, 그래픽, 로고, 이미지, 소프트웨어를 포함하되 이에 국한되지 않는 웹사이트의 모든 콘텐츠는 
                  Hiroshi.dev 또는 그 콘텐츠 제공자의 재산이며 국제 저작권 및 지적 재산권법에 의해 보호됩니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">5. 사용자 콘텐츠</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  웹사이트에 콘텐츠를 제출함으로써(예: 문의 양식이나 댓글을 통해), 귀하는 Hiroshi.dev에게 
                  웹사이트 상에서 그리고 웹사이트를 통해 해당 콘텐츠를 사용, 수정, 공개적으로 표시, 복제, 배포할 수 있는 
                  비독점적, 무료, 영구적, 전 세계적 라이선스를 부여합니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">6. 면책 조항</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  웹사이트는 명시적이든 묵시적이든 어떠한 종류의 보증 없이 "있는 그대로" 그리고 "사용 가능한 대로" 제공됩니다.
                  당사는 웹사이트가 오류 없이, 안전하게, 또는 항상 이용 가능하다는 것을 보장하지 않습니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">7. 책임의 제한</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  법률이 허용하는 최대 범위 내에서, Hiroshi.dev는 웹사이트 이용으로 인해 직접적으로나 간접적으로 발생하는
                  간접적, 우발적, 특별, 결과적, 또는 징벌적 손해배상, 또는 수익이나 수입의 손실에 대해 책임을 지지 않습니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">8. 준거법</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  이 약관은 법률 충돌 규정에 관계없이 일본 법률에 따라 해석되고 규율됩니다.
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">9. 문의하기</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  이 약관에 대해 질문이 있으시면 다음으로 문의하십시오:
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  이메일: legal@hiroshi.dev
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