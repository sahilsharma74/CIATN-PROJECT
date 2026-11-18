import { Inter, Fraunces, Caveat } from 'next/font/google';
import './globals.css';
import SiteMotion3D from '@/components/three/SiteMotion3D';
import WhatsAppWidget from '@/components/WhatsAppWidget';
import LeadEnquiryPopup from '@/components/LeadEnquiryPopup';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://www.ciatn.co.in'),
  title: 'CIATN Institute — Clinical Cosmetology, Trichology & Aesthetic Medicine Training, Pune',
  description: 'CIATN Institute builds skilled, ethically grounded aesthetic professionals through hands-on clinical training, government-aligned curricula, and mentorship from a working cosmetic physician in Pune.',
  keywords: ['Clinical Cosmetology', 'Trichology', 'Aesthetic Medicine Training', 'Pune Cosmetology Institute', 'PGDCC', 'Laser Training'],
  icons: {
    icon: [
      { url: '/assets/ciatn-logo.webp', type: 'image/webp' },
      { url: '/favicon.ico' },
    ],
    apple: [
      { url: '/assets/ciatn-logo.webp', type: 'image/webp' },
    ],
    shortcut: ['/favicon.ico'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body>
        <SiteMotion3D />
        {children}
        <WhatsAppWidget />
        <LeadEnquiryPopup />
      </body>
    </html>
  );
}
