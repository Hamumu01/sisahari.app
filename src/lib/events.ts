export interface CountdownEvent {
  id: string;
  title: string;
  targetDate: string; // ISO string
  color: string;
  createdAt: string;
}

export type EventColor = 'blue' | 'green' | 'orange' | 'purple' | 'pink' | 'red';

export const eventColors: Record<EventColor, { value: string; label: string }> = {
  blue: { value: 'hsl(240, 80%, 60%)', label: 'Blue' },
  green: { value: 'hsl(150, 70%, 50%)', label: 'Green' },
  orange: { value: 'hsl(25, 95%, 53%)', label: 'Orange' },
  purple: { value: 'hsl(280, 70%, 60%)', label: 'Purple' },
  pink: { value: 'hsl(330, 70%, 60%)', label: 'Pink' },
  red: { value: 'hsl(0, 84%, 60%)', label: 'Red' },
};

export interface EventCountdown {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
  progress: number; // 0-100
}

export const calculateEventCountdown = (targetDate: string, startDate?: string): EventCountdown => {
  const now = new Date();
  const target = new Date(targetDate);
  const start = startDate ? new Date(startDate) : now;
  
  const diff = target.getTime() - now.getTime();
  const isExpired = diff < 0;
  
  const absDiff = Math.abs(diff);
  const days = Math.floor(absDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((absDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((absDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((absDiff % (1000 * 60)) / 1000);
  
  // Calculate progress
  const totalDuration = target.getTime() - start.getTime();
  const elapsed = now.getTime() - start.getTime();
  const progress = Math.min(Math.max(Math.round((elapsed / totalDuration) * 100), 0), 100);
  
  return {
    days,
    hours,
    minutes,
    seconds,
    isExpired,
    progress,
  };
};

export const saveEvents = (events: CountdownEvent[]): void => {
  localStorage.setItem('sisahari-events', JSON.stringify(events));
};

export const loadEvents = (): CountdownEvent[] => {
  try {
    const saved = localStorage.getItem('sisahari-events');
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const sortEventsByDeadline = (events: CountdownEvent[]): CountdownEvent[] => {
  return [...events].sort((a, b) => {
    const dateA = new Date(a.targetDate).getTime();
    const dateB = new Date(b.targetDate).getTime();
    return dateA - dateB;
  });
};
