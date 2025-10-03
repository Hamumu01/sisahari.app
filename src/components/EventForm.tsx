import { useState, useEffect } from 'react';
import { useApp } from '@/contexts/AppContext';
import { translations } from '@/lib/translations';
import { CountdownEvent, eventColors, EventColor } from '@/lib/events';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';

interface EventFormProps {
  event?: CountdownEvent;
  onSave: (event: Omit<CountdownEvent, 'id' | 'createdAt'>) => void;
  onCancel: () => void;
}

export const EventForm = ({ event, onSave, onCancel }: EventFormProps) => {
  const { language } = useApp();
  const t = translations[language];

  const [title, setTitle] = useState(event?.title || '');
  const [targetDate, setTargetDate] = useState(
    event?.targetDate ? new Date(event.targetDate).toISOString().slice(0, 16) : ''
  );
  const [color, setColor] = useState(event?.color || eventColors.blue.value);
  const [emoji, setEmoji] = useState(event?.emoji || '📅');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !targetDate) return;

    onSave({
      title: title.trim(),
      targetDate: new Date(targetDate).toISOString(),
      color,
      emoji,
    });
  };

  const isValid = title.trim().length > 0 && targetDate.length > 0;

  const commonEmojis = ['📅', '🎉', '🎂', '🎓', '💼', '✈️', '🏠', '💍', '🎯', '⭐', '🎊', '🎈', '🎁', '❤️', '🔥', '⚡'];

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="emoji">Icon Event</Label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-4xl border-2 border-border">
                {emoji}
              </div>
              <Input
                id="emoji"
                value={emoji}
                onChange={(e) => setEmoji(e.target.value.slice(0, 2))}
                placeholder="📅"
                className="w-20 text-center text-2xl"
                maxLength={2}
              />
            </div>
            <div className="grid grid-cols-8 gap-2">
              {commonEmojis.map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => setEmoji(e)}
                  className={`h-10 rounded-lg border-2 transition-all hover:scale-110 text-xl ${
                    emoji === e ? 'border-foreground bg-muted' : 'border-border'
                  }`}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="title">{t.eventTitle}</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t.eventTitle}
            maxLength={100}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date">{t.eventDate}</Label>
          <Input
            id="date"
            type="datetime-local"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            required
          />
        </div>

        <div className="space-y-3">
          <Label>{t.eventColor}</Label>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {Object.entries(eventColors).map(([key, { value, label }]) => (
              <button
                key={key}
                type="button"
                onClick={() => setColor(value)}
                className={`h-12 rounded-lg border-2 transition-all ${
                  color === value ? 'border-foreground scale-110' : 'border-border'
                }`}
                style={{ backgroundColor: value }}
                aria-label={label}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" disabled={!isValid} className="flex-1">
            {t.saveEvent}
          </Button>
          <Button type="button" variant="outline" onClick={onCancel}>
            {t.cancel}
          </Button>
        </div>
      </form>
    </Card>
  );
};
