import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/site/Header';
import Footer from '@/components/site/Footer';

const SUPPORTED_LANGS = ['de', 'en'] as const;
type Lang = (typeof SUPPORTED_LANGS)[number];

export default async function SiteLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!SUPPORTED_LANGS.includes(lang as Lang)) notFound();

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
