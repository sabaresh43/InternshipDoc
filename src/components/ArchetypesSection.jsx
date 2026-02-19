import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Code2, Brain, Lightbulb, Rocket, ChevronRight, RotateCcw } from 'lucide-react';

const archetypes = [
  {
    type: 'A',
    name: 'Engineering Anchor',
    icon: Code2,
    color: '#00c8ff',
    colorDim: 'rgba(0,200,255,0.1)',
    colorBorder: 'rgba(0,200,255,0.25)',
    traits: ['Systems thinker', 'Implementation-first', 'DevOps-aware', 'Clean code advocate'],
    desc: 'You debug at midnight by choice. Implementation is your first language. Every squad needs someone who can actually make the thing run — that\'s you.',
    role: 'Leads architecture, CI/CD, and deployment decisions.',
  },
  {
    type: 'B',
    name: 'ML / Research Anchor',
    icon: Brain,
    color: '#7c3aed',
    colorDim: 'rgba(124,58,237,0.1)',
    colorBorder: 'rgba(124,58,237,0.25)',
    traits: ['Conceptual thinker', 'Model-oriented', 'Research-aware', 'Experiment-driven'],
    desc: 'You care about why models work, not just that they work. You ask "did we actually validate this?" — and the squad is better for it.',
    role: 'Leads model selection, training pipelines, and evaluation.',
  },
  {
    type: 'C',
    name: 'Product Thinker',
    icon: Lightbulb,
    color: '#f59e0b',
    colorDim: 'rgba(245,158,11,0.1)',
    colorBorder: 'rgba(245,158,11,0.25)',
    traits: ['User-focused', 'Idea-generator', 'Creative problem-solver', 'Business-aware'],
    desc: 'You think in user flows before you think in code. You ask "who is this for?" before "how do we build it?" You stop the squad from building a solution without a problem.',
    role: 'Leads product definition, user personas, and business viability.',
  },
  {
    type: 'D',
    name: 'Growth Builder',
    icon: Rocket,
    color: '#10b981',
    colorDim: 'rgba(16,185,129,0.1)',
    colorBorder: 'rgba(16,185,129,0.25)',
    traits: ['High motivation', 'Fast learner', 'Structure-seeker', 'Collaborative'],
    desc: 'High motivation, early-stage skills, enormous potential. You may not have the depth yet — the program is built to meet you exactly where you are.',
    role: 'Contributes across all areas and grows into a specialized role over 12 months.',
  },
];

const interviewCriteria = [
  { num: '01', label: 'Academic & Internship Background', desc: 'Prior education and any hands-on exposure in tech or AI roles.' },
  { num: '02', label: 'Technical Exposure', desc: 'Programming familiarity, ML tools used, and general engineering comfort level.' },
  { num: '03', label: 'Problem-Solving Approach', desc: 'How you think through challenges — structured, intuitive, or exploratory.' },
  { num: '04', label: 'Learning Style & Work Preferences', desc: 'Whether you learn by doing, reading, collaborating, or experimenting.' },
  { num: '05', label: 'AI Domain Interests', desc: 'Which areas of AI genuinely interest you — NLP, vision, agents, RAG, and beyond.' },
  { num: '06', label: 'Career Aspirations', desc: 'What kind of AI professional you are working towards becoming.' },
  { num: '07', label: 'Residency Goals', desc: 'What you specifically want to gain, build, or prove in 12 months.' },
  { num: '08', label: 'Product Ideas', desc: 'What you would love to build — rough, half-baked ideas are just as valuable here.' },
];

const quizQuestions = [
  {
    q: 'When you encounter a new AI problem, what do you do first?',
    opts: [
      { label: 'Start coding a prototype immediately', type: 'A' },
      { label: 'Research existing papers and methods', type: 'B' },
      { label: 'Think about who would use this and why', type: 'C' },
      { label: 'Ask teammates what we should tackle first', type: 'D' },
    ],
  },
  {
    q: 'Which part excites you most in building an AI system?',
    opts: [
      { label: 'Cloud deployment, APIs, and infrastructure', type: 'A' },
      { label: 'Model architecture and training experiments', type: 'B' },
      { label: 'UX, product flow, and user feedback loops', type: 'C' },
      { label: 'Learning everything and filling any gap', type: 'D' },
    ],
  },
  {
    q: 'Your squad is stuck. What do you do?',
    opts: [
      { label: 'Debug the system, find the technical root cause', type: 'A' },
      { label: 'Run an experiment, test a new hypothesis', type: 'B' },
      { label: 'Reframe the problem from the user\'s perspective', type: 'C' },
      { label: 'Rally the team and break the problem into steps', type: 'D' },
    ],
  },
];

