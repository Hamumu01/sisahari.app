import { useState, useEffect } from 'react';
import { CountdownEvent, loadEvents, saveEvents, sortEventsByDeadline } from '@/lib/events';

export const useEvents = () => {
  const [events, setEvents] = useState<CountdownEvent[]>([]);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  const addEvent = (event: Omit<CountdownEvent, 'id' | 'createdAt'>) => {
    const newEvent: CountdownEvent = {
      ...event,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    const updated = sortEventsByDeadline([...events, newEvent]);
    setEvents(updated);
    saveEvents(updated);
    return newEvent.id;
  };

  const updateEvent = (id: string, updates: Partial<CountdownEvent>) => {
    const updated = events.map((e) => (e.id === id ? { ...e, ...updates } : e));
    const sorted = sortEventsByDeadline(updated);
    setEvents(sorted);
    saveEvents(sorted);
  };

  const deleteEvent = (id: string) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    saveEvents(updated);
  };

  const getEvent = (id: string) => {
    return events.find((e) => e.id === id);
  };

  return {
    events: sortEventsByDeadline(events),
    addEvent,
    updateEvent,
    deleteEvent,
    getEvent,
  };
};
