import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function JapanesePrivacyPolicy() {
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
                プライバシーポリシー
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

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">はじめに</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  本プライバシーポリシーでは、Hiroshi.dev（「私たち」または「当社」）が、当社のウェブサイトをご利用の際に
                  お客様の個人情報をどのように収集、使用、保護するかについて説明しています。当社はお客様のプライバシーを尊重し、
                  個人データの保護に努めています。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">収集する情報</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  当社は以下の種類の情報を収集することがあります：
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">お問い合わせやニュースレター登録時に自主的に提供される個人情報（お名前やメールアドレスなど）。</li>
                  <li className="mb-2">IPアドレス、ブラウザの種類とバージョン、タイムゾーン設定、ブラウザプラグインの種類とバージョン、オペレーティングシステムなどの技術データ。</li>
                  <li className="mb-2">ページビュー、ナビゲーションパス、機能との対話を含む、当社ウェブサイトの利用方法に関する使用データ。</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">情報の使用方法</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  当社は収集した情報を以下の目的で使用します：
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">当社ウェブサイトの提供と維持。</li>
                  <li className="mb-2">お問い合わせへの対応やニュースレターの送信など、お客様とのコミュニケーション。</li>
                  <li className="mb-2">当社ウェブサイトのパフォーマンスとユーザー体験の分析と改善。</li>
                  <li className="mb-2">法的義務の遵守。</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">データセキュリティ</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  当社は、お客様の個人情報を不正アクセス、改ざん、開示、破壊から保護するために適切なセキュリティ対策を
                  実施しています。ただし、インターネットを介した送信や電子的保存方法は100％安全ではなく、絶対的な
                  セキュリティを保証することはできません。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">お客様の権利</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  お客様の所在地によっては、個人情報に関して以下の権利を有する場合があります：
                </p>
                <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                  <li className="mb-2">個人データへのアクセス権。</li>
                  <li className="mb-2">不正確または不完全なデータを訂正する権利。</li>
                  <li className="mb-2">個人データの削除を要求する権利。</li>
                  <li className="mb-2">個人データの処理を制限または反対する権利。</li>
                  <li className="mb-2">データポータビリティの権利。</li>
                </ul>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">ポリシーの変更</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  当社は、このプライバシーポリシーを随時更新することがあります。変更があった場合は、このページに掲載し、
                  「最終更新日」を適宜修正します。このプライバシーポリシーを定期的に確認されることをお勧めします。
                </p>

                <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">お問い合わせ</h2>
                <p className="mb-4 text-gray-700 dark:text-gray-300">
                  このプライバシーポリシーまたは当社のデータ慣行について質問や懸念がある場合は、以下までご連絡ください：
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