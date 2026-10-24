import { Inter, Fraunces, Caveat } from 'next/font/google';
import './globals.css';
import SiteMotion3D from '@/components/three/SiteMotion3D';
import WhatsAppWidget from '@/components/WhatsAppWidget';

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
  title: 'CIATN Institute — Clinical Cosmetology, Trichology & Aesthetic Medicine Training, Pune',
  description: 'CIATN Institute builds skilled, ethically grounded aesthetic professionals through hands-on clinical training, government-aligned curricula, and mentorship from a working cosmetic physician in Pune.',
  keywords: ['Clinical Cosmetology', 'Trichology', 'Aesthetic Medicine Training', 'Pune Cosmetology Institute', 'PGDCC', 'Laser Training'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${caveat.variable}`}>
      <body>
        <SiteMotion3D />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
