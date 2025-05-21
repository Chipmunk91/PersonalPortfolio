import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';

export default function KoreanTermsOfService() {
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">이용 약관</h1>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            최근 업데이트: 2025년 5월 19일
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">소개</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Hiroshi.dev에 오신 것을 환영합니다. 본 이용 약관("약관")은 귀하의 웹사이트 및 서비스 사용에 관한 규정입니다. 
            당사 웹사이트에 접속하거나 사용하는 경우 본 약관에 구속되는 것에 동의하는 것으로 간주됩니다. 약관의 일부라도 동의하지 않는 
            경우 당사 웹사이트에 접속하실 수 없습니다.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">지적 재산권</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            이 웹사이트의 콘텐츠는 텍스트, 이미지, 그래픽, 코드, 디자인 등을 포함하되 이에 국한되지 않으며, 
            Hiroshi.dev 소유 또는 라이선스를 가지고 있으며 저작권, 상표 및 기타 지적 재산권 법률로 보호됩니다. 
            사전 서면 동의 없이 웹사이트의 자료를 복사, 배포, 수정, 파생물 제작, 공개 전시, 공개 실행, 재게시, 다운로드, 
            저장, 전송할 수 없습니다.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">사용자 기여</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            피드백이나 메세지와 같은 컨텐츠를 웹사이트에 제출할 경우, 당사의 개인정보 보호정책과 일치하는 목적으로 사용할 수 있습니다. 
            귀하는 귀하의 컨텐츠에 대한 소유권을 유지하나, 전 세계 매체에서 해당 컨텐츠를 사용할 수 있는 비독점적, 로열티 프리, 
            영구적, 불가역적, 완전 양도 가능한 권리를 당사에 제공합니다.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">금지된 사용</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            귀하는 당사 웹사이트를 다음과 같이 사용하지 않을 것임을 동의합니다:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
            <li className="mb-2">적용 가능한 연방, 주, 지방, 국제법 또는 규정을 위반하는 방식으로</li>
            <li className="mb-2">명예 훼손, 외설, 음란, 학대, 모욕, 불쾌감, 괴롭힘 또는 기타 반감을 일으키는 자료를 전송하는 용도로</li>
            <li className="mb-2">당사, 당사 직원, 다른 사용자 또는 다른 사람이나 단체를 사칭하거나 사칭하려고 시도하려는 용도로</li>
            <li className="mb-2">다른 사람이 웹사이트를 사용하는 것을 제한하거나 방해하는 행위에 참여하는 용도로</li>
            <li className="mb-2">웹사이트의 일부에 무단으로 접근, 간섭, 손상 또는 방해를 시도하는 용도로</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">보증의 부인</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            웹사이트 및 서비스의 사용은 전적으로 귀하의 책임입니다. 웹사이트 및 서비스는 명시적이거나 묵시적인 보증 없이 "있는 그대로" 및 "사용 가능할 때" 제공됩니다. 
            당사는 웹사이트가 보안이 유지되거나 오류 또는 바이러스가 없음을 보장하지 않습니다.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">책임 제한</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            관련 법률이 허용하는 최대 한도 내에서, 웹사이트 또는 서비스를 사용함으로써 발생하는 어떠한 손해에 대해서도 당사는 책임을 지지 않습니다. 
            여기에는 직접적, 간접적, 결과적, 부수적 및 처벌적 손해 등이 포함되며 이에 국한되지 않습니다.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">배상</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            귀하는 본 약관의 위반이나 웹사이트 사용과 관련하여 발생하는 모든 청구, 책임, 손해, 판결, 상, 손실, 비용, 경비 또는 수수료로부터 당사를 방어하고 배상하며 
            무해하게 보호할 것에 동의합니다.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">약관의 변경</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            당사는 단독 재량에 따라 이 약관을 수시로 수정하고 업데이트할 수 있습니다. 모든 변경 사항은 게시 즉시 효력을 갖습니다. 
            수정된 약관이 게시된 후 웹사이트를 계속 사용하면 변경 사항을 수락하고 동의하는 것으로 간주됩니다.
          </p>

          <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">문의하기</h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            약관에 관한 질문은 이메일로 문의해주시기 바랍니다:
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            이메일: terms@hiroshi.dev
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}