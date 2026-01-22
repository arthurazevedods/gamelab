import { Topbar } from '@/components/layout/Topbar';
import { calendarEvents, tasks } from '@/mocks/data';
import { Calendar as CalendarIcon, Clock, Target, Users } from 'lucide-react';

export default function CalendarPage() {
  const allItems = [
    ...calendarEvents.map((e) => ({ ...e, itemType: 'event' as const })),
    ...tasks.filter((t) => t.dueDate).map((t) => ({
      id: t.id, title: t.title, startAt: t.dueDate!, endAt: t.dueDate!,
      type: 'DEADLINE' as const, scope: 'GLOBAL' as const, itemType: 'task' as const
    })),
  ].sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime());

  const groupedByDate = allItems.reduce((acc, item) => {
    const date = new Date(item.startAt).toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' });
    if (!acc[date]) acc[date] = [];
    acc[date].push(item);
    return acc;
  }, {} as Record<string, typeof allItems>);

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Calendário" showFilters={false} />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
          {Object.entries(groupedByDate).map(([date, items]) => (
            <div key={date}>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <CalendarIcon className="w-4 h-4" /> {date}
              </h3>
              <div className="space-y-2">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className={`p-4 rounded-xl border ${
                      item.type === 'DEADLINE' ? 'bg-destructive/10 border-destructive/30' :
                      item.type === 'MILESTONE' ? 'bg-primary/10 border-primary/30' :
                      'bg-accent/10 border-accent/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.type === 'DEADLINE' ? <Target className="w-4 h-4 text-destructive" /> :
                         item.type === 'MILESTONE' ? <Target className="w-4 h-4 text-primary" /> :
                         <Users className="w-4 h-4 text-accent" />}
                        <div>
                          <p className="font-medium text-foreground">{item.title}</p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(item.startAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 text-xs rounded-full ${
                        item.type === 'DEADLINE' ? 'bg-destructive/20 text-destructive' :
                        item.type === 'MILESTONE' ? 'bg-primary/20 text-primary' :
                        'bg-accent/20 text-accent'
                      }`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
