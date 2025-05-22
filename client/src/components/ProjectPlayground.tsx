import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { ProjectType } from '@/lib/types';
import { getProjectPlayground } from '@/lib/projectLoader';
import { useLanguage } from '@/contexts/LanguageContext';

interface ProjectPlaygroundProps {
  selectedProject: ProjectType | null;
  playgroundConfig: Record<string, any>;
  onConfigChange: (values: Record<string, any>) => void;
}

export function ProjectPlayground({
  selectedProject,
  playgroundConfig,
  onConfigChange
}: ProjectPlaygroundProps) {
  // Get the current language for loading localized content
  const { language } = useLanguage();
  
  // Localized text for the playground
  const localizedText = {
    en: {
      title: "Interactive Playground",
      noProjectSelected: "Click on any project above to try it out directly in your browser. Adjust parameters and see how they affect the output in real-time.",
      projectInstructions: (category: string) => `Experiment with this ${category} project by adjusting parameters to see how they affect the results in real-time.`,
      noPlayground: "No playground available for this project",
      selectProject: "Select a project to view its interactive playground"
    },
    ja: {
      title: "インタラクティブプレイグラウンド",
      noProjectSelected: "上記のプロジェクトをクリックして、ブラウザで直接試してみてください。パラメータを調整して、リアルタイムで出力への影響を確認できます。",
      projectInstructions: (category: string) => `パラメータを調整して、このリアルタイムの${category}プロジェクトの結果への影響を試してみてください。`,
      noPlayground: "このプロジェクトではプレイグラウンドを利用できません",
      selectProject: "プロジェクトを選択してインタラクティブプレイグラウンドを表示"
    },
    ko: {
      title: "인터랙티브 플레이그라운드",
      noProjectSelected: "위의 프로젝트를 클릭하여 브라우저에서 직접 시도해 보세요. 매개변수를 조정하여 실시간으로 출력에 미치는 영향을 확인하세요.",
      projectInstructions: (category: string) => `매개변수를 조정하여 이 ${category} 프로젝트의 결과에 미치는 영향을 실시간으로 확인해 보세요.`,
      noPlayground: "이 프로젝트에서는 플레이그라운드를 사용할 수 없습니다",
      selectProject: "프로젝트를 선택하여 인터랙티브 플레이그라운드 보기"
    }
  };
  
  return (
    <motion.div 
      id="playground-section"
      className="mt-16 bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="p-6 md:p-8">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {selectedProject 
            ? selectedProject.title
            : localizedText[language as keyof typeof localizedText].title
          }
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {selectedProject 
            ? localizedText[language as keyof typeof localizedText].projectInstructions(selectedProject.categories[0])
            : localizedText[language as keyof typeof localizedText].noProjectSelected
          }
        </p>
        
        {selectedProject && selectedProject.dirName ? (
          /* Dynamically load the playground component for the selected project */
          (() => {
            // Get the language-specific playground component using the current language
            const playground = getProjectPlayground(selectedProject.dirName, language);
            if (playground && playground.default) {
              const PlaygroundComponent = playground.default;
              return (
                <PlaygroundComponent
                  onChange={onConfigChange}
                  {...playgroundConfig}
                />
              );
            } else {
              return (
                <div className="flex justify-center items-center h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg">
                  <div className="text-center text-gray-500 dark:text-gray-400">
                    <BarChart3 size={48} className="mx-auto mb-2 opacity-30" />
                    <p>{localizedText[language as keyof typeof localizedText].noPlayground}</p>
                  </div>
                </div>
              );
            }
          })()
        ) : (
          <div className="flex justify-center items-center h-[300px] bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="text-center text-gray-500 dark:text-gray-400">
              <BarChart3 size={48} className="mx-auto mb-2 opacity-30" />
              <p>{localizedText[language as keyof typeof localizedText].selectProject}</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}