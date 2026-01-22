import { Topbar } from '@/components/layout/Topbar';
import { classRoles, users } from '@/mocks/data';
import { Link } from 'react-router-dom';
import { Users, Sparkles } from 'lucide-react';

const classIcons: Record<string, string> = {
  'Mago': '🧙', 'Bardo': '🎭', 'Clérigo': '⚕️', 'Guerreiro': '⚔️', 'Arqueiro': '🏹', 'Paladino': '🛡️'
};

export default function Classes() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Classes" showFilters={false} />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {classRoles.map((classRole) => {
            const members = users.filter((u) => u.classes?.some((c) => c.id === classRole.id));
            const classXP = members.reduce((sum, m) => sum + m.xpTotal, 0);
            
            return (
              <Link
                key={classRole.id}
                to={`/classes/${classRole.id}`}
                className="card-gradient p-6 rounded-2xl border border-border hover:border-class-blue/50 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl">{classIcons[classRole.name] || '🎮'}</div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground group-hover:text-class-blue transition-colors">
                      {classRole.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4" /> {members.length} membros
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  <span className="text-sm font-bold text-primary flex items-center gap-1">
                    <Sparkles className="w-4 h-4" /> {classXP.toLocaleString()} XP
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
