import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Check, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

const phases = [
  {
    num: '01',
    months: 'Months 1–2',
    label: 'Foundation',
    color: '#00c8ff',
    icon: '⚡',
    headline: 'Foundation & Engineering Orientation',
    objective:
      'Establish strong practical engineering discipline before building large systems. Every student — regardless of prior experience — reaches the same engineering baseline. Nobody builds a product on foundations they do not understand.',
    whatTheyBuild: [
      'Simple RAG-based chatbot',
      'Document Q&A system',
      'Text summarization tool',
      'Structured data assistant',
    ],
    practicalActivities: {
      'Development Environment & Workflow': [
        'Structured local environment setup and configuration',
        'Professional project folder organization',
        'Git and GitHub: branches, PRs, and code reviews',
        'Collaborative work in shared repositories',
        'README documentation and clean code practices',
      ],
      'Mini AI System Build': [
        'Embedding generation and management',
        'Vector database setup and querying',
        'Chunking strategies for documents',
        'API endpoint creation and testing',
        'Backend-to-model connection',
        'Basic session memory handling',
      ],
      'System Architecture Exposure': [
        'How a request flows through a real system',
        'Backend–model–database interaction patterns',
        'Basic logging and error handling',
        'API structure and endpoint design',
        'Light introduction to containerization concepts',
      ],
    },
    skills: ['Python', 'Git & GitHub', 'Clean Code', 'REST APIs', 'Vector DBs', 'Embeddings', 'RAG Basics', 'Session Memory'],
    outcomes: [
      'Can build and run an AI-powered application end to end',
      'Can collaborate in a shared repository with proper workflows',
      'Understands system-level AI integration, not just model usage',
      'Ready for product-scale architecture thinking in Month 3',
    ],
  },
  {
    num: '02',
    months: 'Month 3',
    label: 'Architecture',
    color: '#7c3aed',
    icon: '🏗️',
    headline: 'Idea Structuring & Product Architecture',
    objective:
      'If you cannot explain your system clearly, you are not ready to build it. Month 3 exists to prevent squads from confidently building in the wrong direction. No product code begins without a structured, mentor-approved architecture document. This is the checkpoint that saves nine months of wasted effort.',
    whatTheyBuild: [
      'Full system architecture document',
      'Technical feasibility analysis',
      'Data acquisition and sourcing strategy',
      'Risk register with mentor sign-off',
      'Ethics and bias pre-analysis',
    ],
    practicalActivities: {
      'Product Definition': [
        'One AI product idea, finalized and scoped',
        'Real-world problem statement with evidence',
        'Target user identification and persona mapping',
        'Technical feasibility assessment',
      ],
      'System Design': [
        'Full system architecture with component diagrams',
        'Tech stack selection with justification',
        'RAG vs classical ML evaluation for the product',
        'Multi-RAG architecture consideration',
        'Memory design: short-term vs persistent storage',
      ],
      'Planning & Risk': [
        'Backend structure and API planning',
        'Security layer consideration',
        'Basic scalability planning',
        'Milestone breakdown and squad task allocation',
        'Ethics analysis and bias identification',
      ],
    },
    skills: ['System Design', 'Product Thinking', 'Architecture Diagrams', 'Multi-RAG Planning', 'Memory Design', 'Ethics in AI', 'Risk Analysis'],
    outcomes: [
      'Approved architecture document reviewed by mentors',
      'Defined 6-month development roadmap per squad',
      'Clear technical scope and task allocation before a line of code is written',
      'Squad aligned on direction, constraints, and responsibilities',
    ],
  },
  {
    num: '03',
    months: 'Months 4–6',
    label: 'Core Build',
    color: '#10b981',
    icon: '🚀',
    headline: 'Core Product Development',
    objective:
      'Architecture approved. Now you build. From data ingestion to model integration to backend API to internal demo — this is where the system starts to feel real. No prototyping allowed. This is production-trajectory code from day one. Squads ship working software, not demos that only run on the presenter\'s machine.',
    whatTheyBuild: [
      'Full data ingestion and preprocessing pipeline',
      'Embedding pipeline with chunking logic',
      'Multi-level retrieval system',
      'Model evaluation and output scoring layer',
      'Backend API with structured endpoints',
      'Role-based access system (where applicable)',
      'Internal demo — functional, not faked',
    ],
    practicalActivities: {
      'Data & Model Layer': [
        'Data ingestion and preprocessing pipelines',
        'Embedding pipeline with smart chunking strategies',
        'Vector database integration and indexing',
        'Multi-level retrieval systems (sparse + dense)',
        'Model evaluation and output scoring',
      ],
      'Backend & API': [
        'Structured FastAPI backend with versioned endpoints',
        'Database schema design and ORM integration',
        'Role-based access control (where applicable)',
        'Logging, monitoring basics, and error handling',
        'Graceful fallback logic for model failures',
      ],
      'Refinement': [
        'Prompt engineering and context window control',
        'Output validation and format enforcement',
        'Failure handling and graceful degradation',
        'Basic caching strategies for expensive calls',
        'API response time optimization',
      ],
    },
    skills: ['FastAPI', 'PostgreSQL', 'Multi-RAG Pipelines', 'Prompt Engineering', 'Experiment Tracking', 'MLflow', 'Context Management', 'Caching'],
    outcomes: [
      'Functional AI product with a structured, documented backend',
      'Internal demo milestone reached and reviewed',
      'Model integrated and performing against defined benchmarks',
      'System ready to enter production hardening',
    ],
  },
  {
    num: '04',
    months: 'Months 7–8',
    label: 'Production',
    color: '#f59e0b',
    icon: '🌐',
    headline: 'Production & Scaling',
    objective:
      '"Does this work on my laptop?" is no longer the question. The question is: "Does this hold up when someone actually uses it?" Experimentation ends. Production thinking begins. Everything gets hardened, deployed, monitored, and made to survive real traffic — even if that traffic is small.',
    whatTheyBuild: [
      'Containerized application with Docker',
      'CI/CD pipeline (automated build, test, and deploy)',
      'Cloud-hosted live system on AWS or GCP',
      'Monitoring and alerting dashboard',
      'Centralized error logging system',
      'Security-hardened endpoints with input validation',
    ],
    practicalActivities: {
      'Deployment Infrastructure': [
        'Full Docker containerization of the application',
        'CI/CD pipeline setup and automation',
        'Cloud deployment on AWS or GCP',
        'Environment variable and secrets management',
        'Infrastructure as code (introductory level)',
      ],
      'Monitoring & Reliability': [
        'Monitoring dashboards with Prometheus and Grafana',
        'Centralized error logging and alerting',
        'Uptime and availability tracking',
        'Model drift detection and alerts',
        'Basic incident response practices',
      ],
      'Scaling & Security': [
        'Handling multiple concurrent users without degradation',
        'Latency optimization strategies and measurement',
        'Resource usage control and cost awareness',
        'Token cost budgeting and monitoring',
        'Input validation and prompt injection mitigation',
        'Security hardening of API endpoints',
      ],
    },
    skills: ['Docker', 'CI/CD', 'AWS / GCP', 'Prometheus', 'Grafana', 'MLOps', 'Security Hardening', 'Infrastructure as Code'],
    outcomes: [
      'Live deployed system accessible to real users',
      'Stable monitored service with alerting in place',
      'Production-ready architecture fully documented',
      'Security baseline established and tested',
    ],
  },
  {
    num: '05',
    months: 'Months 9–10',
    label: 'Optimization',
    color: '#ec4899',
    icon: '🔬',
    headline: 'Optimization & Maturity',
    objective:
      'Good enough is not enough. The system works. Now make it defensible — benchmarked, bias-tested, explainable, and provably better than where it started. This is the phase that separates people who built something from people who understand what they built. The research layer also begins here.',
    whatTheyBuild: [
      'Performance benchmarking report with before/after metrics',
      'Latency and cost analysis across system components',
      'A/B prompt testing framework',
      'Explainability and bias analysis layer',
      'Prompt version control system',
      'Model upgrade and comparison test results',
    ],
    practicalActivities: {
      'Performance Work': [
        'Retrieval accuracy measurement and improvement',
        'Hallucination reduction strategies and testing',
        'Latency profiling across the full request path',
        'Memory and token optimization',
        'Performance benchmarking across system versions',
      ],
      'Research Layer': [
        'A/B prompt testing design and analysis',
        'Prompt version control and comparative tracking',
        'Model upgrade and replacement testing',
        'Explainability with SHAP and LIME',
        'Robustness and edge case stress testing',
      ],
      'Security & Stability': [
        'Security re-audit and hardening',
        'Bias identification and mitigation strategies',
        'Adversarial input handling',
        'Cost optimization audit',
        'Long-term stability verification',
      ],
    },
    skills: ['SHAP / LIME', 'Latency Profiling', 'A/B Testing', 'Bias Analysis', 'Prompt Versioning', 'Cost Optimization', 'Robustness Testing'],
    outcomes: [
      'Measurably optimized AI product with documented benchmarks',
      'Stable production behavior verified under edge cases',
      'Explainability layer for model outputs in place',
      'System defensible in a rigorous technical review',
    ],
  },
  {
    num: '06',
    months: 'Months 11–12',
    label: 'Showcase',
    color: '#f97316',
    icon: '🎯',
    headline: 'Finalization & Demo Day',
    objective:
      'Twelve months of work. One room. One shot. You present as a system builder — not as a student who attended a program. The technical whitepaper and live demo are the final proof of everything the squad built. There is no safety net. There is no "we almost finished it."',
    whatTheyBuild: [
      '15–20 page technical whitepaper per squad',
      'Annotated architecture diagrams',
      'Deployment and operations guide',
      'Experimental results report with analysis',
      'Personal contribution statement per student',
      'Live product demonstration',
    ],
    practicalActivities: {
      'Documentation': [
        '15–20 page technical whitepaper authored by the squad',
        'Annotated architecture diagrams and system maps',
        'Deployment and operations guide for continuity',
        'Experimental results table with honest analysis',
        'Limitations and future work section',
        'Each student writes their personal contribution report',
      ],
      'Demo Day Preparation': [
        'Live product demonstration under real conditions',
        'Technical architecture defense — panel will dig in',
        'Business viability pitch for the product',
        'Q&A preparation with difficult questions anticipated',
        'Presentation reviewed and rehearsed with mentors',
      ],
    },
    skills: ['Technical Writing', 'Architecture Defense', 'Research Methodology', 'Public Presentation', 'Business Pitch', 'Ethics Review'],
    outcomes: [
      'Squad technical whitepaper published and on record',
      'Portfolio-ready GitHub with full project history',
      'Live demo successfully presented and defended before a panel',
      'Personal contributions documented, verified, and owned',
    ],
  },
];

