import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Sun, Moon, Monitor, Bell } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const Settings = () => {
  const { language, setLanguage, theme, setTheme } = useApp();
  const t = translations[language];

  const themes = [
    { value: 'light' as const, label: t.light, icon: Sun },
    { value: 'dark' as const, label: t.dark, icon: Moon },
    { value: 'auto' as const, label: t.auto, icon: Monitor },
  ];

  const languages = [
    { value: 'en' as const, label: 'English' },
    { value: 'id' as const, label: 'Bahasa Indonesia' },
  ];

  const testNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          const daysLeft = Math.ceil((new Date(new Date().getFullYear(), 11, 31).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          new Notification(t.notificationTitle, {
            body: `${daysLeft} ${t.notificationBody}`,
            icon: '/favicon.ico',
          });
          toast({
            title: t.notificationTitle,
            description: `${daysLeft} ${t.notificationBody}`,
          });
        } else {
          toast({
            title: 'Permission Denied',
            description: 'Please enable notifications in your browser settings.',
            variant: 'destructive',
          });
        }
      });
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t.settings}</h1>

      <div className="space-y-6">
        <div className="bg-card p-6 rounded-2xl shadow-card space-y-4">
          <Label className="text-lg font-semibold">{t.theme}</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {themes.map((themeOption) => {
              const Icon = themeOption.icon;
              return (
                <Button
                  key={themeOption.value}
                  variant={theme === themeOption.value ? 'default' : 'outline'}
                  onClick={() => setTheme(themeOption.value)}
                  className="justify-start gap-2 h-auto py-4"
                >
                  <Icon className="w-5 h-5" />
                  {themeOption.label}
                </Button>
              );
            })}
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-card space-y-4">
          <Label className="text-lg font-semibold">{t.language}</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {languages.map((lang) => (
              <Button
                key={lang.value}
                variant={language === lang.value ? 'default' : 'outline'}
                onClick={() => setLanguage(lang.value)}
                className="justify-start h-auto py-4"
              >
                {lang.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-card space-y-4">
          <Label className="text-lg font-semibold">{t.testNotification}</Label>
          <Button
            onClick={testNotification}
            variant="outline"
            className="w-full justify-start gap-2 h-auto py-4"
          >
            <Bell className="w-5 h-5" />
            {t.testNotification}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
