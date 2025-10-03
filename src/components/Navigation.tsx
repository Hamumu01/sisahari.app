import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Settings, Info, CalendarDays } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const location = useLocation();
  const { language } = useApp();
  const t = translations[language];

  const links = [
    { to: '/', label: t.home, icon: Home },
    { to: '/events', label: t.myEvents, icon: CalendarDays },
    { to: '/calendar', label: t.calendar, icon: Calendar },
    { to: '/settings', label: t.settings, icon: Settings },
    { to: '/about', label: t.about, icon: Info },
  ];

  return (
    <nav className="bg-card/50 backdrop-blur-sm border-t border-border/50 md:border-t-0 md:border-r md:h-screen md:w-64 flex md:flex-col gap-2 p-3 md:p-6 md:pt-8">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.to;
        
        return (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden',
              isActive
                ? 'bg-hero-gradient text-primary-foreground shadow-lg shadow-primary/20 scale-[1.02]'
                : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground hover:scale-[1.02] hover:shadow-md'
            )}
          >
            <Icon className={cn(
              "w-5 h-5 transition-transform duration-300",
              isActive ? "scale-110" : "group-hover:scale-110"
            )} />
            <span className="hidden md:inline font-medium tracking-wide">{link.label}</span>
            {isActive && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
            )}
          </Link>
        );
      })}
    </nav>
  );
};
