import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Pixel grid background */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
        `,
        backgroundSize: '16px 16px'
      }} />

      {/* Floating pixel decorations */}
      <div className="absolute top-20 left-10 w-6 h-6 bg-brand-amber animate-pixel-float" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-6 h-6 bg-brand-indigo animate-pixel-float" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-6 h-6 bg-destructive animate-pixel-float" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-1/3 w-6 h-6 bg-primary animate-pixel-float" style={{ animationDelay: '1.5s' }} />

      {/* Main content */}
      <div className="container relative z-10">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Sad pixel character */}
          <div className="w-48 h-48 mx-auto mb-8">
            <svg viewBox="0 0 64 64" className="w-full h-full" style={{ imageRendering: 'pixelated' }}>
              {/* Head */}
              <rect x="20" y="8" width="24" height="24" fill="hsl(var(--brand-indigo))" className="animate-pixel-bounce" />
              
              {/* Sad eyes */}
              <rect x="24" y="14" width="4" height="6" fill="hsl(var(--background))" />
              <rect x="36" y="14" width="4" height="6" fill="hsl(var(--background))" />
              <rect x="26" y="16" width="2" height="2" fill="hsl(var(--brand-indigo))" />
              <rect x="38" y="16" width="2" height="2" fill="hsl(var(--brand-indigo))" />
              
              {/* Sad mouth */}
              <rect x="26" y="24" width="2" height="2" fill="hsl(var(--background))" />
              <rect x="28" y="26" width="2" height="2" fill="hsl(var(--background))" />
              <rect x="30" y="26" width="4" height="2" fill="hsl(var(--background))" />
              <rect x="34" y="26" width="2" height="2" fill="hsl(var(--background))" />
              <rect x="36" y="24" width="2" height="2" fill="hsl(var(--background))" />
              
              {/* Body */}
              <rect x="16" y="32" width="32" height="20" fill="hsl(var(--brand-amber))" />
              
              {/* Arms */}
              <rect x="8" y="36" width="8" height="12" fill="hsl(var(--brand-amber))" />
              <rect x="48" y="36" width="8" height="12" fill="hsl(var(--brand-amber))" />
              
              {/* Legs */}
              <rect x="20" y="52" width="8" height="12" fill="hsl(var(--primary))" />
              <rect x="36" y="52" width="8" height="12" fill="hsl(var(--primary))" />
              
              {/* Tear */}
              <rect x="26" y="20" width="2" height="2" fill="hsl(var(--accent))" className="animate-blink" />
            </svg>
          </div>

          {/* 404 Text with glitch effect */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold pixel-border inline-block px-8 py-4 bg-destructive text-destructive-foreground animate-glitch">
              404
            </h1>
            <div className="pixel-border px-6 py-4 bg-background inline-block">
              <p className="text-xl md:text-2xl font-bold uppercase">
                {i18n.language === 'ru' ? '🎮 УРОВЕНЬ НЕ НАЙДЕН' : '🎮 LEVEL NOT FOUND'}
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <p className="text-sm md:text-base text-muted-foreground">
              {i18n.language === 'ru' 
                ? 'Кажется, эта страница отправилась в другое измерение...'
                : 'It seems this page went to another dimension...'}
            </p>
            <p className="text-xs text-muted-foreground">
              {i18n.language === 'ru' 
                ? 'Но не переживайте, вы всегда можете вернуться на главную!'
                : 'But don\'t worry, you can always return to home!'}
            </p>
          </div>

          {/* Pixel button */}
          <Button 
            size="lg" 
            asChild
            className="animate-pixel-pulse"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              {i18n.language === 'ru' ? 'Вернуться на главную' : 'Return to Home'}
            </Link>
          </Button>

          {/* Blinking cursor */}
          <div className="flex justify-center items-center gap-2 text-xs text-muted-foreground">
            <span>{i18n.language === 'ru' ? 'НАЖМИТЕ START ДЛЯ ПРОДОЛЖЕНИЯ' : 'PRESS START TO CONTINUE'}</span>
            <span className="animate-blink">▮</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
