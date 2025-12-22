import { useEffect, useState, useRef } from 'react';
import { Briefcase, Clock, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface StatItemProps {
  icon: React.ElementType;
  value: number;
  suffix: string;
  labelRu: string;
  labelEn: string;
  delay: number;
}

const StatItem = ({ icon: Icon, value, suffix, labelRu, labelEn, delay }: StatItemProps) => {
  const { i18n } = useTranslation();
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(element);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [delay]);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div
      ref={ref}
      className={cn(
        'text-center space-y-4 p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/30 transition-all duration-700',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
    >
      <div className="inline-flex p-4 bg-primary/10 rounded-2xl">
        <Icon className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-1">
        <p className="text-4xl md:text-5xl font-bold text-foreground">
          {count}{suffix}
        </p>
        <p className="text-sm text-muted-foreground">
          {i18n.language === 'ru' ? labelRu : labelEn}
        </p>
      </div>
    </div>
  );
};

const StatsSection = () => {
  const stats = [
    {
      icon: Briefcase,
      value: 50,
      suffix: '+',
      labelRu: 'Проектов реализовано',
      labelEn: 'Projects Completed',
      delay: 0,
    },
    {
      icon: Clock,
      value: 100,
      suffix: '+',
      labelRu: 'Часов обучения',
      labelEn: 'Training Hours',
      delay: 150,
    },
    {
      icon: TrendingUp,
      value: 30,
      suffix: '%',
      labelRu: 'Рост эффективности',
      labelEn: 'Efficiency Growth',
      delay: 300,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsSection;
