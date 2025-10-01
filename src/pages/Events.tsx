import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { useEvents } from '@/hooks/useEvents';
import { EventCard } from '@/components/EventCard';
import { EventForm } from '@/components/EventForm';
import { Button } from '@/components/ui/button';
import { Plus, CalendarDays } from 'lucide-react';

const Events = () => {
  const { language } = useApp();
  const t = translations[language];
  const { events, addEvent } = useEvents();
  const [showForm, setShowForm] = useState(false);

  const handleSave = (eventData: any) => {
    addEvent(eventData);
    setShowForm(false);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">{t.myEvents}</h1>
        <Button onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="w-4 h-4" />
          {t.addEvent}
        </Button>
      </div>

      {showForm && (
        <EventForm
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {events.length === 0 && !showForm ? (
        <div className="text-center py-16 space-y-4">
          <CalendarDays className="w-16 h-16 mx-auto text-muted-foreground" />
          <div>
            <p className="text-xl font-semibold text-muted-foreground">{t.noEvents}</p>
            <p className="text-sm text-muted-foreground mt-2">{t.createFirstEvent}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
