import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateCountdown } from '@/lib/countdown';
import { useApp } from '@/contexts/AppContext';
import logoImage from '@/assets/logo.png';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen = ({ onFinish }: SplashScreenProps) => {
  const { includeToday, currentSeasonColor, seasonalTheme } = useApp();
  const [currentNumber, setCurrentNumber] = useState(999);
  const [isSettled, setIsSettled] = useState(false);
  const [caption, setCaption] = useState("Calculating your days…");
  
  const realDaysLeft = calculateCountdown(includeToday).daysRemaining;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    // Preload logo
    const img = new Image();
    img.src = logoImage;

    if (prefersReducedMotion) {
      // Skip shuffle for reduced motion
      setCurrentNumber(realDaysLeft);
      setIsSettled(true);
      setCaption("Ready");
      const timer = setTimeout(onFinish, 800);
      return () => clearTimeout(timer);
    }

    // Shuffle phase: 1.8s with updates every 60ms
    const shuffleDuration = 1800;
    const shuffleInterval = 60;
    const shuffleSteps = Math.floor(shuffleDuration / shuffleInterval);
    let step = 0;

    const shuffleTimer = setInterval(() => {
      step++;
      // Random number between realDaysLeft and 999
      const randomNum = Math.floor(Math.random() * (999 - realDaysLeft + 1)) + realDaysLeft;
      setCurrentNumber(randomNum);

      if (step >= shuffleSteps) {
        clearInterval(shuffleTimer);
        // Settle phase
        setCurrentNumber(realDaysLeft);
        setIsSettled(true);
        setCaption("Ready");
        
        // Exit after settle + fade out
        setTimeout(onFinish, 700);
      }
    }, shuffleInterval);

    return () => clearInterval(shuffleTimer);
  }, [realDaysLeft, onFinish, prefersReducedMotion, includeToday]);

  const accentColor = seasonalTheme === 'auto' ? currentSeasonColor : 'hsl(var(--primary))';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-8"
        >
          <img
            src={logoImage}
            alt=""
            aria-hidden="true"
            className="w-48 h-48 object-contain"
          />
        </motion.div>

        {/* Countdown Number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1,
            scale: isSettled ? [1.08, 1] : 1
          }}
          transition={isSettled ? { duration: 0.3, ease: "easeOut" } : { duration: 0.3 }}
          className="relative"
        >
          <div
            className="text-8xl md:text-9xl font-bold tabular-nums"
            style={{ 
              color: accentColor,
              textShadow: !isSettled ? `0 0 20px ${accentColor}40` : 'none'
            }}
            aria-live="polite"
            aria-atomic="true"
          >
            {isSettled && currentNumber}
            {!isSettled && (
              <span className="animate-pulse" aria-hidden="true">
                {currentNumber}
              </span>
            )}
          </div>
        </motion.div>

        {/* Caption */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-sm text-muted-foreground"
        >
          {caption}
        </motion.p>

        {/* Loader indicator */}
        {!isSettled && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <div className="w-32 h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="h-full w-1/3 rounded-full"
                style={{ backgroundColor: accentColor }}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
