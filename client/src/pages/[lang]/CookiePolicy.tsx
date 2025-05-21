import React from 'react';
import { useParams } from 'wouter';
import { PolicyPage } from '@/components/PolicyPage';

export default function CookiePolicyPage() {
  const { lang } = useParams();
  return <PolicyPage pageKey="cookie-policy" language={lang || 'en'} />;
}