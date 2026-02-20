import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useInView } from '../hooks/useInView';
import { ChevronDown, ArrowRight } from 'lucide-react';

const phases = [
  {
    months: 'Months 1–2',
    label: 'Foundation',
    color: '#00c8ff',
    icon: '⚡',
    headline: 'Foundation Equalization',
    desc: 'Before you build, you learn to build together. Every student — regardless of prior experience — gets comfortable with the ground-level engineering environment before anything more complex is introduced.',
    deliverables: [
      'Development environment set up and configured',
      'Git and GitHub workflow established',
      'Basic API built and tested',
      'Simple database integrated',
      'Mini AI system structured and reviewed',
    ],
    topics: ['Python', 'Git & GitHub', 'Clean Code', 'API Basics', 'Database Basics', 'AI System Structure'],
  },
  {
    months: 'Month 3',
    label: 'Architecture',
    color: '#7c3aed',
    icon: '🏗️',
    headline: 'Product Architecture Phase',
    desc: 'If you cannot explain your system clearly, you are not ready to build it. Month 3 exists to make sure every squad can. No development begins without structured approval.',
    deliverables: [
      'Problem statement & user persona',
      'Technical architecture diagram',
      'Data acquisition strategy',
      'Ethics & bias analysis',
      'Risk register — approval required',
    ],
    topics: ['System Design', 'Product Thinking', 'Ethics in AI', 'Risk Analysis'],
  },
  {
    months: 'Months 4–6',
    label: 'MVP Build',
    color: '#10b981',
    icon: '🚀',
    headline: 'MVP Development',
    desc: 'Architecture approved. Now you build. From data ingestion to model integration to backend API to internal demo — this is where the system starts to feel real.',
    deliverables: [
      'Data ingestion system',
      'Model pipeline & LLM integration',
      'Backend API + Database',
      'Evaluation dashboard',
      'Internal demo milestone',
    ],
    topics: ['LLMs', 'FastAPI', 'PostgreSQL', 'MLflow', 'Experiment Tracking'],
  },
  {
    months: 'Months 7–8',
    label: 'Production',
    color: '#f59e0b',
    icon: '🌐',
    headline: 'Productionization',
    desc: 'The question shifts from "does this work on my laptop?" to "does this hold up when someone actually uses it?" Experimentation ends. Production thinking begins.',
    deliverables: [
      'Model registry & versioning',
      'Monitoring & logging system',
      'Drift detection alerts',
      'CI/CD pipeline live',
      'Cloud-deployed live system',
    ],
    topics: ['MLOps', 'Prometheus', 'Grafana', 'AWS/GCP', 'Infrastructure as Code'],
  },
  {
    months: 'Months 9–10',
    label: 'Optimization',
    color: '#ec4899',
    icon: '🔬',
    headline: 'Optimization & Research Layer',
    desc: 'Good enough is not enough. This phase is about making your system defensible — benchmarked, optimized, bias-tested, and explainable enough to stand behind.',
    deliverables: [
      'Performance benchmarking report',
      'Latency & cost analysis',
      'Robustness & bias test results',
      'Explainability layer',
      'Research-style experiments',
    ],
    topics: ['SHAP/LIME', 'Latency Profiling', 'A/B Testing', 'Cost Optimization'],
  },
  {
    months: 'Month 11',
    label: 'Whitepaper',
    color: '#06b6d4',
    icon: '📄',
    headline: 'Whitepaper & Documentation',
    desc: 'If you built it, you should be able to explain it. Every squad writes a proper technical whitepaper. Every student writes a personal contribution report — what they owned, what they learned, what they\'d do differently.',
    deliverables: [
      '15–20 page technical whitepaper',
      'Architecture diagrams',
      'Experimental results table',
      'Limitations & future work',
      'Personal contribution statements',
    ],
    topics: ['Technical Writing', 'Ethics Review', 'Research Methodology'],
  },
  {
    months: 'Month 12',
    label: 'Demo Day',
    color: '#f97316',
    icon: '🎯',
    headline: 'Demo Day & Final Evaluation',
    desc: 'Twelve months of work. One room. One shot. You present as system builders — not as students who attended a program.',
    deliverables: [
      'Live product demo',
      'Technical architecture defense',
      'Business viability pitch',
      'Q&A panel',
    ],
    topics: ['Presentation', 'System Defense', 'Business Pitch', 'Q&A'],
  },
];

