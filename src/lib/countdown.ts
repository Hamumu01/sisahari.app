export interface CountdownData {
  daysRemaining: number;
  weeks: number;
  daysAfterWeeks: number;
  hours: number;
  minutes: number;
  seconds: number;
  yearProgress: number;
  isLeapYear: boolean;
  timezone: string;
  totalDaysInYear: number;
}

export const calculateCountdown = (includeToday: boolean): CountdownData => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);
  
  const isLeapYear = (currentYear % 4 === 0 && currentYear % 100 !== 0) || (currentYear % 400 === 0);
  const totalDaysInYear = isLeapYear ? 366 : 365;
  
  const diff = endOfYear.getTime() - now.getTime();
  
  let daysRemaining = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  if (!includeToday) {
    daysRemaining -= 1;
  }
  
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  const weeks = Math.floor(daysRemaining / 7);
  const daysAfterWeeks = daysRemaining % 7;
  
  const daysPassed = totalDaysInYear - daysRemaining;
  const yearProgress = Math.round((daysPassed / totalDaysInYear) * 100);
  
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  
  return {
    daysRemaining,
    weeks,
    daysAfterWeeks,
    hours,
    minutes,
    seconds,
    yearProgress,
    isLeapYear,
    timezone,
    totalDaysInYear,
  };
};
