import { motion } from 'framer-motion';
import { Github, Mail, Globe } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border)',
      background: 'var(--bg-2)',
      padding: '48px 24px',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'linear-gradient(135deg,#00c8ff,#7c3aed)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, color: '#fff', fontSize: 15,
            }}>A</div>
            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15 }}>Applied AI Initiative</span>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 320, lineHeight: 1.6 }}>
            12-month adaptive AI product residency for MSc students.
            Profile. Group. Build. Deploy. Own.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          {[
            { icon: Github, label: 'GitHub' },
            { icon: Mail, label: 'Contact' },
            { icon: Globe, label: 'Website' },
          ].map(({ icon: Icon, label }) => (
            <button
              key={label}
              style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'var(--card)',
                border: '1px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: 'var(--text-muted)',
                transition: 'all 0.2s',
              }}
              title={label}
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '24px auto 0', paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          © 2025 Applied AI Initiative. All rights reserved.
        </p>
        <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Hybrid · Remote-First · 12 Months · MSc AI Students
        </p>
      </div>
    </footer>
  );
}
