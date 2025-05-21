import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';

export default function JapanesePrivacyPolicy() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Japanese
  useEffect(() => {
    if (i18n.language !== 'ja') {
      i18n.changeLanguage('ja');
    }
  }, [i18n]);

return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">プライバシーポリシー</h1>

          <div className="prose dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              最終更新日：2025年5月19日
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">はじめに</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              本プライバシーポリシーでは、Hiroshi.dev（「私たち」または「当社」）が、当社のウェブサイトを訪問したときにお客様の個人情報を収集、使用、保護する方法を説明します。私たちは、お客様のプライバシーを尊重し、お客様の個人データを保護することに取り組んでいます。
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">収集する情報</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              当社のウェブサイトを訪問するときに、次の情報を収集する場合があります：
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">
                <strong>連絡先情報:</strong> ニュースレターを購読する場合やお問い合わせいただく場合、お名前とメールアドレスを収集する場合があります。
              </li>
              <li className="mb-2">
                <strong>利用データ:</strong> 訪問したページ、ページの滞在時間、その他の類似情報を含む、当社のウェブサイトとのインタラクションに関する情報を収集します。
              </li>
              <li className="mb-2">
                <strong>技術データ:</strong> IPアドレス、ブラウザの種類とバージョン、タイムゾーンの設定、ブラウザプラグインの種類とバージョン、オペレーティングシステム、およびその他の技術情報を収集する場合があります。
              </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">情報の利用方法</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              当社が収集した情報は、次の目的で使用されます：
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">当社のウェブサイトの提供と維持のため</li>
              <li className="mb-2">ウェブサイトやサービスの変更について通知するため</li>
              <li className="mb-2">ニュースレターを購読している場合に送信するため</li>
              <li className="mb-2">お客様のご質問への対応およびカスタマーサポートの提供のため</li>
              <li className="mb-2">機能とユーザーエクスペリエンスを向上させるために、ユーザーがどのようにサイトと対話するかを分析するため</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">データセキュリティ</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              お客様の個人情報を不正アクセス、改ざん、開示、破壊から保護するために、適切なセキュリティ対策を実施しています。ただし、インターネット上での送信や電子ストレージの方法が100％安全であるとは保証できないことに注意してください。
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">第三者サイトへのリンク</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              当社のウェブサイトには、第三者のウェブサイトへのリンクが含まれている場合があります。当社は、これらのウェブサイトのプライバシー慣行や内容について責任を負いません。第三者のウェブサイトを訪問する際には、そのプライバシーポリシーをお読みになることをお勧めします。
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">お客様の権利</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              お住まいの地域によって、お客様の個人情報に関して特定の権利を有する場合があります：
            </p>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li className="mb-2">個人情報へのアクセス権</li>
              <li className="mb-2">不正確な個人情報を訂正する権利</li>
              <li className="mb-2">個人情報を消去する権利</li>
              <li className="mb-2">お客様の個人情報の処理を制限する権利</li>
              <li className="mb-2">データポータビリティの権利</li>
              <li className="mb-2">個人情報の処理に異議を唱える権利</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">本プライバシーポリシーの変更</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              当社は、本プライバシーポリシーを随時更新することがあります。新しいプライバシーポリシーをこのページに掲載し、本ポリシーの上部にある「最終更新日」を更新することで、変更を通知します。
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">お問い合わせ</h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              このプライバシーポリシーについて質問がある場合は、次のメールアドレスにお問い合わせください：
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Email: privacy@hiroshi.dev
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}