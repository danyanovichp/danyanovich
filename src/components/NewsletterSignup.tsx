import { useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';

const NewsletterSignup = () => {
  const { i18n } = useTranslation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call - replace with actual integration later
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitted(true);
    setIsLoading(false);
    setEmail('');
    
    toast({
      title: i18n.language === 'ru' ? 'Спасибо за подписку!' : 'Thanks for subscribing!',
      description: i18n.language === 'ru' 
        ? 'Вы будете получать новости и обновления' 
        : 'You will receive news and updates',
    });
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>
          {i18n.language === 'ru' 
            ? 'Вы подписаны!' 
            : 'You are subscribed!'}
        </span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <p className="text-sm text-muted-foreground">
        {i18n.language === 'ru' 
          ? 'Подпишитесь на обновления и новые шаблоны' 
          : 'Subscribe to updates and new templates'}
      </p>
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-9 bg-background/50"
            required
          />
        </div>
        <Button type="submit" size="icon" disabled={isLoading}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};

export default NewsletterSignup;
