import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '65vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px 20px',
        textAlign: 'center',
        fontFamily: 'var(--font-sans, sans-serif)',
      }}
    >
      <h1
        style={{
          fontSize: '4rem',
          fontWeight: '700',
          color: 'var(--navy-deep, #0b192c)',
          margin: 0,
          lineHeight: 1,
        }}
      >
        404
      </h1>
      <h2
        style={{
          fontSize: '1.75rem',
          color: 'var(--navy, #1e293b)',
          marginTop: '12px',
          marginBottom: '16px',
          fontFamily: 'var(--font-serif, serif)',
        }}
      >
        Page Not Found
      </h2>
      <p style={{ color: 'var(--slate, #475569)', maxWidth: '480px', marginBottom: '28px' }}>
        The page you are looking for might have been moved, renamed, or does not exist.
      </p>
      <Link
        href="/"
        style={{
          padding: '12px 28px',
          backgroundColor: 'var(--saffron, #ffc107)',
          color: 'var(--navy-deep, #0b192c)',
          borderRadius: '6px',
          fontWeight: '600',
          textDecoration: 'none',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        Return to Home Page
      </Link>
    </div>
  );
}
