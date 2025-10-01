import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { calculateCountdown, CountdownData } from '@/lib/countdown';
import { Calendar, Clock } from 'lucide-react';

export const CountdownHero = () => {
  const { language, includeToday, displayMode } = useApp();
  const t = translations[language];
  
  const [countdown, setCountdown] = useState<CountdownData>(() => calculateCountdown(includeToday));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateCountdown(includeToday));
    }, 1000);

    return () => clearInterval(interval);
  }, [includeToday]);

  const renderCountdown = () => {
    switch (displayMode) {
      case 'weeks':
        return (
          <div className="flex items-center justify-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="text-7xl md:text-9xl font-bold bg-hero-gradient bg-clip-text text-transparent animate-count-pulse">
                {countdown.weeks}
              </div>
              <div className="text-xl md:text-2xl text-muted-foreground mt-2">{t.weeks}</div>
            </div>
            <div className="text-5xl md:text-7xl text-muted-foreground">+</div>
            <div className="text-center">
              <div className="text-7xl md:text-9xl font-bold bg-hero-gradient bg-clip-text text-transparent animate-count-pulse">
                {countdown.daysAfterWeeks}
              </div>
              <div className="text-xl md:text-2xl text-muted-foreground mt-2">{t.days}</div>
            </div>
          </div>
        );
      
      case 'detailed':
        return (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-card p-6 rounded-2xl shadow-card text-center">
              <div className="text-4xl md:text-6xl font-bold text-primary animate-count-pulse">
                {countdown.daysRemaining}
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-2">{t.days}</div>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-card text-center">
              <div className="text-4xl md:text-6xl font-bold text-accent animate-count-pulse">
                {countdown.hours}
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-2">{t.hours}</div>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-card text-center">
              <div className="text-4xl md:text-6xl font-bold text-primary animate-count-pulse">
                {countdown.minutes}
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-2">{t.minutes}</div>
            </div>
            <div className="bg-card p-6 rounded-2xl shadow-card text-center">
              <div className="text-4xl md:text-6xl font-bold text-accent animate-count-pulse">
                {countdown.seconds}
              </div>
              <div className="text-sm md:text-base text-muted-foreground mt-2">{t.seconds}</div>
            </div>
          </div>
        );
      
      default: // days
        return (
          <div className="text-center">
            <div className="text-8xl md:text-[12rem] font-bold bg-hero-gradient bg-clip-text text-transparent animate-count-pulse leading-none">
              {countdown.daysRemaining}
            </div>
            <div className="text-2xl md:text-4xl text-muted-foreground mt-4">{t.days}</div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">{t.appName}</h1>
        <p className="text-lg md:text-xl text-muted-foreground">{t.tagline}</p>
      </div>

      <div 
        className="py-8"
        aria-live="polite"
        aria-atomic="true"
      >
        {renderCountdown()}
      </div>

      <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground flex-wrap">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{countdown.isLeapYear ? t.leapYear : t.notLeapYear}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4" />
          <span>{countdown.timezone}</span>
        </div>
      </div>
    </div>
  );
};
