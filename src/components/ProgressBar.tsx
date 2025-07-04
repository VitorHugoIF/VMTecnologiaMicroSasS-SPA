export function ProgressBar() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 9999 }}>
      <div
        style={{
          height: 4,
          width: '100%',
          background: 'linear-gradient(90deg, #2563eb 0%, #60a5fa 50%, #2563eb 100%)',
          backgroundSize: '200% 100%',
          animation: 'progressBarIndeterminate 1.2s linear infinite',
        }}
      />
      <style>{`
        @keyframes progressBarIndeterminate {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  )
}
