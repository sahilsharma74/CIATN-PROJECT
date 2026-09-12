import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BookDemoHero from '@/components/BookDemoHero';
import BookDemoInfo from '@/components/BookDemoInfo';
import BookDemoForm from '@/components/BookDemoForm';

export const metadata = {
  title: 'Book a Demo & Counseling | CIATN Institute Pune',
  description:
    'Experience CIATN before you enroll. Book a personalized academic demo, hands-on clinical walkthrough, and career counseling session at our Boat Club Road center in Pune.',
};

export default function BookDemoPage() {
  return (
    <>
      <Header />
      <main className="book-demo-page">
        <BookDemoHero />

        <section className="book-demo-section">
          <div className="wrap">
            <div className="book-demo-grid">
              <BookDemoForm />
              <BookDemoInfo />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
