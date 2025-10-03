import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { useEvents } from '@/hooks/useEvents';
import { calculateEventCountdown } from '@/lib/events';
import { EventForm } from '@/components/EventForm';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { ArrowLeft, Trash2, Edit, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useApp();
  const t = translations[language];
  const { getEvent, updateEvent, deleteEvent } = useEvents();
  
  const event = getEvent(id || '');
  const [showEditForm, setShowEditForm] = useState(false);
  const [countdown, setCountdown] = useState(() => 
    event ? calculateEventCountdown(event.targetDate, event.createdAt) : null
  );

  useEffect(() => {
    if (!event) {
      navigate('/events');
      return;
    }

    const interval = setInterval(() => {
      setCountdown(calculateEventCountdown(event.targetDate, event.createdAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [event, navigate]);

  if (!event || !countdown) return null;

  const handleUpdate = (eventData: any) => {
    updateEvent(event.id, eventData);
    setShowEditForm(false);
  };

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate('/events');
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/events')}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        {event.emoji && (
          <div className="text-5xl">
            {event.emoji}
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground flex-1">{event.title}</h1>
        <Button variant="outline" size="icon" onClick={() => setShowEditForm(!showEditForm)}>
          <Edit className="w-4 h-4" />
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>{t.deleteEvent}</AlertDialogTitle>
              <AlertDialogDescription>{t.deleteConfirm}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{t.cancel}</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>{t.delete}</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      {showEditForm && (
        <EventForm
          event={event}
          onSave={handleUpdate}
          onCancel={() => setShowEditForm(false)}
        />
      )}

      <div className="space-y-6">
        <div className="flex items-center gap-4 text-muted-foreground">
          <Calendar className="w-5 h-5" />
          <span className="text-lg">{format(new Date(event.targetDate), 'PPP p')}</span>
        </div>

        <div 
          className="text-center py-12 space-y-4"
          aria-live="polite"
          aria-atomic="true"
        >
          {countdown.isExpired ? (
            <div>
              <div className="text-6xl md:text-8xl font-bold text-destructive">
                {t.expired}
              </div>
              <div className="text-xl text-muted-foreground mt-4">
                {countdown.days} {t.days} ago
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-2xl shadow-card">
                  <div className="text-5xl md:text-7xl font-bold" style={{ color: event.color }}>
                    {countdown.days}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground mt-2">{t.days}</div>
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-card">
                  <div className="text-5xl md:text-7xl font-bold" style={{ color: event.color }}>
                    {countdown.hours}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground mt-2">{t.hours}</div>
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-card">
                  <div className="text-5xl md:text-7xl font-bold" style={{ color: event.color }}>
                    {countdown.minutes}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground mt-2">{t.minutes}</div>
                </div>
                <div className="bg-card p-6 rounded-2xl shadow-card">
                  <div className="text-5xl md:text-7xl font-bold" style={{ color: event.color }}>
                    {countdown.seconds}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground mt-2">{t.seconds}</div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">{t.eventProgress}</h3>
            <span className="text-2xl font-bold" style={{ color: event.color }}>
              {countdown.progress}%
            </span>
          </div>
          <Progress 
            value={countdown.progress} 
            className="h-3"
            style={{ 
              '--progress-background': event.color 
            } as React.CSSProperties}
          />
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
