import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setVisible(true);
    } else if (consent === 'accepted') {
      loadAnalytics();
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie-consent', 'accepted');
    loadAnalytics();
    setVisible(false);
  }

  function reject() {
    localStorage.setItem('cookie-consent', 'rejected');
    setVisible(false);
  }

  function loadAnalytics() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;

    const script = document.createElement('script');
    script.src = "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX";
    script.async = true;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    const gtag = (...args: any[]) => window.dataLayer!.push(args);
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXX');
  }

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'white',
      borderTop: '1px solid var(--border-light)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      zIndex: 9999,
      fontSize: '14px'
    }}>
      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>
        We use cookies to understand how people use Bristol Larder. You can accept or reject analytics cookies.
      </p>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={accept}
          style={{
            flex: 1,
            background: 'var(--brand-green)',
            color: 'white',
            border: 'none',
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 500
          }}
        >
          Accept
        </button>

        <button
          onClick={reject}
          style={{
            flex: 1,
            background: '#eee',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-light)',
            padding: '10px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}
        >
          Reject
        </button>
      </div>
    </div>
  );
}
