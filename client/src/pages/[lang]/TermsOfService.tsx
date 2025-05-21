import React from 'react';
import { useParams } from 'wouter';
import { PolicyPage } from '@/components/PolicyPage';

export default function TermsOfServicePage() {
  const { lang } = useParams();
  return <PolicyPage pageKey="terms-of-service" language={lang || 'en'} />;
}