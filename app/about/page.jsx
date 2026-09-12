import Header from '@/components/Header';
import ApprovedBy from '@/components/ApprovedBy';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutCiatn from '@/components/about/AboutCiatn';
import Vision from '@/components/about/Vision';
import AboutFounder from '@/components/about/AboutFounder';
import CiatnAdvantage from '@/components/about/CiatnAdvantage';
import AboutClosingCta from '@/components/about/AboutClosingCta';

export const metadata = {
  title: 'About CIATN | Chromocosmo Institute of Aesthetics, Trichology & Nutrition',
  description:
    'Learn about CIATN, its vision, expert-led training, clinical education approach, and commitment to developing professionals in aesthetic medicine, cosmetology, trichology, and wellness.',
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <AboutHero />
        <ApprovedBy />
        <AboutCiatn />
        <Vision />
        <AboutFounder />
        <CiatnAdvantage />
        <AboutClosingCta />
      </main>
      <Footer />
    </>
  );
}
