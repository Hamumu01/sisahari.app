import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { calculateCountdown } from '@/lib/countdown';
import { Progress } from '@/components/ui/progress';

export const YearProgress = () => {
  const { language, includeToday } = useApp();
  const t = translations[language];
  
  const [progress, setProgress] = useState(() => calculateCountdown(includeToday).yearProgress);

  useEffect(() => {
    const interval = setInterval(() => {
      const data = calculateCountdown(includeToday);
      setProgress(data.yearProgress);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [includeToday]);

  return (
    <div className="bg-card p-6 rounded-2xl shadow-card space-y-4 animate-scale-in">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">{t.yearProgress}</h3>
        <span className="text-2xl font-bold bg-hero-gradient bg-clip-text text-transparent">
          {progress}%
        </span>
      </div>
      <Progress value={progress} className="h-3" />
    </div>
  );
};
