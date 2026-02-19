import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from '../hooks/useInView';
import { Send, CheckCircle2, Code2, Brain, Lightbulb, Rocket } from 'lucide-react';

const archetypeOptions = [
  { value: 'A', label: 'Type A — Engineering Anchor', icon: Code2, color: '#00c8ff' },
  { value: 'B', label: 'Type B — ML / Research Anchor', icon: Brain, color: '#7c3aed' },
  { value: 'C', label: 'Type C — Product Thinker', icon: Lightbulb, color: '#f59e0b' },
  { value: 'D', label: 'Type D — Growth Builder', icon: Rocket, color: '#10b981' },
  { value: 'unknown', label: "Not sure yet", icon: null, color: 'var(--text-muted)' },
];

const domainOptions = [
  'AI Document Intelligence',
  'Enterprise RAG Systems',
  'AI Compliance Automation',
  'Workflow AI Copilot',
  'Business Decision Intelligence',
  'Other / Open to ideas',
];

const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10,
  padding: '13px 16px',
  color: 'var(--text)',
  fontSize: 15,
  fontFamily: 'Inter, sans-serif',
  outline: 'none',
  transition: 'border-color 0.2s',
};

const labelStyle = {
  display: 'block',
  fontFamily: 'Space Grotesk, sans-serif',
  fontWeight: 600,
  fontSize: 13,
  color: 'var(--text-dim)',
  marginBottom: 8,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

export default function ApplySection() {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState({
    name: '', email: '', university: '',
    archetype: '', domain: '', motivation: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusField, setFocusField] = useState(null);
  const [errors, setErrors] = useState({});

  function set(k, v) {
    setForm(f => ({ ...f, [k]: v }));
    if (errors[k]) setErrors(e => ({ ...e, [k]: undefined }));
  }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.archetype) e.archetype = 'Pick an archetype';
    if (!form.motivation.trim() || form.motivation.length < 30) e.motivation = 'Tell us more (30+ chars)';
    return e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('gentech_applications') ?? '[]');
    existing.push({ ...form, submittedAt: new Date().toISOString() });
    localStorage.setItem('gentech_applications', JSON.stringify(existing));
    setSubmitted(true);
  }

  const fieldStyle = (k) => ({
    ...inputStyle,
    borderColor: focusField === k ? 'rgba(0,200,255,0.5)' : errors[k] ? 'rgba(239,68,68,0.5)' : 'rgba(255,255,255,0.1)',
    boxShadow: focusField === k ? '0 0 0 3px rgba(0,200,255,0.1)' : 'none',
  });

  return (
    <section id="apply" className="section" ref={ref} style={{ background: 'var(--bg)' }}>
      <div className="orb" style={{ width: 600, height: 600, background: 'rgba(124,58,237,0.07)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <span className="section-tag">Join the Residency</span>
          <h2 className="section-title">Apply Now</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            MSc AI students who want to build, deploy, and own real AI systems.
            No glorified task-runners. Tell us who you are — we'll find where you fit.
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ maxWidth: 720, margin: '0 auto' }}
        >
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                style={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 24,
                  padding: 'clamp(28px,4vw,48px)',
                }}
              >
                {/* Row 1: Name + Email */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 20, marginBottom: 24 }}>
                  <div>
                    <label style={labelStyle}>Full Name *</label>
                    <input
                      type="text"
                      placeholder="Ada Lovelace"
                      value={form.name}
                      onChange={e => set('name', e.target.value)}
                      onFocus={() => setFocusField('name')}
                      onBlur={() => setFocusField(null)}
                      style={fieldStyle('name')}
                    />
                    {errors.name && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 4 }}>{errors.name}</div>}
                  </div>
                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      placeholder="ada@university.ac.uk"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      onFocus={() => setFocusField('email')}
                      onBlur={() => setFocusField(null)}
                      style={fieldStyle('email')}
                    />
                    {errors.email && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 4 }}>{errors.email}</div>}
                  </div>
                </div>

                {/* University */}
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>University / Program</label>
                  <input
                    type="text"
                    placeholder="MSc AI, University of Edinburgh"
                    value={form.university}
                    onChange={e => set('university', e.target.value)}
                    onFocus={() => setFocusField('university')}
                    onBlur={() => setFocusField(null)}
                    style={fieldStyle('university')}
                  />
                </div>

                {/* Archetype selector */}
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Your Archetype *</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(140px,1fr))', gap: 10 }}>
                    {archetypeOptions.map(a => {
                      const Icon = a.icon;
                      const isSelected = form.archetype === a.value;
                      return (
                        <button
                          key={a.value}
                          type="button"
                          onClick={() => set('archetype', a.value)}
                          style={{
                            background: isSelected ? `${a.color}18` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${isSelected ? a.color + '55' : 'rgba(255,255,255,0.08)'}`,
                            borderRadius: 10,
                            padding: '12px 10px',
                            cursor: 'pointer',
                            color: isSelected ? a.color : 'var(--text-muted)',
                            fontSize: 12,
                            fontFamily: 'Space Grotesk, sans-serif',
                            fontWeight: 600,
                            textAlign: 'center',
                            transition: 'all 0.2s',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                          }}
                        >
                          {Icon && <Icon size={16} color={isSelected ? a.color : 'var(--text-muted)'} />}
                          {a.label}
                        </button>
                      );
                    })}
                  </div>
                  {errors.archetype && <div style={{ fontSize: 12, color: 'var(--red)', marginTop: 6 }}>{errors.archetype}</div>}
                </div>

                {/* Domain interest */}
                <div style={{ marginBottom: 24 }}>
                  <label style={labelStyle}>Domain Interest</label>
                  <select
                    value={form.domain}
                    onChange={e => set('domain', e.target.value)}
                    onFocus={() => setFocusField('domain')}
                    onBlur={() => setFocusField(null)}
                    style={{
                      ...fieldStyle('domain'),
                      appearance: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="" style={{ background: '#0d1527' }}>Select a focus area...</option>
                    {domainOptions.map(d => (
                      <option key={d} value={d} style={{ background: '#0d1527' }}>{d}</option>
                    ))}
                  </select>
                </div>

                {/* Motivation */}
                <div style={{ marginBottom: 32 }}>
                  <label style={labelStyle}>Why do you want to join? *</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us what drives you, what you'd actually love to build, and what kind of AI engineer you're trying to become. Rough ideas are welcome — that's what the program is for."
                    value={form.motivation}
                    onChange={e => set('motivation', e.target.value)}
                    onFocus={() => setFocusField('motivation')}
                    onBlur={() => setFocusField(null)}
                    style={{
                      ...fieldStyle('motivation'),
                      resize: 'vertical',
                      lineHeight: 1.7,
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                    {errors.motivation && <div style={{ fontSize: 12, color: 'var(--red)' }}>{errors.motivation}</div>}
                    <div style={{ fontSize: 12, color: form.motivation.length >= 30 ? 'var(--green)' : 'var(--text-muted)', marginLeft: 'auto' }}>
                      {form.motivation.length} chars
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', justifyContent: 'center', padding: '15px', fontSize: 16 }}
                >
                  Submit Application <Send size={16} />
                </button>

                <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 16 }}>
                  Applications are stored locally. The program team will reach out via email.
                </p>
              </motion.form>
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                style={{
                  background: 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(0,200,255,0.08))',
                  border: '1px solid rgba(16,185,129,0.3)',
                  borderRadius: 24,
                  padding: 56,
                  textAlign: 'center',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  style={{ marginBottom: 24 }}
                >
                  <CheckCircle2 size={64} color="var(--green)" style={{ margin: '0 auto' }} />
                </motion.div>
                <h3 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 28, fontWeight: 700, marginBottom: 12 }}>
                  Application Received!
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 16, marginBottom: 8, lineHeight: 1.7 }}>
                  Welcome, <strong style={{ color: 'var(--text)' }}>{form.name}</strong>.
                  Your interest has been recorded.
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, marginBottom: 32 }}>
                  We'll reach out at <strong style={{ color: 'var(--cyan)' }}>{form.email}</strong> with next steps.
                  Interview. Classification. Squad. Product. In that order.
                </p>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', borderRadius: 100, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)' }}>
                  <CheckCircle2 size={14} color="var(--green)" />
                  <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>Squad formation begins soon</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
