const PixelDecorations = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating pixels */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-brand-amber animate-pixel-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-4 h-4 bg-brand-indigo animate-pixel-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-4 h-4 bg-accent animate-pixel-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-1/3 w-4 h-4 bg-primary animate-pixel-float" style={{ animationDelay: '1.5s' }} />
      
      {/* Blinking stars */}
      <div className="absolute top-32 right-1/4 w-3 h-3 bg-brand-amber-light animate-blink" style={{ animationDelay: '0.5s' }} />
      <div className="absolute top-60 left-1/3 w-3 h-3 bg-brand-indigo-light animate-blink" style={{ animationDelay: '1.2s' }} />
      <div className="absolute bottom-32 right-1/2 w-3 h-3 bg-brand-amber-light animate-blink" style={{ animationDelay: '2.5s' }} />
    </div>
  );
};

export default PixelDecorations;