const accelerators = [
  {
    title: 'Theory Becomes System-Level Understanding',
    desc: 'You do not just learn what a RAG pipeline is. You build one, break it, fix it, deploy it, and monitor it. That is a fundamentally different kind of understanding — and it shows in interviews.',
    color: '#00c8ff',
  },
  {
    title: 'Real Benchmarking Replaces Assumption',
    desc: 'Every model decision is tracked and measured. Not "I think this prompt is better" — but "here is the latency drop, here is the benchmark diff, here is the hallucination rate before and after."',
    color: '#7c3aed',
  },
  {
    title: 'Technical Communication Gets Sharp',
    desc: 'Architecture defense, whitepaper authorship, Q&A with real reviewers. Dissertation committee panels suddenly feel a lot less intimidating when you have already done it.',
    color: '#10b981',
  },
  {
    title: 'Confidence Before Dissertation Work',
    desc: 'You will have already built and defended a production AI system. That context changes how you think about your research question — and how you answer questions about it.',
    color: '#f59e0b',
  },
  {
    title: 'Job Readiness Through Deployment Experience',
    desc: 'Hiring managers ask: "Have you deployed AI to production?" After this program, the answer is yes — with a live URL, a GitHub history, and a whitepaper to back it up.',
    color: '#ec4899',
  },
  {
    title: 'Specialization Within a Collaborative Model',
    desc: 'You enter as one of four complementary types. You exit having gone deep in your lane — while understanding everyone else\'s lane well enough to lead across it.',
    color: '#f97316',
  },
];

