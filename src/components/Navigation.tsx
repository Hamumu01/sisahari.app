import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Settings, Info } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { cn } from '@/lib/utils';

export const Navigation = () => {
  const location = useLocation();
  const { language } = useApp();
  const t = translations[language];

  const links = [
    { to: '/', label: t.home, icon: Home },
    { to: '/calendar', label: t.calendar, icon: Calendar },
    { to: '/settings', label: t.settings, icon: Settings },
    { to: '/about', label: t.about, icon: Info },
  ];

  return (
    <nav className="bg-card border-t border-border md:border-t-0 md:border-r md:h-screen md:w-64 flex md:flex-col gap-1 p-2 md:p-4">
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.to;
        
        return (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg transition-all',
              isActive
                ? 'bg-hero-gradient text-primary-foreground shadow-md'
                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
            )}
          >
            <Icon className="w-5 h-5" />
            <span className="hidden md:inline font-medium">{link.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};
