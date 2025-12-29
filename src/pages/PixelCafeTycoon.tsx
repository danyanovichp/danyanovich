import { ArrowRight, Gamepad2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import PageTransition from "@/components/PageTransition";
import SEO from "@/components/SEO";

const PixelCafeTycoon = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  const gameUrl = "https://ai.studio/apps/drive/1PtDi1efaJSye4Ed5-FbGIl8gPqDm9Jwb";
  const videoId = "G0C_fbNIpHI";

  return (
    <PageTransition>
      <SEO 
        title={isRu ? 'Pixel Cafe Tycoon | Игра' : 'Pixel Cafe Tycoon | Game'}
        description={isRu 
          ? 'Pixel Cafe Tycoon — интерактивная игра-симулятор кафе, созданная с помощью AI'
          : 'Pixel Cafe Tycoon — an interactive cafe simulator game created with AI'}
      />
      <div className="min-h-screen">
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Header with Play Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl">
                  <Gamepad2 className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold">Pixel Cafe Tycoon</h1>
              </div>
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                <a href={gameUrl} target="_blank" rel="noopener noreferrer">
                  {isRu ? "Играть" : "Play Game"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>

            {/* Video */}
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-muted/50 shadow-lg">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="Pixel Cafe Tycoon Gameplay"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Description */}
            <div className="bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xl md:text-2xl font-bold">
                {isRu ? "Об игре" : "About the Game"}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {isRu 
                  ? "Pixel Cafe Tycoon — это интерактивная игра-симулятор, созданная с помощью AI. Управляйте своим собственным пиксельным кафе, обслуживайте клиентов, развивайте бизнес и открывайте новые рецепты. Игра полностью бесплатная и работает прямо в браузере!"
                  : "Pixel Cafe Tycoon is an interactive simulator game created with AI. Manage your own pixel cafe, serve customers, grow your business, and unlock new recipes. The game is completely free and runs right in your browser!"}
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">✓</span>
                  {isRu ? "Бесплатная игра" : "Free to play"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">✓</span>
                  {isRu ? "Работает в браузере" : "Works in browser"}
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-orange-500">✓</span>
                  {isRu ? "Создана с помощью AI" : "Created with AI"}
                </li>
              </ul>
            </div>

            {/* Bottom CTA */}
            <div className="flex justify-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                <a href={gameUrl} target="_blank" rel="noopener noreferrer">
                  {isRu ? "Перейти к игре" : "Go to Game"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default PixelCafeTycoon;
