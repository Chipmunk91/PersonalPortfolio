import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';

export default function JapaneseCookiePolicy() {
  const { i18n } = useTranslation();
  
  // Ensure we're using Japanese
  useEffect(() => {
    if (i18n.language !== 'ja') {
      i18n.changeLanguage('ja');
    }
  }, [i18n]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">クッキーポリシー</h1>
          
          <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 md:p-8">
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                このクッキーポリシーでは、当社のウェブサイトでクッキーや類似の技術をどのように使用しているかについて説明します。
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">クッキーとは何ですか？</h2>
              <p className="text-gray-700 dark:text-gray-300">
                クッキーは、ウェブサイト、アプリ、オンラインメディア、広告などによってブラウザやデバイスに保存される小さなテキストファイルです。これらは、お客様の設定を記憶し、サイトを効率的に機能させるために使用されます。
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">クッキーの使用方法</h2>
              <p className="text-gray-700 dark:text-gray-300">当社は以下のような目的でクッキーを使用しています：</p>
              <ul className="list-disc pl-6 mt-4 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2"><strong>必須クッキー：</strong> これらはウェブサイトが適切に機能するために必要なものです。ページナビゲーションやウェブサイトのセキュアエリアへのアクセスなどの基本的な機能を可能にします。</li>
                <li className="mb-2"><strong>パフォーマンスクッキー：</strong> これらのクッキーは、匿名で情報を収集・報告することによって、訪問者が当社のウェブサイトとどのように相互作用しているかを理解するのに役立ちます。</li>
                <li className="mb-2"><strong>機能性クッキー：</strong> これらにより、お客様の選択を記憶し、より強化されたパーソナルな機能を提供することができます。</li>
                <li className="mb-2"><strong>分析クッキー：</strong> これらは、ユーザーが当社のウェブサイトをどのように使用しているかを分析し、その機能性を向上させるのに役立ちます。</li>
              </ul>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">使用しているクッキーの種類</h2>
              <ul className="list-disc pl-6 mt-4 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2"><strong>セッションクッキー：</strong> これらは一時的なもので、ブラウザを閉じると有効期限が切れます。</li>
                <li className="mb-2"><strong>永続クッキー：</strong> これらは、削除されるか有効期限が切れるまで、お客様のデバイスに残ります。</li>
                <li className="mb-2"><strong>ファーストパーティークッキー：</strong> これらは当社のウェブサイトによって設定されます。</li>
                <li className="mb-2"><strong>サードパーティークッキー：</strong> これらは、当社のパートナーやサービスプロバイダーによって設定されます。</li>
              </ul>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">クッキーの管理</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                ほとんどのウェブブラウザでは、クッキーの設定を管理することができます。クッキーを拒否したり、クッキーが送信される際に警告を出すようにブラウザを設定することができます。ブラウザのヘルプ機能で説明されているはずです。
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                クッキーを無効にすると、当サイトの一部が正常に機能しなくなる場合がありますのでご注意ください。
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">このポリシーの変更</h2>
              <p className="text-gray-700 dark:text-gray-300">
                当社は随時クッキーポリシーを更新することがあります。変更があった場合は、このページに掲載し、適宜お知らせします。
              </p>
    
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">お問い合わせ</h2>
              <p className="text-gray-700 dark:text-gray-300">
                クッキーの使用に関するご質問は、お問い合わせフォームからご連絡ください。
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}