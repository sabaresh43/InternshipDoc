import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ParticleCanvas from './ParticleCanvas';

const stats = [
  { value: '12', label: 'Months', suffix: '' },
  { value: '4',  label: 'Roles / Squad', suffix: '+' },
  { value: '3',  label: 'Mentors / Squad', suffix: '' },
  { value: '1',  label: 'Deployed Product', suffix: '' },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { y: 40, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: [0.16,1,0.3,1] } },
};

export default function Hero() {
  return (
    <section
      id="top"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        padding: '120px 24px 80px',
      }}
    >
      {/* Background */}
      <ParticleCanvas />
      <div className="orb" style={{ width: 600, height: 600, background: 'rgba(0,200,255,0.08)', top: -100, left: '50%', transform: 'translateX(-50%)' }} />
      <div className="orb" style={{ width: 400, height: 400, background: 'rgba(124,58,237,0.1)', bottom: 0, right: '10%' }} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ position: 'relative', zIndex: 1, maxWidth: 860 }}
      >
        {/* Badge */}
        <motion.div variants={item} style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <span className="section-tag" style={{ fontSize: 12 }}>
            <span style={{ width: 6, height: 6, background: 'var(--cyan)', borderRadius: '50%', display: 'inline-block' }} />
            12-Month Adaptive AI Product Residency
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 12, lineHeight: 1.08 }}
        >
          <span style={{ color: '#fff' }}>Applied</span>{' '}
          <span className="grad-cyan">AI</span>{' '}
          <span style={{ color: '#fff' }}>Initiative</span>
        </motion.h1>

        <motion.div variants={item} style={{ fontSize: 'clamp(1.3rem, 3vw, 2rem)', fontWeight: 600, marginBottom: 24, color: 'var(--text-dim)' }}>
          For MSc AI Students
        </motion.div>

        {/* Description */}
        <motion.p
          variants={item}
          style={{ fontSize: 'clamp(1rem,2vw,1.2rem)', color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.8 }}
        >
          Not a course. Not a task-runner internship where you fix a bug nobody cared about.
          A <strong style={{ color: 'var(--text-dim)' }}>structured transformation</strong> — profiled, grouped, aligned, and guided —
          from AI student to AI systems builder.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={item} style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 72 }}>
          <a href="#apply" className="btn btn-primary">
            Apply Now <ArrowRight size={16} />
          </a>
          <a href="#why" className="btn btn-outline">
            Explore the Program
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          variants={item}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 1,
            background: 'var(--border)',
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            maxWidth: 700,
            margin: '0 auto',
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              style={{
                padding: '24px 16px',
                background: 'var(--bg-2)',
                textAlign: 'center',
              }}
            >
              <div style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(1.8rem,4vw,2.6rem)',
                fontWeight: 700,
                background: 'linear-gradient(135deg,#00c8ff,#7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                lineHeight: 1,
                marginBottom: 6,
              }}>
                {s.value}{s.suffix}
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.8 }}
        style={{ position: 'absolute', bottom: 30, color: 'var(--text-muted)', zIndex: 1 }}
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  );
}