function ArchetypeCard({ arch, selected, onClick, index, inView }) {
  const Icon = arch.icon;
  return (
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onClick}
      style={{
        background: selected ? arch.colorDim : 'var(--card)',
        border: `1px solid ${selected ? arch.colorBorder : 'var(--border)'}`,
        borderRadius: 20,
        padding: 28,
        cursor: 'pointer',
        transition: 'all 0.3s',
        transform: selected ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 12, background: arch.colorDim, border: `1px solid ${arch.colorBorder}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={22} color={arch.color} />
        </div>
        <div>
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: arch.color, letterSpacing: '0.1em', marginBottom: 2 }}>TYPE {arch.type}</div>
          <h3 style={{ fontSize: 17, fontWeight: 600, color: '#fff', fontFamily: 'Space Grotesk, sans-serif' }}>{arch.name}</h3>
        </div>
      </div>

      <p style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.6 }}>{arch.desc}</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
        {arch.traits.map(t => (
          <span key={t} style={{ fontSize: 11, padding: '4px 10px', borderRadius: 100, background: arch.colorDim, color: arch.color, border: `1px solid ${arch.colorBorder}`, fontWeight: 500 }}>{t}</span>
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ paddingTop: 16, borderTop: `1px solid ${arch.colorBorder}` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <ChevronRight size={14} color={arch.color} style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: 'var(--text-dim)', lineHeight: 1.6 }}>{arch.role}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ArchetypesSection() {
  const [ref, inView] = useInView(0.1);
  const [selected, setSelected] = useState(null);
  const [quizMode, setQuizMode] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const currentQ = answers.length;

  function handleAnswer(type) {
    const next = [...answers, type];
    setAnswers(next);
    if (next.length === quizQuestions.length) {
      const counts = { A: 0, B: 0, C: 0, D: 0 };
      next.forEach(t => counts[t]++);
      const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    }
  }

  function resetQuiz() {
    setAnswers([]);
    setResult(null);
    setQuizMode(false);
  }

  const resultArch = result ? archetypes.find(a => a.type === result) : null;

  return (
    <section id="archetypes" className="section" ref={ref}>
      <div className="orb" style={{ width: 500, height: 500, background: 'rgba(124,58,237,0.07)', top: '20%', right: '-10%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <span className="section-tag">Student Profiles</span>
          <h2 className="section-title">The Four Archetypes</h2>
          <p className="section-subtitle">
            Every student is profiled and classified before squads are formed. No grouping without classification. No classification without the interview. This is how the right people end up in the right rooms.
          </p>
        </motion.div>

        {/* Interview block */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            marginBottom: 48,
            background: 'linear-gradient(135deg, rgba(0,200,255,0.04), rgba(124,58,237,0.04))',
            border: '1px solid rgba(0,200,255,0.18)',
            borderRadius: 20,
            padding: 'clamp(24px,4vw,40px)',
          }}
        >
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.12em', marginBottom: 10 }}>
              PHASE 0 — BEFORE EVERYTHING ELSE
            </div>
            <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 21, fontWeight: 700, marginBottom: 12 }}>
              The Profiling Interview
            </h3>
            <p style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.75, maxWidth: 700 }}>
              Every student undergoes a structured interview before entering the residency. This is not a test you pass or fail — it is a profiling conversation. We are trying to understand you as an individual, not screen you out. The insights from this interview determine your archetype classification, your squad placement, and ultimately your product direction. Nothing in the program begins without it.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 12 }}>
            {interviewCriteria.map((c) => (
              <div
                key={c.num}
                style={{
                  display: 'flex',
                  gap: 14,
                  alignItems: 'flex-start',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  padding: '14px 16px',
                }}
              >
                <div style={{
                  flexShrink: 0,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10,
                  color: 'var(--cyan)',
                  fontWeight: 700,
                  marginTop: 2,
                  letterSpacing: '0.05em',
                }}>
                  {c.num}
                </div>
                <div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 13, marginBottom: 3, color: 'var(--text-dim)' }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>{c.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Archetype cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, marginBottom: 48 }}>
          {archetypes.map((a, i) => (
            <ArchetypeCard
              key={a.type}
              arch={a}
              selected={selected === a.type}
              onClick={() => setSelected(s => s === a.type ? null : a.type)}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* Quiz CTA */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{
            background: 'linear-gradient(135deg, rgba(124,58,237,0.08), rgba(0,200,255,0.08))',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 20,
            padding: '36px 40px',
          }}
        >
          {!quizMode && !result && (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20 }}>
              <div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 20, fontWeight: 600, marginBottom: 8 }}>No idea which archetype fits you?</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 15 }}>Take the 3-question quiz. It won't judge you. Probably.</p>
              </div>
              <button className="btn btn-primary" onClick={() => setQuizMode(true)}>
                Find My Archetype <ChevronRight size={16} />
              </button>
            </div>
          )}

          {quizMode && !result && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: 6 }}>
                    QUESTION {currentQ + 1} / {quizQuestions.length}
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 19, fontWeight: 600 }}>
                    {quizQuestions[currentQ].q}
                  </h3>
                </div>
                <button onClick={resetQuiz} className="btn btn-outline" style={{ padding: '8px 14px', fontSize: 13 }}>
                  <RotateCcw size={14} /> Reset
                </button>
              </div>

              {/* Progress bar */}
              <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, marginBottom: 24, overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: `${(currentQ / quizQuestions.length) * 100}%` }}
                  style={{ height: '100%', background: 'linear-gradient(90deg,var(--cyan),var(--violet))', borderRadius: 2 }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12 }}>
                {quizQuestions[currentQ].opts.map(opt => (
                  <motion.button
                    key={opt.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswer(opt.type)}
                    style={{
                      background: 'var(--card)',
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      padding: '16px 18px',
                      color: 'var(--text)',
                      fontSize: 14,
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      lineHeight: 1.5,
                      transition: 'all 0.2s',
                    }}
                  >
                    {opt.label}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {result && resultArch && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              style={{ textAlign: 'center' }}
            >
              <div style={{
                width: 72, height: 72, borderRadius: 18,
                background: resultArch.colorDim,
                border: `2px solid ${resultArch.colorBorder}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <resultArch.icon size={32} color={resultArch.color} />
              </div>
              <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 12, color: resultArch.color, letterSpacing: '0.12em', marginBottom: 8 }}>
                YOUR ARCHETYPE
              </div>
              <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 26, fontWeight: 700, marginBottom: 12 }}>
                Type {resultArch.type} — {resultArch.name}
              </h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: 15 }}>{resultArch.role}</p>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="#apply" className="btn btn-primary">Apply as Type {result}</a>
                <button onClick={resetQuiz} className="btn btn-outline">
                  <RotateCcw size={14} /> Retake
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
