import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function JapaneseTermsOfService() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Japanese
  useEffect(() => {
    if (i18n.language !== 'ja') {
      i18n.changeLanguage('ja');
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
                利用規約
              </motion.h1>

              <motion.div 
                className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                  最終更新日：2025年5月19日
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">1. 規約の承諾</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Hiroshi.dev（「本ウェブサイト」）にアクセスまたは利用することにより、あなたはこれらの利用規約（「本規約」）に拘束されることに同意するものとします。
                  本規約に同意しない場合は、本ウェブサイトを利用しないでください。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">2. 規約の変更</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  当社は、いつでも本規約を変更する権利を留保します。変更は本ウェブサイトに掲載された時点で直ちに有効となります。
                  変更後も本ウェブサイトを継続して利用することにより、あなたは新しい規約を承諾したものとみなされます。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">3. ウェブサイトの利用</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  あなたは合法的な目的のためにのみ本ウェブサイトを利用することができます。以下の行為は禁止されています：
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">適用される法律や規制に違反するような方法での本ウェブサイトの利用。</li>
                  <li className="mb-2">本ウェブサイトの任意の部分、またはウェブサイトに接続されているシステムやネットワークへの不正アクセスの試み。</li>
                  <li className="mb-2">他者による本ウェブサイトの利用や享受を制限または妨げるような行為。</li>
                  <li className="mb-2">マルウェア、ウイルス、その他の悪意のあるコードを送信するための本ウェブサイトの使用。</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">4. 知的財産</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  テキスト、グラフィック、ロゴ、画像、ソフトウェアを含む（ただしこれらに限定されない）本ウェブサイト上のすべてのコンテンツは、
                  Hiroshi.devまたはそのコンテンツ提供者の財産であり、国際的な著作権および知的財産法によって保護されています。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">5. ユーザーコンテンツ</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  本ウェブサイトにコンテンツを提出すること（例：問い合わせフォームやコメントを通じて）により、あなたはHiroshi.devに対し、
                  ウェブサイト上およびウェブサイトを通じて、そのようなコンテンツを使用、修正、公開表示、複製、および配布するための
                  非独占的、無償、永続的、および世界的なライセンスを付与します。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">6. 免責事項</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  本ウェブサイトは「現状のまま」「利用可能な状態で」提供され、明示または黙示を問わず、いかなる種類の保証もありません。
                  当社は、本ウェブサイトがエラーのないこと、安全であること、または常に利用可能であることを保証するものではありません。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">7. 責任の制限</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  法律で許可される最大限の範囲において、Hiroshi.devは、本ウェブサイトの使用から直接的または間接的に発生した
                  いかなる間接的、偶発的、特別、結果的、または懲罰的損害賠償、または利益や収入のいかなる損失についても責任を負いません。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">8. 準拠法</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  本規約は、法の抵触に関する規定にかかわらず、日本国の法律に従って解釈され、それに準拠するものとします。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">9. お問い合わせ</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  本規約に関するご質問がございましたら、以下までお問い合わせください：
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  メール: legal@hiroshi.dev
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