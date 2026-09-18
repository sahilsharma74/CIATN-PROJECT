'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { headerNavigation } from '@/data/navigation';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setMenuOpen(false);

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname?.startsWith(href);
  };

  return (
    <header>
      <nav>
        <Link href="/" className="brand" onClick={closeMenu}>
          <Image
            src="/assets/ciatn-logo.webp"
            alt="CIATN Institute — Chromocosmo Institute of Aesthetics, Trichology & Nutrition"
            width={180}
            height={60}
            style={{ width: 'auto', height: '48px', objectFit: 'contain' }}
            priority
          />
        </Link>

        <div className={`nav-links ${menuOpen ? 'mobile-open' : ''}`}>
          {headerNavigation.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? 'active' : ''}
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="nav-cta">
          <a
            href="tel:+918669836365"
            className="nav-phone"
            style={{
              fontSize: '13.5px',
              fontWeight: 600,
              color: 'var(--navy-deep)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            +91 8669836365
          </a>

          <Link href="/book-a-demo" className="btn btn-navy" onClick={closeMenu}>
            Book a Demo
          </Link>

          <button
            type="button"
            className="burger"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
