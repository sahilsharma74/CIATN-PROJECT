'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error('App Segment Error:', error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        fontFamily: 'var(--font-sans, sans-serif)',
      }}
    >
      <h2 style={{ fontSize: '2rem', color: 'var(--navy-deep, #0b192c)', marginBottom: '16px' }}>
        Something went wrong
      </h2>
      <p style={{ color: 'var(--slate, #475569)', maxWidth: '500px', marginBottom: '24px' }}>
        An unexpected error occurred while loading this section.
      </p>
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: '12px 24px',
            backgroundColor: 'var(--saffron, #ffc107)',
            color: 'var(--navy-deep, #0b192c)',
            border: 'none',
            borderRadius: '6px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
        <Link
          href="/"
          style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: 'var(--navy-deep, #0b192c)',
            border: '1px solid var(--navy-deep, #0b192c)',
            borderRadius: '6px',
            fontWeight: '600',
            textDecoration: 'none',
          }}
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
