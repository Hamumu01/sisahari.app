import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountdownEvent, calculateEventCountdown } from '@/lib/events';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface EventCardProps {
  event: CountdownEvent;
}

export const EventCard = ({ event }: EventCardProps) => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(() => calculateEventCountdown(event.targetDate, event.createdAt));

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculateEventCountdown(event.targetDate, event.createdAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [event.targetDate, event.createdAt]);

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <Card
      className="p-6 cursor-pointer hover:shadow-card-hover transition-all duration-300 hover-scale"
      onClick={handleClick}
      style={{ borderLeft: `4px solid ${event.color}` }}
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-xl font-semibold text-foreground line-clamp-2">{event.title}</h3>
          {countdown.isExpired && (
            <Badge variant="destructive" className="shrink-0">
              Expired
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{format(new Date(event.targetDate), 'PPP p')}</span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" style={{ color: event.color }} />
            <div>
              <div className="text-3xl font-bold" style={{ color: event.color }}>
                {countdown.days}
              </div>
              <div className="text-xs text-muted-foreground">days</div>
            </div>
          </div>
          
          {!countdown.isExpired && (
            <div className="flex gap-4 text-sm">
              <div>
                <div className="font-semibold text-foreground">{countdown.hours}h</div>
              </div>
              <div>
                <div className="font-semibold text-foreground">{countdown.minutes}m</div>
              </div>
              <div>
                <div className="font-semibold text-foreground">{countdown.seconds}s</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
