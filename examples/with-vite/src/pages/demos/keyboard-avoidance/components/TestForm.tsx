import type { CSSProperties, FocusEvent } from 'react';
import { useState } from 'react';

type TestFormProps = {
  onFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

const inputStyle: CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  fontSize: '16px', // Prevents iOS zoom on focus
  border: '2px solid #d1d5db',
  borderRadius: '8px',
  boxSizing: 'border-box',
  outline: 'none',
};

/**
 * Test form with multiple inputs for keyboard avoidance testing
 */
export function TestForm({ onFocus, onBlur }: TestFormProps) {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange =
    (field: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues(prev => ({ ...prev, [field]: e.target.value }));
    };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={values.name}
          onChange={handleChange('name')}
          onFocus={onFocus}
          onBlur={onBlur}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={values.email}
          onChange={handleChange('email')}
          onFocus={onFocus}
          onBlur={onBlur}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>Phone</label>
        <input
          type="tel"
          placeholder="Enter your phone"
          value={values.phone}
          onChange={handleChange('phone')}
          onFocus={onFocus}
          onBlur={onBlur}
          style={inputStyle}
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '4px', fontSize: '14px', fontWeight: 500 }}>Message</label>
        <textarea
          placeholder="Enter your message"
          value={values.message}
          onChange={handleChange('message')}
          onFocus={onFocus}
          onBlur={onBlur}
          rows={4}
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {/* Spacer for scroll testing */}
      <div style={{ height: '300px', backgroundColor: '#f3f4f6', borderRadius: '8px', padding: '16px' }}>
        <p style={{ color: '#6b7280', textAlign: 'center', marginTop: '120px' }}>Scroll area for testing</p>
      </div>
    </div>
  );
}
