import { useTranslation } from "react-i18next";
import { Heart, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import SEO from "@/components/SEO";
import DecorativeBlobs from "@/components/DecorativeBlobs";
import AnimatedSection from "@/components/AnimatedSection";

const cryptoWallets = [
  { name: 'Bitcoin (BTC)', symbol: '₿', address: 'YOUR_BTC_ADDRESS', bgClass: 'bg-pastel-yellow/30' },
  { name: 'Ethereum (ETH)', symbol: 'Ξ', address: 'YOUR_ETH_ADDRESS', bgClass: 'bg-pastel-lavender/30' },
  { name: 'USDT (TRC-20)', symbol: '₮', address: 'YOUR_USDT_ADDRESS', bgClass: 'bg-pastel-mint/30' },
];

const CryptoCard = ({ wallet, isRu }: { wallet: typeof cryptoWallets[0]; isRu: boolean }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    toast.success(isRu ? 'Адрес скопирован!' : 'Address copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`rounded-2xl p-6 ${wallet.bgClass} border border-border/10 transition-all hover:scale-[1.02]`}>
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl font-bold">{wallet.symbol}</span>
        <h3 className="font-display font-semibold text-lg">{wallet.name}</h3>
      </div>
      <div className="flex items-center gap-2">
        <code className="flex-1 text-xs font-mono bg-background/50 rounded-lg px-3 py-2 truncate border border-border/10">
          {wallet.address}
        </code>
        <button
          onClick={handleCopy}
          className="shrink-0 p-2 rounded-lg bg-background/50 border border-border/10 hover:bg-background/80 transition-colors"
          title={isRu ? 'Копировать' : 'Copy'}
        >
          {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4 text-muted-foreground" />}
        </button>
      </div>
    </div>
  );
};

const Support = () => {
  const { i18n } = useTranslation();
  const isRu = i18n.language === 'ru';

  return (
    <>
      <SEO
        titleRu="Поддержать — Дэн Янович"
        titleEn="Support — Dan Yanovich"
        descriptionRu="Поддержите мою работу криптовалютой"
        descriptionEn="Support my work with cryptocurrency"
      />
      <div className="relative min-h-screen">
        <DecorativeBlobs variant="hero" />

        {/* Hero */}
        <section className="container mx-auto px-4 pt-24 pb-12 relative z-10">
          <AnimatedSection>
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pastel-peach/30 mb-6">
                <Heart className="h-8 w-8 text-foreground" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-4">
                {isRu ? 'Поддержать' : 'Support Me'}
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {isRu
                  ? 'Если мои шаблоны, контент или консультации были вам полезны — вы можете поддержать мою работу. Это помогает создавать больше качественных материалов.'
                  : 'If my templates, content, or consulting have been helpful to you — you can support my work. It helps me create more quality materials.'}
              </p>
            </div>
          </AnimatedSection>
        </section>

        {/* Crypto Wallets */}
        <section className="container mx-auto px-4 pb-12 relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto space-y-4">
              <h2 className="font-display text-xl font-semibold mb-6 text-center">
                {isRu ? 'Криптовалюта' : 'Cryptocurrency'}
              </h2>
              {cryptoWallets.map((wallet) => (
                <CryptoCard key={wallet.name} wallet={wallet} isRu={isRu} />
              ))}
            </div>
          </AnimatedSection>
        </section>

        {/* Motivational */}
        <section className="container mx-auto px-4 pb-24 relative z-10">
          <AnimatedSection>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-muted-foreground leading-relaxed">
                {isRu
                  ? 'Ваша поддержка идёт на разработку новых шаблонов, создание обучающего контента и развитие open-source проектов. Спасибо! 🙏'
                  : 'Your support goes towards developing new templates, creating educational content, and advancing open-source projects. Thank you! 🙏'}
              </p>
            </div>
          </AnimatedSection>
        </section>
      </div>
    </>
  );
};

export default Support;
