import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  const { i18n } = useTranslation();

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-pastel-yellow">
      <div className="container relative z-10">
        <Card className="p-12 md:p-16 text-center max-w-xl mx-auto bg-card border-4 border-foreground shadow-[12px_12px_0px_0px_currentColor] rounded-none">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-8xl md:text-9xl font-bold font-display">
                404
              </h1>
              <div className="inline-block px-6 py-3 rounded-none bg-pastel-pink border-2 border-foreground shadow-[4px_4px_0px_0px_currentColor]">
                <p className="text-xl md:text-2xl font-bold font-display">
                  {i18n.language === 'ru' ? 'Страница не найдена' : 'Page Not Found'}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-base font-medium">
                {i18n.language === 'ru'
                  ? 'К сожалению, страница которую вы ищете не существует.'
                  : 'Unfortunately, the page you are looking for does not exist.'}
              </p>
              <p className="text-sm font-medium text-foreground/80">
                {i18n.language === 'ru'
                  ? 'Но вы всегда можете вернуться на главную страницу.'
                  : 'But you can always return to the home page.'}
              </p>
            </div>

            <Button
              size="lg"
              asChild
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
