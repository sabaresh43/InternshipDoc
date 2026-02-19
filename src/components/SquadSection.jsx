import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Code2, Brain, Lightbulb, Rocket, ArrowRight, Users } from 'lucide-react';

const members = [
  { type: 'A', name: 'The Builder', icon: Code2, color: '#00c8ff', x: 0, y: -80 },
  { type: 'B', name: 'The Researcher', icon: Brain, color: '#7c3aed', x: 90, y: 30 },
  { type: 'C', name: 'The Product Mind', icon: Lightbulb, color: '#f59e0b', x: 0, y: 80 },
  { type: 'D', name: 'The Grower', icon: Rocket, color: '#10b981', x: -90, y: 30 },
];

const principles = [
  {
    title: 'The Builder',
    desc: 'Technically confident in coding, system building, and implementation. Comfortable handling engineering-level problems and making the system actually run.',
    color: '#00c8ff',
  },
  {
    title: 'The Researcher',
    desc: 'Enjoys exploring, experimenting, and understanding how things work at a deeper level. Strong in analysis, model thinking, and improving concepts.',
    color: '#7c3aed',
  },
  {
    title: 'The Product Mind',
    desc: 'Thinks about users, real-world problems, and usability. Connects technical work to real-world application and stops the team building solutions without problems.',
    color: '#f59e0b',
  },
  {
    title: 'The Grower',
    desc: 'May be at an earlier stage technically but is motivated, curious, and eager. Contributes documentation, testing, and effort while developing fast within the group.',
    color: '#10b981',
  },
];

export default function SquadSection() {
  const [ref, inView] = useInView(0.15);
  const [hovered, setHovered] = useState(null);

  return (
    <section className="section" ref={ref} style={{ background: 'var(--bg-2)' }}>
      <div className="orb" style={{ width: 400, height: 400, background: 'rgba(0,200,255,0.06)', bottom: '10%', left: '-5%' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 60, alignItems: 'center' }}>

          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ x: -40, opacity: 0 }}
              animate={inView ? { x: 0, opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              <span className="section-tag"><Users size={12} /> Squad Formation</span>
              <h2 className="section-title">Each Squad is a<br /><span className="grad-violet">Mini AI Startup</span></h2>
              <p className="section-subtitle" style={{ marginBottom: 36 }}>
                Each group is built around four complementary strengths.
                Someone who builds. Someone who researches. Someone who thinks about the product.
                Someone who is growing. Grouping is deliberate — not random, not alphabetical.
              </p>
            </motion.div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {principles.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ x: -30, opacity: 0 }}
                  animate={inView ? { x: 0, opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}
                >
                  <div style={{
                    flexShrink: 0,
                    width: 10, height: 10, borderRadius: '50%',
                    background: p.color,
                    marginTop: 6,
                    boxShadow: `0 0 8px ${p.color}66`,
                  }} />
                  <div>
                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{p.title}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Squad visualizer */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              minHeight: 380,
            }}
          >
            {/* Central hub */}
            <div style={{ position: 'relative', width: 280, height: 280 }}>
              {/* SVG lines */}
              <svg width="280" height="280" style={{ position: 'absolute', inset: 0 }}>
                {members.map((m) => (
                  <line
                    key={m.type}
                    x1={140}
                    y1={140}
                    x2={140 + m.x}
                    y2={140 + m.y}
                    stroke={m.color}
                    strokeWidth={hovered === m.type ? 2 : 1}
                    strokeOpacity={hovered === m.type ? 0.7 : 0.25}
                    strokeDasharray="4 4"
                  />
                ))}
              </svg>

              {/* Center node */}
              <div style={{
                position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(0,200,255,0.15), rgba(124,58,237,0.15))',
                border: '2px solid rgba(124,58,237,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2,
              }}>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 12, color: 'var(--cyan)', textAlign: 'center', lineHeight: 1.3 }}>SQUAD</span>
              </div>

              {/* Member nodes */}
              {members.map((m, i) => {
                const Icon = m.icon;
                return (
                  <motion.div
                    key={m.type}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.12 }}
                    onMouseEnter={() => setHovered(m.type)}
                    onMouseLeave={() => setHovered(null)}
                    style={{
                      position: 'absolute',
                      top: `calc(50% + ${m.y}px)`,
                      left: `calc(50% + ${m.x}px)`,
                      transform: 'translate(-50%, -50%)',
                      zIndex: 3,
                    }}
                  >
                    <div style={{
                      width: 56, height: 56, borderRadius: '50%',
                      background: `${m.color}18`,
                      border: `2px solid ${m.color}55`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      transform: hovered === m.type ? 'scale(1.2)' : 'scale(1)',
                      boxShadow: hovered === m.type ? `0 0 20px ${m.color}44` : 'none',
                    }}>
                      <Icon size={20} color={m.color} />
                    </div>

                    {hovered === m.type && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                          position: 'absolute',
                          top: '110%', left: '50%', transform: 'translateX(-50%)',
                          background: 'var(--bg-3)',
                          border: `1px solid ${m.color}44`,
                          borderRadius: 8,
                          padding: '6px 10px',
                          whiteSpace: 'nowrap',
                          fontSize: 11,
                          color: m.color,
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontWeight: 600,
                        }}
                      >
                        {m.name}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Member labels */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginTop: 20 }}>
              {members.map(m => {
                const Icon = m.icon;
                return (
                  <div key={m.type} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 100, background: `${m.color}10`, border: `1px solid ${m.color}33` }}>
                    <Icon size={11} color={m.color} />
                    <span style={{ fontSize: 11, color: m.color, fontWeight: 500 }}>{m.name}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
