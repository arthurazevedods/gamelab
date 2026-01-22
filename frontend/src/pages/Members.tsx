import { Topbar } from '@/components/layout/Topbar';
import { users, guilds } from '@/mocks/data';
import { Link } from 'react-router-dom';
import { Sparkles, Shield } from 'lucide-react';

export default function Members() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Membros" showFilters={false} />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {users.map((user) => {
            const guild = guilds.find((g) => g.id === user.guildId);
            return (
              <Link
                key={user.id}
                to={`/members/${user.id}`}
                className="card-gradient p-5 rounded-xl border border-border hover:border-primary/50 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <img src={user.avatarUrl} alt={user.name} className="w-14 h-14 rounded-full border-2 border-primary/30" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                      {user.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                    {guild && (
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Shield className="w-3 h-3" /> {guild.name}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex gap-1">
                    {user.classes?.slice(0, 2).map((c) => (
                      <span key={c.id} className="px-2 py-0.5 bg-class-blue/20 text-class-blue text-xs rounded-full">
                        {c.name}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-bold text-primary flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {user.xpTotal}
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
