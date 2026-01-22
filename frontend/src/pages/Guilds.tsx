import { Topbar } from '@/components/layout/Topbar';
import { guilds, users, tasks } from '@/mocks/data';
import { Link } from 'react-router-dom';
import { Users, Sparkles } from 'lucide-react';

export default function Guilds() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Guildas" showFilters={false} />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {guilds.map((guild) => {
            const members = users.filter((u) => u.guildId === guild.id);
            const guildXP = members.reduce((sum, m) => sum + m.xpTotal, 0);
            const guildTasks = tasks.filter((t) => t.assignees.some((a) => members.find((m) => m.id === a)));
            
            return (
              <Link
                key={guild.id}
                to={`/guilds/${guild.id}`}
                className="card-gradient p-6 rounded-2xl border border-border hover:border-primary/50 transition-all group"
                style={{ borderColor: `${guild.color}30` }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{guild.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {guild.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" /> {members.length} membros
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{guildTasks.length} tarefas</span>
                  <span className="text-sm font-bold text-primary flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> {guildXP.toLocaleString()} XP
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
