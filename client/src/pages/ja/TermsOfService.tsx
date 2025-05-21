import { useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { useTranslation } from 'react-i18next';

export default function JapaneseTermsOfService() {
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
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-32">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">利用規約</h1>

            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                最終更新日: 2025年5月19日
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">はじめに</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                Hiroshi.devへようこそ。この利用規約（以下「規約」）は、当社のウェブサイトおよびサービスをご利用になる際の条件を定めるものです。 
                当社のウェブサイトにアクセスまたは使用することにより、これらの規約に同意したものとみなされます。 
                規約のいずれかの部分に同意しない場合、当社のウェブサイトへのアクセスは許可されません。
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">知的財産</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                本ウェブサイトのコンテンツ、テキスト、画像、グラフィック、コードおよびデザインを含むがこれに限定されないものは、Hiroshi.devが所有またはライセンスを受け、
                著作権、商標法、その他の知的財産法により保護されています。
                当社の事前の書面による同意なしに、当社のウェブサイト上の資料を複製、配布、変更、派生作品の作成、公に表示、
                または送信することはできません。
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">ユーザの投稿</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                当社のウェブサイトに送信したコンテンツ（コメントやメッセージなど）は、
                プライバシーポリシーに従った任意の目的で利用させていただきます。 
                お客様はコンテンツの所有権を保持しますが、当社は当該コンテンツを使用、複製、変更、適応、公開、翻訳、
                派生作品を作成し、世界中のあらゆるメディアで分配および表示するための非排他的、ロイヤリティフリー、
                永久的、取消不可能かつ完全にサブライセンス可能な権利を与えていただきます。
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">禁止事項</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                当社のウェブサイトを以下の目的で使用しないことに同意する:
              </p>
              <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
                <li className="mb-2">適用される連邦法、州法、地方法、または国際法、規制に違反する方法で使用すること。</li>
                <li className="mb-2">中傷的、わいせつ、わい談、虐待的、攻撃的、嫌がらせや、その他不適切な資料を送信すること。</li>
                <li className="mb-2">私たちまたは他のユーザーのなりすまし、または他の人物や団体になりすますこと。</li>
                <li className="mb-2">誰かのウェブサイトの使用楽しみを制約または妨げるその他の行為を行うこと。</li>
                <li className="mb-2">ウェブサイトの一部に不正なアクセスを試みること、またはこれを妨害、損傷または乱すこと。</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">保証の否認</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                お客様による当社のウェブサイトおよびサービスの利用はお客様自身のリスクとします。
                本ウェブサイトおよびサービスは「現状のまま」および「利用可能な場合」に限り提供され、あらゆる種類の保証を伴うものではありません。
                当社は、本ウェブサイトが安全またはエラーやウイルスからのフリーであることを保証しません。
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">責任の制限</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                適用される法の最大限の範囲内で、当社は、本ウェブサイトおよびサービスのご利用により生じる損害について一切責任を負いません。
                これには、直接的、間接的、または結果的損害、付随的損害、及び懲罰的損害賠償が含まれますが、これに限定されません。
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">保証の否認</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                お客様は、これらの規約の違反またはウェブサイトの使用に起因するあらゆる請求、責任、損害、判断、
                賞、損失、費用、または手数料から当社を防御、補償し、無害なものとすることに同意します。
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">規約の変更</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                当社は、これらの規約を随時当社の単独の裁量で改訂および更新することができます。
                すべての変更は、当社が投稿したときに直ちに有効となります。
                改訂された規約が投稿された後も、ウェブサイトの継続的な利用は、変更に同意したものとみなされます。
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">お問い合わせ</h2>
              <p className="mb-4 text-gray-700 dark:text-gray-300">
                規約についてご不明な点がございましたら、次の宛先までお問い合わせください。
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                メール: terms@hiroshi.dev
              </p>
            </div>
          </div>
          <Footer />
        </div>
      );
    }