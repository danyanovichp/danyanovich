import { MessageCircle } from 'lucide-react';

const TelegramWidget = () => {
  return (
    <a
      href="https://t.me/danyanovichp"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[hsl(200_80%_50%)] text-white shadow-glass-lg hover:scale-110 transition-all animate-pulse-slow group"
      aria-label="Chat on Telegram"
    >
      <MessageCircle className="h-6 w-6 group-hover:scale-110 transition-transform" />
    </a>
  );
};

export default TelegramWidget;
