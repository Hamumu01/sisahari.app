import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Calendar, Layers, Clock } from 'lucide-react';

export const ControlPanel = () => {
  const { language, includeToday, setIncludeToday, displayMode, setDisplayMode } = useApp();
  const t = translations[language];

  const modes = [
    { value: 'days' as const, label: t.daysOnly, icon: Calendar },
    { value: 'weeks' as const, label: t.weeksAndDays, icon: Layers },
    { value: 'detailed' as const, label: t.detailed, icon: Clock },
  ];

  return (
    <div className="bg-card p-6 rounded-2xl shadow-card space-y-6 animate-scale-in">
      <div className="flex items-center justify-between">
        <Label htmlFor="include-today" className="text-base font-medium cursor-pointer">
          {t.includeToday}
        </Label>
        <Switch
          id="include-today"
          checked={includeToday}
          onCheckedChange={setIncludeToday}
        />
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">{t.displayMode}</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
          {modes.map((mode) => {
            const Icon = mode.icon;
            return (
              <Button
                key={mode.value}
                variant={displayMode === mode.value ? 'default' : 'outline'}
                onClick={() => setDisplayMode(mode.value)}
                className="justify-start gap-2"
              >
                <Icon className="w-4 h-4" />
                {mode.label}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
