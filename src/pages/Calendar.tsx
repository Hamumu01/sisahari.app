import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';

const Calendar = () => {
  const { language } = useApp();
  const t = translations[language];
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = new Date();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthNames = language === 'en' 
    ? ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    : ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

  const dayNames = language === 'en' 
    ? ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    : ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const prevMonth = () => setCurrentDate(new Date(year, month - 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1));

  const isToday = (day: number) => {
    return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(
      <div
        key={day}
        className={`aspect-square flex flex-col items-center justify-center rounded-xl text-lg font-medium transition-all ${
          isToday(day)
            ? 'bg-hero-gradient text-primary-foreground shadow-card scale-105'
            : 'bg-card text-foreground hover:bg-secondary hover:shadow-md'
        }`}
      >
        <span>{day}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {t.calendar}
        </h1>
      </div>

      <div className="bg-card p-6 md:p-8 rounded-2xl shadow-card space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            {monthNames[month]} {year}
          </h2>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-2 md:gap-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm md:text-base font-semibold text-muted-foreground py-2">
              {day}
            </div>
          ))}
          {days}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
