import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from 'react-i18next';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EmailCaptureModal({ isOpen, onClose }: EmailCaptureModalProps) {
  const { t } = useTranslation('common');
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <DialogClose className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
          
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary-100 dark:bg-primary-900 rounded-full text-primary-500">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              >
                <Download className="h-6 w-6" />
              </motion.div>
            </div>
          </div>
          
          <DialogTitle className="text-xl font-bold mb-2">{t('emailCapture.title')}</DialogTitle>
          <DialogDescription>
            {t('emailCapture.description')}
          </DialogDescription>
        </DialogHeader>
        
        <form className="space-y-4 mt-4">
          <div>
            <Input type="text" placeholder={t('emailCapture.namePlaceholder')} />
          </div>
          <div>
            <Input type="email" placeholder="Your Email" />
          </div>
          <Button type="submit" className="w-full">
            Download Free Guide
          </Button>
        </form>
        
        <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-4">
          I respect your privacy. You can unsubscribe at any time.
        </p>
      </DialogContent>
    </Dialog>
  );
}