function PhaseDetailCard({ phase }) {
  const [ref, inView] = useInView(0.08);

  return (
    <motion.div
      ref={ref}
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderLeft: `4px solid ${phase.color}`,
        borderRadius: 20,
        padding: 'clamp(24px, 4vw, 40px)',
        marginBottom: 24,
      }}
    >
      {/* Phase header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, flexWrap: 'wrap' }}>
        <span style={{ fontSize: 24 }}>{phase.icon}</span>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: phase.color,
          fontWeight: 700,
          letterSpacing: '0.1em',
          background: `${phase.color}14`,
          padding: '4px 10px',
          borderRadius: 6,
        }}>
          PHASE {phase.num}
        </div>
        <div style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.06em',
        }}>
          {phase.months.toUpperCase()}
        </div>
        <div style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 600,
          fontSize: 12,
          color: phase.color,
          background: `${phase.color}12`,
          border: `1px solid ${phase.color}30`,
          padding: '3px 10px',
          borderRadius: 100,
        }}>
          {phase.label}
        </div>
      </div>

      <h2 style={{
        fontFamily: 'Space Grotesk, sans-serif',
        fontSize: 'clamp(1.25rem, 2.5vw, 1.7rem)',
        fontWeight: 700,
        marginBottom: 14,
        color: '#e2e8f0',
      }}>
        {phase.headline}
      </h2>

      <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 36, maxWidth: 780 }}>
        {phase.objective}
      </p>

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 40 }}>

        {/* Left: What they build + activities */}
        <div>
          {phase.whatTheyBuild && (
            <div style={{ marginBottom: 28 }}>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10,
                color: phase.color,
                letterSpacing: '0.12em',
                marginBottom: 12,
                fontWeight: 700,
              }}>
                WHAT THEY BUILD
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {phase.whatTheyBuild.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: phase.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.5 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {Object.entries(phase.practicalActivities).map(([category, items]) => (
            <div key={category} style={{ marginBottom: 20 }}>
              <div style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--text-dim)',
                fontFamily: 'Space Grotesk, sans-serif',
                marginBottom: 8,
                letterSpacing: '0.02em',
              }}>
                {category}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <span style={{ fontSize: 11, color: phase.color, marginTop: 3, flexShrink: 0 }}>→</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right: Skills + Outcomes */}
        <div>
          <div style={{ marginBottom: 32 }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              color: phase.color,
              letterSpacing: '0.12em',
              marginBottom: 12,
              fontWeight: 700,
            }}>
              SKILLS DEVELOPED
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {phase.skills.map((skill, i) => (
                <span key={i} style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11,
                  color: phase.color,
                  background: `${phase.color}12`,
                  border: `1px solid ${phase.color}28`,
                  padding: '5px 11px',
                  borderRadius: 6,
                }}>
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10,
              color: phase.color,
              letterSpacing: '0.12em',
              marginBottom: 12,
              fontWeight: 700,
            }}>
              PHASE OUTCOMES
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {phase.outcomes.map((outcome, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%',
                    background: `${phase.color}18`,
                    border: `1px solid ${phase.color}40`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, marginTop: 1,
                  }}>
                    <Check size={10} color={phase.color} strokeWidth={3} />
                  </div>
                  <span style={{ fontSize: 14, color: 'var(--text-dim)', lineHeight: 1.6 }}>{outcome}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function AccelerationSection() {
  const [ref, inView] = useInView(0.1);

  return (
    <section ref={ref} style={{ background: 'var(--bg-2)', padding: '96px 0' }}>
      <div className="orb" style={{ width: 500, height: 500, background: 'rgba(124,58,237,0.06)', top: '10%', right: '-10%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ marginBottom: 56 }}
        >
          <span className="section-tag">The Bigger Picture</span>
          <h2 className="section-title">How This Accelerates Your AI Development</h2>
          <p className="section-subtitle">
            The program does not just teach you to build AI systems. It changes how you think about them — and how confidently you defend, explain, and improve them.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 72 }}>
          {accelerators.map((item, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="card"
              style={{ borderTop: `3px solid ${item.color}` }}
            >
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}66`, marginBottom: 16 }} />
              <h3 style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 16,
                fontWeight: 600,
                marginBottom: 10,
                color: '#e2e8f0',
              }}>
                {item.title}
              </h3>
              <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.7 }}>{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          style={{
            textAlign: 'center',
            padding: '56px 40px',
            background: 'linear-gradient(135deg, rgba(0,200,255,0.06), rgba(124,58,237,0.06))',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: 24,
          }}
        >
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.1em', marginBottom: 20 }}>
            THE RESULT
          </div>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: 16 }}>
            They will not just{' '}
            <span style={{ color: 'var(--text-muted)', textDecoration: 'line-through' }}>understand AI.</span>
          </h2>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', fontWeight: 700, marginBottom: 24 }}>
            They will have{' '}
            <span className="grad-multi">built, deployed, scaled, secured, and defended AI.</span>
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto', lineHeight: 1.8 }}>
            A structured transformation from AI student to AI systems builder — profiled, grouped, aligned, and guided. Never hand-held. The scar tissue and the portfolio are yours to keep.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default function ProgramPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const phaseBarColors = phases.map(p => p.color);

  return (
    <>
      {/* Page hero */}
      <section style={{
        background: 'linear-gradient(180deg, var(--bg) 0%, var(--bg-2) 60%, var(--bg) 100%)',
        paddingTop: 120,
        paddingBottom: 80,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="orb" style={{ width: 400, height: 400, background: 'rgba(0,200,255,0.06)', top: '-10%', left: '-5%' }} />
        <div className="orb" style={{ width: 400, height: 400, background: 'rgba(124,58,237,0.06)', bottom: '-10%', right: '-5%' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-muted)',
              marginBottom: 40,
              transition: 'color 0.2s',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={14} /> Back to Program Overview
          </Link>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-tag">Technical Deep Dive</span>
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: 20,
              background: 'linear-gradient(135deg, #fff 0%, var(--text-dim) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              12 Months. 6 Phases.<br />One Deployed AI Product.
            </h1>
            <p style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              color: 'var(--text-muted)',
              maxWidth: 620,
              lineHeight: 1.8,
              marginBottom: 48,
            }}>
              A detailed breakdown of what you will build, learn, and deploy across every phase.
              No theory without context. No context without implementation. No phase without a deliverable.
            </p>
          </motion.div>

          {/* Phase overview bar */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}
          >
            {phases.map((phase, i) => (
              <div key={phase.num} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  background: `${phase.color}10`,
                  border: `1px solid ${phase.color}30`,
                  borderRadius: 10,
                  padding: '10px 16px',
                  minWidth: 88,
                  textAlign: 'center',
                }}>
                  <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, color: phase.color, fontWeight: 700, letterSpacing: '0.08em' }}>
                    PHASE {phase.num}
                  </div>
                  <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 12, fontWeight: 600, color: 'var(--text-dim)' }}>
                    {phase.label}
                  </div>
                </div>
                {i < phases.length - 1 && (
                  <span style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1 }}>→</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Phase detail cards */}
      <section style={{ background: 'var(--bg)', paddingBottom: 80 }}>
        <div className="container">
          {phases.map((phase) => (
            <PhaseDetailCard key={phase.num} phase={phase} />
          ))}
        </div>
      </section>

      <AccelerationSection />
      <Footer />
    </>
  );
}
