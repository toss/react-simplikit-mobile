import { Card } from './Card.tsx';

interface QRCodeProps {
  url?: string;
  size?: number;
}

export function QRCode({ url = window.location.href, size = 200 }: QRCodeProps) {
  // Hide on mobile devices
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    return null;
  }

  const qrCodeUrl = `https://chart.googleapis.com/chart?cht=qr&chs=${size}x${size}&chl=${encodeURIComponent(url)}`;

  return (
    <Card title="📲 Scan with Mobile">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--spacing-md)',
        }}
      >
        <img
          src={qrCodeUrl}
          alt="QR Code"
          style={{
            width: size,
            height: size,
            border: '2px solid var(--color-gray-200)',
            borderRadius: 'var(--radius-md)',
          }}
        />
        <p
          style={{
            margin: 0,
            fontSize: '14px',
            color: 'var(--color-gray-600)',
            textAlign: 'center',
          }}
        >
          Scan this QR code with your mobile device to test the demo
        </p>
        <div
          style={{
            fontSize: '12px',
            color: 'var(--color-gray-500)',
            backgroundColor: 'var(--color-gray-50)',
            padding: 'var(--spacing-sm)',
            borderRadius: 'var(--radius-sm)',
            wordBreak: 'break-all',
            width: '100%',
            textAlign: 'center',
          }}
        >
          {url}
        </div>
      </div>
    </Card>
  );
}
