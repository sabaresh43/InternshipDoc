import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { CheckCircle2, Github, Cloud, LineChart, BookOpen, Users, Cpu, Shield } from 'lucide-react';

const outcomes = [
  { icon: Cpu,        label: 'A deployed AI system',                color: '#00c8ff' },
  { icon: Cloud,      label: 'Cloud deployment experience',          color: '#7c3aed' },
  { icon: Shield,     label: 'Real MLOps & monitoring skills',       color: '#10b981' },
  { icon: LineChart,  label: 'Production architecture design',       color: '#f59e0b' },
  { icon: BookOpen,   label: 'Technical whitepaper published',       color: '#ec4899' },
  { icon: Github,     label: 'Portfolio-ready GitHub profile',       color: '#06b6d4' },
  { icon: Users,      label: 'Team collaboration under pressure',    color: '#a855f7' },
  { icon: CheckCircle2, label: 'Full-stack AI product ownership',    color: '#f97316' },
];


export default function OutcomesSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section id="outcomes" className="section" ref={ref} style={{ background: 'var(--bg-2)' }}>
      <div className="orb" style={{ width: 500, height: 500, background: 'rgba(0,200,255,0.06)', top: '-10%', left: '-5%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="section-tag">After 12 Months</span>
          <h2 className="section-title">What You Leave With</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Not just knowledge. Not a certificate you hang on the wall. Real systems, real proof, and the portfolio to back it up.
          </p>
        </motion.div>

        {/* Outcome cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16, marginBottom: 72 }}>
          {outcomes.map((o, i) => {
            const Icon = o.icon;
            return (
              <motion.div
                key={o.label}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                className="card"
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '20px 22px' }}
              >
                <div style={{
                  width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                  background: `${o.color}15`,
                  border: `1px solid ${o.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color={o.color} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.45, color: 'var(--text-dim)' }}>{o.label}</span>
              </motion.div>
            );
          })}
        </div>

        {/* Final bold statement */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            textAlign: 'center',
            padding: '56px 40px',
            background: 'linear-gradient(135deg, rgba(0,200,255,0.07), rgba(124,58,237,0.07))',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 24,
          }}
        >
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 20 }}>
            THE FINAL VISION
          </div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.5rem,3.5vw,2.4rem)', fontWeight: 700, marginBottom: 16, lineHeight: 1.3 }}>
            They will not just{' '}
            <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>know AI.</span>
          </h2>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.5rem,3.5vw,2.4rem)', fontWeight: 700, marginBottom: 24 }}>
            They will have{' '}
            <span className="grad-multi">built AI.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
            A structured transformation from AI student to AI systems builder.
            Profiled, grouped, aligned, and guided — but never hand-held.
            You will have the scar tissue and the portfolio to prove you built it.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
