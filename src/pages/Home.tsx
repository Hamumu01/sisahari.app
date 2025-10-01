import { CountdownHero } from '@/components/CountdownHero';
import { YearProgress } from '@/components/YearProgress';
import { MiniCalendar } from '@/components/MiniCalendar';
import { ControlPanel } from '@/components/ControlPanel';

const Home = () => {
  return (
    <div className="space-y-8">
      <CountdownHero />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ControlPanel />
        <YearProgress />
      </div>

      <MiniCalendar />
    </div>
  );
};

export default Home;
