import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Play-by-Play - Hockey Strategy Game',
  description: 'A hockey strategy card game - rework from an older project'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
