import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { X, Check } from 'lucide-react';

const problems = [
  'Students get minor tasks, not real ownership',
  'Learning is generic and one-size-fits-all',
  'Projects never reach actual deployment',
  'Technical growth is uneven with no structure',
  'No connection between learning and real systems',
];

const solutions = [
  'Students own a product end-to-end',
  'Pathways personalized from day one',
  'Real deployment is a core milestone',
  'Squads built to balance and push each other',
  'Theory earns its context in production',
];

const fadeUp = {
  hidden: { y: 40, opacity: 0 },
  show: (i) => ({ y: 0, opacity: 1, transition: { duration: 0.5, delay: i * 0.08, ease: [0.16,1,0.3,1] } }),
};

export default function WhySection() {
  const [ref, inView] = useInView(0.15);

  return (
    <section id="why" className="section" ref={ref} style={{ background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 100%)' }}>
      <div className="orb" style={{ width: 350, height: 350, background: 'rgba(239,68,68,0.06)', top: '10%', left: '-5%' }} />
      <div className="orb" style={{ width: 350, height: 350, background: 'rgba(16,185,129,0.06)', top: '10%', right: '-5%' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Heading */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="section-tag">The Problem</span>
          <h2 className="section-title" style={{ margin: '0 auto 16px' }}>Why Traditional Internships Fail</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Most internships follow a familiar script: join, fix a forgotten bug, get a certificate, leave. Transformation? Minimal. This residency was built to break that script.
          </p>
        </motion.div>

        {/* Two columns */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>

          {/* Problems */}
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="card"
            style={{ borderColor: 'rgba(239,68,68,0.2)', background: 'rgba(239,68,68,0.04)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--red-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <X size={18} color="var(--red)" strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--red)', fontFamily: 'Space Grotesk, sans-serif' }}>Traditional Internships</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                >
                  <div style={{ marginTop: 3, flexShrink: 0, width: 18, height: 18, borderRadius: '50%', background: 'var(--red-dim)', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <X size={10} color="var(--red)" strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.5 }}>{p}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Solutions */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={inView ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card"
            style={{ borderColor: 'rgba(16,185,129,0.2)', background: 'rgba(16,185,129,0.04)' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--green-dim)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Check size={18} color="var(--green)" strokeWidth={2.5} />
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--green)', fontFamily: 'Space Grotesk, sans-serif' }}>Applied AI Initiative</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {solutions.map((s, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? 'show' : 'hidden'}
                  style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                >
                  <div style={{ marginTop: 3, flexShrink: 0, width: 18, height: 18, borderRadius: '50%', background: 'var(--green-dim)', border: '1px solid rgba(16,185,129,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={10} color="var(--green)" strokeWidth={3.5} />
                  </div>
                  <span style={{ fontSize: 15, color: 'var(--text-dim)', lineHeight: 1.5 }}>{s}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Program Flow */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ marginTop: 56, marginBottom: 24 }}
        >
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 8 }}>
              THE SEQUENCE
            </div>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', maxWidth: 480, margin: '0 auto' }}>
              Every element of this program follows a deliberate order. Nothing skips ahead. Nothing is assumed.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 8 }}>
            {[
              { step: '01', label: 'Interview' },
              { step: '02', label: 'Categorisation' },
              { step: '03', label: 'Group Formation' },
              { step: '04', label: 'Foundation Phase' },
              { step: '05', label: 'Product Build' },
            ].map((s, i, arr) => (
              <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 10,
                  padding: '12px 18px',
                  minWidth: 96,
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--cyan)', fontWeight: 700 }}>{s.step}</div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 13, fontWeight: 600, color: 'var(--text-dim)' }}>{s.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: 18, lineHeight: 1 }}>→</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Philosophy quote */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            marginTop: 64,
            padding: '40px 48px',
            background: 'linear-gradient(135deg, rgba(0,200,255,0.05), rgba(124,58,237,0.05))',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 20,
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '1.4rem', color: 'var(--text-muted)', marginBottom: 8, fontStyle: 'italic' }}>"</div>
          <p style={{ fontSize: 'clamp(1.1rem,2.5vw,1.4rem)', fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, lineHeight: 1.5, marginBottom: 16 }}>
            Students are not told:{' '}
            <span style={{ color: 'var(--red)', textDecoration: 'line-through' }}>"Go fix this small task."</span>
            <br />
            Instead:{' '}
            <span className="grad-cyan">"What does your system need this week?"</span>
          </p>
          <p style={{ fontSize: 14, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            Ownership-driven AI engineering — guided, not hand-held
          </p>
        </motion.div>
      </div>
    </section>
  );
}
