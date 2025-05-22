import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function JapaneseCookiePolicy() {
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
                Cookieポリシー
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

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Cookieとは</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Cookieとは、ウェブサイトを訪問した際にコンピュータやモバイルデバイスに配置される小さなテキストファイルです。
                  Cookieは、ウェブサイト所有者がウェブサイトを機能させる、より効率的に動作させる、またはレポート情報を提供するために
                  広く使用されています。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">当社がCookieを使用する方法</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  Hiroshi.devは、以下を含むいくつかの目的でCookieを使用しています：
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2"><strong>必須Cookie：</strong>これらはウェブサイトが適切に機能するために必要であり、当社のシステムではオフにすることができません。</li>
                  <li className="mb-2"><strong>パフォーマンスCookie：</strong>これらは、情報を匿名で収集・報告することで、訪問者がウェブサイトとどのように対話するかを理解するのに役立ちます。</li>
                  <li className="mb-2"><strong>機能Cookie：</strong>これらにより、ウェブサイトはあなたの設定を記憶するなど、機能強化とパーソナライゼーションを提供できます。</li>
                  <li className="mb-2"><strong>ターゲティングCookie：</strong>これらは、広告パートナーによって当社サイトを通じて設定され、あなたの興味のプロファイルを構築する場合があります。</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">当社が使用するCookieの種類</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  当社は、ウェブサイトで次の種類のCookieを使用しています：
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2"><strong>セッションCookie：</strong>これらの一時的なCookieは、ブラウザを閉じると期限切れになります。</li>
                  <li className="mb-2"><strong>永続Cookie：</strong>これらは、期限切れになるか削除するまでデバイスに残ります。</li>
                  <li className="mb-2"><strong>ファーストパーティCookie：</strong>これらは、訪問しているウェブサイトによって設定されます。</li>
                  <li className="mb-2"><strong>サードパーティCookie：</strong>これらは、訪問しているドメイン以外のドメインによって設定されます。</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Cookieの管理</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  ほとんどのウェブブラウザでは、ブラウザ設定を通じてほとんどのCookieをある程度制御できます。Cookieについて詳しく知るには、
                  どのようなCookieが設定されているかを確認する方法も含めて、
                  <a href="https://www.aboutcookies.org" className="text-blue-600 dark:text-blue-400 hover:underline"> www.aboutcookies.org</a>をご覧ください。
                </p>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  ブラウザがCookieを受け入れないように設定することもでき、上記のウェブサイトではブラウザからCookieを削除する方法を説明しています。
                  ただし、いくつかのケースでは、当社ウェブサイトの機能が結果として動作しない場合があります。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">Cookieポリシーの変更</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  当社は、随時Cookieポリシーを更新することがあります。変更があった場合は、このページに掲載され、
                  「最終更新日」がそれに応じて修正されます。当社がCookieをどのように使用しているかについて
                  常に情報を得るために、このCookieポリシーを定期的に確認することをお勧めします。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">お問い合わせ</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  当社のCookieポリシーについてご質問がある場合は、以下にお問い合わせください：
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  メール：privacy@hiroshi.dev
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