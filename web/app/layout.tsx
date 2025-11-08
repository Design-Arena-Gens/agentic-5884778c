import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Super Heavy Grok Advantage',
  description: 'Deep text analysis: readability, keywords, sentiment, and argument cues.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
