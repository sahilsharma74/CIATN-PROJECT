import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';
import EnquiryForm from '@/components/contact/EnquiryForm';

export const metadata = {
  title: 'Contact CIATN | Chromocosmo Institute of Aesthetics, Trichology & Nutrition',
  description:
    'Get in touch with CIATN in Pune to learn more about clinical cosmetology, trichology, aesthetic medicine and professional training programs.',
};

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="contact-page">
        <ContactHero />

        <section className="contact-main-section">
          <div className="wrap">
            <div className="contact-main-grid">
              <ContactInfo />
              <EnquiryForm />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
