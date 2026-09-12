const whyCards = [
  {
    num: '01',
    title: 'Expert Doctors & Faculty',
    desc: 'Learn directly from practicing aesthetic physicians and industry veterans with deep clinical expertise.',
  },
  {
    num: '02',
    title: 'Hands-On Experience with Advanced Tools',
    desc: 'Master medical lasers, chemical peels, and aesthetic devices with supervised live clinical practice.',
  },
  {
    num: '03',
    title: 'Online + Campus Training Options',
    desc: 'Flexible hybrid tracks that combine hands-on campus training with lifetime digital study access.',
  },
  {
    num: '04',
    title: 'Lifetime Access to Study Materials',
    desc: 'Stay updated with evolving protocols, cloud course notes, and research materials forever.',
  },
  {
    num: '05',
    title: 'State-of-the-Art Equipment',
    desc: 'Train on modern, industry-standard equipment used in top aesthetic and cosmetic clinics nationwide.',
  },
  {
    num: '06',
    title: 'Global Exposure & Career Support',
    desc: 'Gain internationally relevant skills with dedicated placement assistance and clinic startup mentorship.',
  },
];

export default function WhyCiatn() {
  return (
    <section id="why">
      <div className="wrap">
        <div className="section-head">
          <span className="eyebrow">Why Choose CIATN?</span>
          <h2>At CIATN, we empower future leaders in aesthetic medicine</h2>
          <p>
            At CIATN, we empower future leaders in aesthetic medicine through real-world experience, personalized mentorship, and a globally relevant curriculum.
          </p>
        </div>
        <div className="why-grid">
          {whyCards.map((card) => (
            <div key={card.num} className="why-item">
              <span className="num">{card.num}</span>
              <h4>{card.title}</h4>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
