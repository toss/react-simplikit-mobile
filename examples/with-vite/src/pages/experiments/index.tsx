import { Link } from 'react-router-dom';

const experiments = [
  {
    id: 'bento',
    name: 'Bento Grid',
    description: 'Linear/Notion-inspired. Asymmetric grid layout, hover effects, gradient cards.',
    color: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
    isNew: true,
  },
  {
    id: 'gradient-orb',
    name: 'Gradient Orb',
    description: 'Vercel/Linear-inspired. Floating gradient orbs, glassmorphism, mouse tracking.',
    color: 'linear-gradient(135deg, #ec4899, #6366f1)',
    isNew: true,
  },
  {
    id: 'apple',
    name: 'Apple',
    description: 'Apple-inspired. Massive typography, scroll animations, cinematic feel.',
    color: 'linear-gradient(135deg, #a855f7, #6366f1)',
    isNew: true,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'SWR-inspired. Clean, code-first approach with lots of whitespace.',
    color: '#000',
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Claude Code-inspired. Dark theme, capability contrast, status animations.',
    color: '#18181b',
  },
  {
    id: 'developer',
    name: 'Developer',
    description: 'useHooks-inspired. Hook library catalog, alphabetical listing, professional.',
    color: '#3b82f6',
  },
  {
    id: 'foundation',
    name: 'Foundation',
    description: 'shadcn/ui-inspired. Dark mode first, "Open Source. Open Code." philosophy.',
    color: '#09090b',
  },
  {
    id: 'dark-modern',
    name: 'Dark Modern',
    description: 'Tailwind CSS-inspired. Section markers, multi-color accents, monospace.',
    color: '#0f172a',
  },
  {
    id: 'claude-code',
    name: 'Claude Code',
    description: 'Claude Code-inspired. Animated symbols, typewriter effect, warm accents.',
    color: '#0a0a0b',
  },
];

export function ExperimentsIndex() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f8fafc',
        fontFamily: 'system-ui, sans-serif',
        padding: '40px 24px',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <Link
            to="/"
            style={{
              color: '#64748b',
              fontSize: 14,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              marginBottom: 16,
            }}
          >
            ← Back to Home
          </Link>
          <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8, color: '#0f172a' }}>Landing Page Experiments</h1>
          <p style={{ fontSize: 16, color: '#64748b', lineHeight: 1.6 }}>
            Different styles for the @react-simplikit/mobile landing page.
            <br />
            Each experiment is inspired by a different open source library.
          </p>
        </div>

        {/* Experiment Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {experiments.map(exp => (
            <Link
              key={exp.id}
              to={`/experiments/${exp.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                padding: 24,
                backgroundColor: '#fff',
                borderRadius: 12,
                textDecoration: 'none',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                transition: 'transform 150ms, box-shadow 150ms',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)';
              }}
            >
              {/* Color indicator */}
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 12,
                  background: exp.color,
                  flexShrink: 0,
                }}
              />

              {/* Content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h2 style={{ fontSize: 18, fontWeight: 600, color: '#0f172a' }}>{exp.name}</h2>
                  {'isNew' in exp && exp.isNew && (
                    <span
                      style={{
                        padding: '2px 8px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#fff',
                        fontSize: 10,
                        fontWeight: 600,
                        borderRadius: 100,
                        textTransform: 'uppercase',
                      }}
                    >
                      New
                    </span>
                  )}
                </div>
                <p style={{ fontSize: 14, color: '#64748b', margin: 0 }}>{exp.description}</p>
              </div>

              {/* Arrow */}
              <div style={{ color: '#94a3b8', fontSize: 20 }}>→</div>
            </Link>
          ))}
        </div>

        {/* Current Landing Link */}
        <div
          style={{
            marginTop: 32,
            padding: 20,
            backgroundColor: '#eff6ff',
            borderRadius: 12,
            border: '1px solid #bfdbfe',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, color: '#1e40af', marginBottom: 4 }}>Current Landing</div>
              <div style={{ fontSize: 14, color: '#3b82f6' }}>View the current production landing page</div>
            </div>
            <Link
              to="/landing"
              style={{
                padding: '8px 16px',
                backgroundColor: '#3b82f6',
                color: '#fff',
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
