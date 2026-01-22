import { Topbar } from '@/components/layout/Topbar';
import { quests, campaigns, tasks } from '@/mocks/data';
import { Link } from 'react-router-dom';
import { Target, CheckCircle2 } from 'lucide-react';

export default function Quests() {
  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Quests" showFilters={false} />
      <div className="flex-1 p-6 overflow-y-auto space-y-8">
        {campaigns.map((campaign) => {
          const campaignQuests = quests.filter((q) => q.campaignId === campaign.id);
          return (
            <div key={campaign.id}>
              <div className="flex items-center gap-3 mb-4">
                <Target className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold text-foreground">{campaign.name}</h2>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  campaign.status === 'ACTIVE' ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'
                }`}>
                  {campaign.status}
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {campaignQuests.map((quest) => {
                  const questTasks = tasks.filter((t) => t.questId === quest.id);
                  const completed = questTasks.filter((t) => t.columnId === 'col-4').length;
                  const progress = questTasks.length > 0 ? (completed / questTasks.length) * 100 : 0;
                  
                  return (
                    <Link
                      key={quest.id}
                      to={`/quests/${quest.id}`}
                      className="card-gradient p-5 rounded-xl border border-quest-purple/30 hover:border-quest-purple/60 transition-all group"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold text-foreground group-hover:text-quest-purple transition-colors">
                          {quest.name}
                        </h3>
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          quest.scope === 'GLOBAL' ? 'bg-primary/20 text-primary' :
                          quest.scope === 'GUILD' ? 'bg-guild-emerald/20 text-guild-emerald' :
                          'bg-class-blue/20 text-class-blue'
                        }`}>
                          {quest.scope}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{quest.description}</p>
                      <div>
                        <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                          <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> {completed}/{questTasks.length}</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-quest-purple rounded-full" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
