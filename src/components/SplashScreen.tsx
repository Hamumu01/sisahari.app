import { motion } from 'framer-motion';
import { calculateCountdown } from '@/lib/countdown';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/logo.png';
import { Calendar, Clock, Target } from 'lucide-react';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const { includeToday, currentSeasonColor, seasonalTheme } = useApp();
  const realDaysLeft = calculateCountdown(includeToday).daysRemaining;
  const accentColor = seasonalTheme === 'auto' ? currentSeasonColor : 'hsl(var(--primary))';

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 px-4"
    >
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.5, opacity: 0.1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{ backgroundColor: accentColor }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1.8, opacity: 0.05 }}
          transition={{ duration: 2, ease: "easeOut", delay: 0.2 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{ backgroundColor: accentColor }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src={logoImage}
            alt="SisaHari Logo"
            className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            Setiap Hari Berarti
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Hitung mundur hari-hari Anda yang tersisa, kelola acara penting, dan manfaatkan setiap momen dengan bijak
          </p>
        </motion.div>

        {/* Countdown Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-border bg-card/50 backdrop-blur-sm shadow-lg">
            <Clock className="w-5 h-5" style={{ color: accentColor }} />
            <div className="text-left">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Sisa Hari Tahun Ini</p>
              <p className="text-3xl font-bold tabular-nums" style={{ color: accentColor }}>
                {realDaysLeft}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-3xl"
        >
          <div className="flex flex-col items-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${accentColor}20` }}>
              <Calendar className="w-6 h-6" style={{ color: accentColor }} />
            </div>
            <h3 className="font-semibold mb-2">Multi Countdown</h3>
            <p className="text-sm text-muted-foreground text-center">Buat berbagai countdown untuk acara penting Anda</p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${accentColor}20` }}>
              <Target className="w-6 h-6" style={{ color: accentColor }} />
            </div>
            <h3 className="font-semibold mb-2">Tema Musiman</h3>
            <p className="text-sm text-muted-foreground text-center">Warna tema berubah otomatis setiap kuartal</p>
          </div>

          <div className="flex flex-col items-center p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/50">
            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: `${accentColor}20` }}>
              <Clock className="w-6 h-6" style={{ color: accentColor }} />
            </div>
            <h3 className="font-semibold mb-2">Offline First</h3>
            <p className="text-sm text-muted-foreground text-center">Bekerja sempurna tanpa koneksi internet</p>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Button
            size="lg"
            onClick={onFinish}
            className="text-lg px-8 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            style={{ 
              backgroundColor: accentColor,
              color: 'white'
            }}
          >
            Mulai Sekarang
          </Button>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1 }}
          className="mt-8 text-xs text-muted-foreground"
        >
          PWA • Bekerja Offline • Gratis Selamanya
        </motion.p>
      </div>
    </motion.div>
  );
};
