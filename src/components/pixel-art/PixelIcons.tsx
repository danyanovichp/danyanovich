interface PixelIconProps {
  type: 'notion' | 'ai' | 'template' | 'course' | 'package';
  className?: string;
}

const PixelIcon = ({ type, className = "" }: PixelIconProps) => {
  const icons = {
    notion: (
      <svg viewBox="0 0 32 32" className={`w-full h-full ${className}`} style={{ imageRendering: 'pixelated' }}>
        <rect x="4" y="4" width="24" height="24" fill="hsl(var(--primary))" />
        <rect x="8" y="8" width="16" height="2" fill="hsl(var(--background))" />
        <rect x="8" y="12" width="12" height="2" fill="hsl(var(--background))" />
        <rect x="8" y="16" width="14" height="2" fill="hsl(var(--background))" />
        <rect x="8" y="20" width="10" height="2" fill="hsl(var(--background))" />
      </svg>
    ),
    ai: (
      <svg viewBox="0 0 32 32" className={`w-full h-full ${className}`} style={{ imageRendering: 'pixelated' }}>
        <rect x="8" y="8" width="16" height="16" fill="hsl(var(--brand-amber))" />
        <rect x="12" y="12" width="3" height="3" fill="hsl(var(--background))" />
        <rect x="17" y="12" width="3" height="3" fill="hsl(var(--background))" />
        <rect x="12" y="17" width="8" height="3" fill="hsl(var(--background))" />
        <rect x="4" y="12" width="4" height="2" fill="hsl(var(--brand-amber))" className="animate-pixel-pulse" />
        <rect x="24" y="12" width="4" height="2" fill="hsl(var(--brand-amber))" className="animate-pixel-pulse" />
      </svg>
    ),
    template: (
      <svg viewBox="0 0 32 32" className={`w-full h-full ${className}`} style={{ imageRendering: 'pixelated' }}>
        <rect x="6" y="6" width="20" height="20" fill="hsl(var(--accent))" />
        <rect x="10" y="10" width="4" height="4" fill="hsl(var(--background))" />
        <rect x="18" y="10" width="4" height="4" fill="hsl(var(--background))" />
        <rect x="10" y="18" width="4" height="4" fill="hsl(var(--background))" />
        <rect x="18" y="18" width="4" height="4" fill="hsl(var(--background))" />
      </svg>
    ),
    course: (
      <svg viewBox="0 0 32 32" className={`w-full h-full ${className}`} style={{ imageRendering: 'pixelated' }}>
        <rect x="8" y="6" width="16" height="20" fill="hsl(var(--secondary))" />
        <rect x="10" y="10" width="12" height="2" fill="hsl(var(--background))" />
        <rect x="10" y="14" width="12" height="2" fill="hsl(var(--background))" />
        <rect x="10" y="18" width="8" height="2" fill="hsl(var(--background))" />
        <rect x="14" y="2" width="4" height="6" fill="hsl(var(--secondary))" />
      </svg>
    ),
    package: (
      <svg viewBox="0 0 32 32" className={`w-full h-full ${className}`} style={{ imageRendering: 'pixelated' }}>
        <rect x="6" y="10" width="20" height="16" fill="hsl(var(--brand-indigo))" />
        <rect x="8" y="8" width="16" height="4" fill="hsl(var(--brand-indigo-light))" />
        <rect x="14" y="6" width="4" height="6" fill="hsl(var(--brand-amber))" />
        <rect x="12" y="16" width="8" height="2" fill="hsl(var(--background))" />
      </svg>
    ),
  };

  return icons[type];
};

export default PixelIcon;
