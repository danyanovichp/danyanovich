const PixelCharacter = () => {
  return (
    <div className="relative w-64 h-64 animate-pixel-float">
      <svg viewBox="0 0 64 64" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
        {/* Head */}
        <rect x="20" y="8" width="24" height="24" fill="hsl(var(--brand-indigo))" />
        <rect x="24" y="12" width="4" height="4" fill="hsl(var(--background))" />
        <rect x="36" y="12" width="4" height="4" fill="hsl(var(--background))" />
        <rect x="28" y="20" width="8" height="4" fill="hsl(var(--background))" />
        
        {/* Body */}
        <rect x="16" y="32" width="32" height="20" fill="hsl(var(--brand-amber))" />
        
        {/* Arms - with animation */}
        <g className="animate-pixel-bounce">
          <rect x="8" y="36" width="8" height="12" fill="hsl(var(--brand-amber))" />
          <rect x="48" y="36" width="8" height="12" fill="hsl(var(--brand-amber))" />
        </g>
        
        {/* Legs */}
        <rect x="20" y="52" width="8" height="12" fill="hsl(var(--primary))" />
        <rect x="36" y="52" width="8" height="12" fill="hsl(var(--primary))" />
        
        {/* Computer screen in hand */}
        <rect x="8" y="44" width="12" height="8" fill="hsl(var(--accent))" className="animate-pixel-pulse" />
        <rect x="10" y="46" width="8" height="4" fill="hsl(var(--brand-indigo-light))" />
      </svg>
    </div>
  );
};

export default PixelCharacter;
