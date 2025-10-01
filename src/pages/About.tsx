import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { Heart, Github, Globe } from 'lucide-react';

const About = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <div className="space-y-6 animate-fade-in">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t.about}</h1>

      <div className="bg-card p-8 rounded-2xl shadow-card space-y-6">
        <div className="flex items-center justify-center mb-8">
          <div className="text-6xl font-bold bg-hero-gradient bg-clip-text text-transparent">
            {t.appName}
          </div>
        </div>

        <div className="space-y-4 text-center">
          <p className="text-lg text-foreground leading-relaxed max-w-2xl mx-auto">
            {t.aboutText}
          </p>

          <div className="pt-6 border-t border-border">
            <p className="flex items-center justify-center gap-2 text-muted-foreground">
              {t.madeWith} <Heart className="w-4 h-4 text-red-500 fill-red-500" /> {language === 'en' ? 'using' : 'menggunakan'}
            </p>
            <div className="flex items-center justify-center gap-4 mt-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Globe className="w-4 h-4" />
                React + TypeScript
              </span>
              <span>•</span>
              <span>Tailwind CSS</span>
              <span>•</span>
              <span>PWA</span>
            </div>
          </div>

          <div className="pt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary text-foreground text-sm">
              <Globe className="w-4 h-4" />
              <span>{language === 'en' ? 'Version' : 'Versi'} 1.0.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
