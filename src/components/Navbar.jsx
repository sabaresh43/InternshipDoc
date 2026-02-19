import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowLeft } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

const links = [
  { href: '#why',       label: 'Why' },
  { href: '#archetypes', label: 'Archetypes' },
  { href: '#roadmap',   label: 'Roadmap' },
  { href: '#outcomes',  label: 'Outcomes' },
];

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <div style={{
      width: 34, height: 34, borderRadius: 8,
      background: 'linear-gradient(135deg,#00c8ff,#7c3aed)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: 16, fontWeight: 700, color: '#fff',
      fontFamily: 'Space Grotesk, sans-serif',
    }}>A</div>
    <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16, color: '#e2e8f0' }}>
      Applied AI
    </span>
  </div>
);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const location = useLocation();
  const isProgramPage = location.pathname === '/program';

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      if (isProgramPage) return;
      const sections = links.map(l => l.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top < 120) {
          setActive(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isProgramPage]);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999,
        padding: '0 24px',
        background: scrolled ? 'rgba(5,11,24,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.07)' : 'none',
        transition: 'all 0.3s',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 68 }}>

        {isProgramPage ? (
          /* Program page: back link + logo */
          <>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Logo />
            </Link>
            <Link
              to="/"
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontFamily: 'Space Grotesk, sans-serif',
                fontWeight: 500, fontSize: 14,
                color: 'var(--text-dim)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              <ArrowLeft size={14} /> Program Overview
            </Link>
          </>
        ) : (
          /* Home page: full nav */
          <>
            <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Logo />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="nav-links-desktop">
              {links.map(l => (
                <a
                  key={l.href}
                  href={l.href}
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 500,
                    fontSize: 14,
                    color: active === l.href.slice(1) ? 'var(--cyan)' : 'var(--text-dim)',
                    transition: 'color 0.2s',
                    textDecoration: 'none',
                  }}
                >{l.label}</a>
              ))}
            </div>

            <button
              onClick={() => setOpen(o => !o)}
              className="nav-hamburger"
              style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', display: 'none' }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </>
        )}
      </div>

      {/* Mobile menu (home page only) */}
      {!isProgramPage && (
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              style={{
                overflow: 'hidden',
                background: 'rgba(13,21,39,0.98)',
                borderTop: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <div style={{ padding: '16px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {links.map(l => (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    style={{
                      padding: '12px 20px',
                      color: 'var(--text-dim)',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontWeight: 500,
                      fontSize: 15,
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                    }}
                  >{l.label}</a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
}