function PhaseCard({ phase, index, inView }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ x: -30, opacity: 0 }}
      animate={inView ? { x: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      style={{ display: 'flex', gap: 0 }}
    >
      {/* Timeline line + dot */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 40, flexShrink: 0 }}>
        <div style={{
          width: 16, height: 16, borderRadius: '50%',
          background: phase.color,
          border: `3px solid ${phase.color}44`,
          boxShadow: `0 0 12px ${phase.color}44`,
          flexShrink: 0,
          marginTop: 20,
        }} />
        {index < phases.length - 1 && (
          <div style={{ width: 2, flex: 1, background: `linear-gradient(${phase.color}, ${phases[index + 1]?.color ?? phase.color})`, opacity: 0.25, minHeight: 32, marginTop: 4 }} />
        )}
      </div>

      {/* Card */}
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          flex: 1,
          marginLeft: 16,
          marginBottom: 16,
          background: open ? `${phase.color}08` : 'var(--card)',
          border: `1px solid ${open ? phase.color + '33' : 'var(--border)'}`,
          borderRadius: 16,
          padding: '20px 24px',
          cursor: 'pointer',
          transition: 'all 0.25s',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ fontSize: 22 }}>{phase.icon}</span>
            <div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: phase.color, letterSpacing: '0.12em', marginBottom: 3 }}>
                {phase.months.toUpperCase()}
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 17, margin: 0 }}>
                {phase.headline}
              </h3>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, padding: '4px 10px', borderRadius: 100, background: `${phase.color}18`, color: phase.color, fontWeight: 600 }}>
              {phase.label}
            </span>
            <motion.div
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown size={18} color="var(--text-muted)" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{ paddingTop: 20, borderTop: `1px solid ${phase.color}20`, marginTop: 16 }}>
                <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.7 }}>{phase.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20 }}>
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 13, color: 'var(--text-dim)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Deliverables
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {phase.deliverables.map(d => (
                        <div key={d} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <div style={{ width: 5, height: 5, borderRadius: '50%', background: phase.color, marginTop: 7, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.5 }}>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 13, color: 'var(--text-dim)', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      Key Topics
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {phase.topics.map(t => (
                        <span key={t} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, background: `${phase.color}12`, color: phase.color, border: `1px solid ${phase.color}28`, fontWeight: 500 }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function RoadmapSection() {
  const [ref, inView] = useInView(0.05);

  return (
    <section id="roadmap" className="section" ref={ref}>
      <div className="orb" style={{ width: 500, height: 500, background: 'rgba(16,185,129,0.05)', top: '30%', right: '-10%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <span className="section-tag">The Journey</span>
          <h2 className="section-title">12-Month Roadmap</h2>
          <p className="section-subtitle">
            Click any phase to expand deliverables and topics. Every month is a milestone — not a module. The order is deliberate and non-negotiable.
          </p>
        </motion.div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
          <div style={{ flex: 1, maxWidth: 800 }}>
            {phases.map((phase, i) => (
              <PhaseCard key={phase.months} phase={phase} index={i} inView={inView} />
            ))}
          </div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            style={{
              width: 300,
              padding: '28px 32px',
              background: 'linear-gradient(135deg, rgba(0,200,255,0.05), rgba(124,58,237,0.05))',
              border: '1px solid rgba(0,200,255,0.18)',
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              height: 'fit-content',
            }}
          >
            <div>
              <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 16, marginBottom: 4 }}>
                Want the full technical breakdown?
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Each phase has a detailed technical deep-dive — what gets built, what skills develop, and what tools you'll actually use.
              </p>
            </div>
            <Link to="/program" className="btn" style={{ 
              whiteSpace: 'nowrap', 
              fontSize: 14, 
              marginTop: 16,
              background: 'linear-gradient(135deg, #00c8ff, #7c3aed)',
              color: 'white',
              border: 'none',
              boxShadow: '0 4px 15px rgba(0,200,255,0.3)',
              transition: 'all 0.3s ease',
              fontWeight: 600,
            }}>
              View Full Technical Roadmap <ArrowRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
