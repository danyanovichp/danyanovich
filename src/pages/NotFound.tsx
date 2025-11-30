import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const { i18n } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Decorative glass orbs */}
      <div className="glass-orb w-64 h-64 bg-muted/50 top-1/4 left-1/4 animate-float" />
      <div className="glass-orb w-48 h-48 bg-muted/40 bottom-1/4 right-1/4 animate-float" style={{ animationDelay: '1s' }} />
      <div className="glass-orb w-56 h-56 bg-muted/30 top-1/2 right-1/3 animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="container relative z-10">
        <Card className="p-12 md:p-16 text-center max-w-xl mx-auto bg-card/60 backdrop-blur-2xl">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-br from-primary to-muted bg-clip-text text-transparent">
                404
              </h1>
              <div className="inline-block px-6 py-3 rounded-2xl bg-muted/50 backdrop-blur-sm border border-border/20">
                <p className="text-xl md:text-2xl font-bold">
                  {i18n.language === 'ru' ? 'Страница не найдена' : 'Page Not Found'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-base text-muted-foreground">
                {i18n.language === 'ru' 
                  ? 'К сожалению, страница которую вы ищете не существует.'
                  : 'Unfortunately, the page you are looking for does not exist.'}
              </p>
              <p className="text-sm text-muted-foreground">
                {i18n.language === 'ru' 
                  ? 'Но вы всегда можете вернуться на главную страницу.'
                  : 'But you can always return to the home page.'}
              </p>
            </div>

            <Button 
              size="lg" 
              asChild
              className="animate-glow"
            >
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                {i18n.language === 'ru' ? 'Вернуться на главную' : 'Return to Home'}
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
