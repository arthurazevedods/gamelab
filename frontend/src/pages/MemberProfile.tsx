import { useParams, Link } from 'react-router-dom';
import { Topbar } from '@/components/layout/Topbar';
import { BadgesList, XPHistory } from '@/components/BadgesAndXP';
import { TaskCard } from '@/components/TaskCard';
import { users, guilds, tasks, xpTransactions, userBadges } from '@/mocks/data';
import { Sparkles, Shield, ArrowLeft, CheckCircle2, Clock, Target } from 'lucide-react';
import { useState } from 'react';
import { TaskModal } from '@/components/TaskModal';
import { Task } from '@/lib/types';

export default function MemberProfile() {
  const { id } = useParams();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  
  const user = users.find((u) => u.id === id);
  const guild = user?.guildId ? guilds.find((g) => g.id === user.guildId) : null;
  const userXPTransactions = xpTransactions.filter((tx) => tx.userId === id);
  const badges = userBadges[id || ''] || [];
  
  // Get user's tasks
  const userTasks = tasks.filter((t) => t.assignees.includes(id || ''));
  const activeTasks = userTasks.filter((t) => t.columnId !== 'col-4');
  const completedTasks = userTasks.filter((t) => t.columnId === 'col-4');
  
  // Calculate XP from transactions
  const totalXP = userXPTransactions.reduce((sum, tx) => sum + tx.amount, 0);

  if (!user) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center">
        <p className="text-muted-foreground">Membro não encontrado</p>
        <Link to="/members" className="text-primary hover:underline mt-2">Voltar para membros</Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Perfil do Membro" showFilters={false} />
      
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Back button */}
        <Link to="/members" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Voltar para membros
        </Link>

        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
          <div className="card-gradient p-8 rounded-2xl border border-border mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-24 h-24 rounded-full border-4 border-primary/30 glow-gold" 
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-foreground mb-2">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <span className={`px-3 py-1 rounded-full ${
                    user.role === 'ADMIN' ? 'bg-primary/20 text-primary' :
                    user.role === 'MENTOR' ? 'bg-accent/20 text-accent' :
                    'bg-secondary text-muted-foreground'
                  }`}>
                    {user.role}
                  </span>
                  {guild && (
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Shield className="w-4 h-4" /> {guild.name}
                    </span>
                  )}
                  {user.classes && user.classes.length > 0 && (
                    <div className="flex gap-1">
                      {user.classes.map((c) => (
                        <span key={c.id} className="px-2 py-0.5 bg-class-blue/20 text-class-blue rounded-full text-xs">
                          {c.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              {/* XP Card */}
              <div className="p-6 rounded-xl bg-primary/10 border border-primary/30 glow-gold text-center min-w-[140px]">
                <Sparkles className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-3xl font-bold text-gradient-gold">{totalXP.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">XP Total</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="card-gradient p-5 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{activeTasks.length}</p>
                  <p className="text-sm text-muted-foreground">Tarefas Ativas</p>
                </div>
              </div>
            </div>
            <div className="card-gradient p-5 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-guild-emerald/20 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5 text-guild-emerald" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{completedTasks.length}</p>
                  <p className="text-sm text-muted-foreground">Concluídas</p>
                </div>
              </div>
            </div>
            <div className="card-gradient p-5 rounded-xl border border-border">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-quest-purple/20 flex items-center justify-center">
                  <Target className="w-5 h-5 text-quest-purple" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{badges.length}</p>
                  <p className="text-sm text-muted-foreground">Badges</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Badges Section */}
            <div className="card-gradient p-6 rounded-2xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" /> Badges Conquistadas
              </h2>
              <BadgesList badgeIds={badges} />
            </div>

            {/* XP History */}
            <div className="card-gradient p-6 rounded-2xl border border-border">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Histórico de XP
              </h2>
              <div className="max-h-80 overflow-y-auto pr-2">
                <XPHistory transactions={userXPTransactions} />
              </div>
            </div>
          </div>

          {/* Active Tasks */}
          {activeTasks.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" /> Tarefas Ativas ({activeTasks.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div className="mt-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-guild-emerald" /> Tarefas Concluídas ({completedTasks.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 opacity-75">
                {completedTasks.map((task) => (
                  <TaskCard key={task.id} task={task} onClick={() => setSelectedTask(task)} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}
