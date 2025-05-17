import { SiMicrosoft, SiGoogle, SiAmazon, SiAdobe } from 'react-icons/si';
import { FaUniversity } from 'react-icons/fa';

export function SocialProof() {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-4">TRUSTED BY INDUSTRY LEADERS</p>
        <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12">
          <div className="h-6 sm:h-8 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 flex items-center">
            <SiMicrosoft className="h-full w-auto" />
          </div>
          <div className="h-6 sm:h-8 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 flex items-center">
            <SiGoogle className="h-full w-auto" />
          </div>
          <div className="h-6 sm:h-8 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 flex items-center">
            <SiAmazon className="h-full w-auto" />
          </div>
          <div className="h-6 sm:h-8 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 flex items-center">
            <SiAdobe className="h-full w-auto" />
          </div>
          <div className="h-6 sm:h-8 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0 flex items-center">
            <FaUniversity className="h-full w-auto" />
            <span className="ml-1 text-sm font-semibold">MIT</span>
          </div>
        </div>
      </div>
    </div>
  );
}
