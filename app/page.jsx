import Header from '@/components/Header';
import Hero from '@/components/Hero';
import ApprovedBy from '@/components/ApprovedBy';
import AboutIntro from '@/components/AboutIntro';
import Stats from '@/components/Stats';
import NsdcAccreditation from '@/components/NsdcAccreditation';
import PhotoScrollGallery from '@/components/motion/PhotoScrollGallery';
import Programs from '@/components/Programs';
import WhyCiatn from '@/components/WhyCiatn';
import Pgdcc from '@/components/Pgdcc';
import Curriculum from '@/components/Curriculum';
import Recognition from '@/components/Recognition';
import Founder from '@/components/Founder';
import Career from '@/components/Career';
import VideoTestimonials from '@/components/VideoTestimonials';
import EnquiryForm from '@/components/EnquiryForm';
import FaqSection from '@/components/FaqSection';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ApprovedBy />
        <AboutIntro />
        <Stats />
        <NsdcAccreditation />
        <PhotoScrollGallery />
        <Programs />
        <WhyCiatn />
        <Pgdcc />
        <Curriculum />
        <Recognition />
        <Founder />
        <Career />
        <VideoTestimonials />
        <EnquiryForm />
        <FaqSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
