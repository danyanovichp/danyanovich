interface DecorativeBlobsProps {
  variant?: 'hero' | 'section' | 'footer';
  className?: string;
}

const blobConfigs = {
  hero: [
    { color: 'bg-pastel-yellow', shape: 'blob-squircle', size: 'w-64 h-64', position: 'top-0 -left-20', delay: '0s' },
    { color: 'bg-pastel-pink', shape: 'blob-organic', size: 'w-48 h-48', position: 'top-20 right-10', delay: '2s' },
    { color: 'bg-pastel-lavender', shape: 'blob-flower', size: 'w-56 h-56', position: 'bottom-10 left-1/3', delay: '4s' },
    { color: 'bg-pastel-mint', shape: 'blob-circle', size: 'w-40 h-40', position: '-bottom-10 right-1/4', delay: '1s' },
  ],
  section: [
    { color: 'bg-pastel-blue', shape: 'blob-organic', size: 'w-40 h-40', position: '-top-10 -right-10', delay: '0s' },
    { color: 'bg-pastel-coral', shape: 'blob-squircle', size: 'w-32 h-32', position: 'bottom-0 -left-10', delay: '3s' },
  ],
  footer: [
    { color: 'bg-pastel-yellow', shape: 'blob-flower', size: 'w-52 h-52', position: 'top-0 left-10', delay: '0s' },
    { color: 'bg-pastel-pink', shape: 'blob-squircle', size: 'w-44 h-44', position: 'top-20 right-20', delay: '2s' },
    { color: 'bg-pastel-lavender', shape: 'blob-organic', size: 'w-36 h-36', position: 'bottom-10 left-1/2', delay: '4s' },
  ],
};

const DecorativeBlobs = ({ variant = 'section', className = '' }: DecorativeBlobsProps) => {
  const blobs = blobConfigs[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
      {blobs.map((blob, i) => (
        <div
          key={i}
          className={`absolute ${blob.size} ${blob.color} ${blob.shape} opacity-20 blur-3xl animate-blob-drift`}
          style={{
            animationDelay: blob.delay,
            ...(blob.position.includes('top-0') ? { top: 0 } : {}),
          }}
        >
          <div className={`absolute ${blob.position}`} />
        </div>
      ))}
      {/* Render positioned correctly */}
      {blobs.map((blob, i) => (
        <div
          key={`positioned-${i}`}
          className={`absolute ${blob.position} ${blob.size} ${blob.color} ${blob.shape} opacity-15 blur-3xl animate-blob-drift`}
          style={{ animationDelay: blob.delay }}
        />
      ))}
    </div>
  );
};

export default DecorativeBlobs;
