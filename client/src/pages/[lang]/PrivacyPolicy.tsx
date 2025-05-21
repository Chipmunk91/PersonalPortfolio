import React from 'react';
import { useParams } from 'wouter';
import { PolicyPage } from '@/components/PolicyPage';

export default function PrivacyPolicyPage() {
  const { lang } = useParams();
  return <PolicyPage pageKey="privacy-policy" language={lang || 'en'} />;
}