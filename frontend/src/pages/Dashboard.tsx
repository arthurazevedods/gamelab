import { Topbar } from '@/components/layout/Topbar';
import { tasks, users, calendarEvents, xpTransactions, submissions } from '@/mocks/data';
import { Sparkles, Clock, CheckCircle2, AlertTriangle, Calendar, TrendingUp, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  // Calculate metrics
  const inReviewTasks = tasks.filter((t) => t.columnId === 'col-3');
  const overdueTasks = tasks.filter((t) => t.dueDate && new Date(t.dueDate) < new Date() && t.columnId !== 'col-4');
  const weeklyMissions = tasks.filter((t) => t.kind === 'WEEKLY_MISSION' && t.columnId !== 'col-4');
  const totalTeamXP = users.reduce((sum, u) => sum + u.xpTotal, 0);

  // Next 7 days items
  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  const upcomingTasks = tasks
    .filter((t) => {
      if (!t.dueDate || t.columnId === 'col-4') return false;
      const dueDate = new Date(t.dueDate);
      return dueDate >= now && dueDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5);

  const upcomingEvents = calendarEvents
    .filter((e) => {
      const startDate = new Date(e.startAt);
      return startDate >= now && startDate <= nextWeek;
    })
    .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
    .slice(0, 3);

  // Recent XP transactions
  const recentXP = [...xpTransactions]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Dashboard" showFilters={false} />
      
      <div className="flex-1 p-6 overflow-y-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Em Revisão"
            value={inReviewTasks.length}
            icon={<CheckCircle2 className="w-5 h-5" />}
            color="accent"
            link="/reviews"
          />
          <StatCard
            title="Vencendo"
            value={overdueTasks.length}
            icon={<AlertTriangle className="w-5 h-5" />}
            color="destructive"
            link="/boards"
          />
          <StatCard
            title="Missões Semanais"
            value={weeklyMissions.length}
            icon={<Clock className="w-5 h-5" />}
            color="primary"
            link="/boards"
          />
          <StatCard
            title="XP Total do Time"
            value={totalTeamXP.toLocaleString()}
            icon={<Sparkles className="w-5 h-5" />}
            color="primary"
            link="/members"
            glow
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Items */}
          <div className="lg:col-span-2 card-gradient p-6 rounded-2xl border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Próximos 7 dias
            </h2>

            <div className="space-y-3">
              {upcomingTasks.map((task) => {
                const assignees = task.assignees.map((id) => users.find((u) => u.id === id)).filter(Boolean);
                return (
                  <Link
                    key={task.id}
                    to="/boards"
                    className="flex items-center justify-between p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {task.title}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(task.dueDate!).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-primary">{task.xpValueDefault} XP</span>
                      <div className="flex -space-x-2">
                        {assignees.slice(0, 2).map((u) => (
                          <img key={u?.id} src={u?.avatarUrl} alt="" className="w-6 h-6 rounded-full border-2 border-card" />
                        ))}
                      </div>
                    </div>
                  </Link>
                );
              })}

              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 rounded-xl bg-quest-purple/10 border border-quest-purple/30"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-quest-purple/20 flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-quest-purple" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.startAt).toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
                        {' - '}
                        {new Date(event.startAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    event.type === 'DEADLINE' ? 'bg-destructive/20 text-destructive' :
                    event.type === 'MILESTONE' ? 'bg-primary/20 text-primary' :
                    'bg-accent/20 text-accent'
                  }`}>
                    {event.type}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent XP Activity */}
          <div className="card-gradient p-6 rounded-2xl border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-accent" />
              Atividade de XP
            </h2>

            <div className="space-y-3">
              {recentXP.map((tx) => {
                const user = users.find((u) => u.id === tx.userId);
                return (
                  <div
                    key={tx.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                  >
                    <div className="flex items-center gap-3">
                      <img src={user?.avatarUrl} alt="" className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{tx.note}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-primary">+{tx.amount}</span>
                  </div>
                );
              })}
            </div>

            <Link
              to="/members"
              className="block mt-4 text-center text-sm text-primary hover:underline"
            >
              Ver todos os membros →
            </Link>
          </div>
        </div>

        {/* Pending Reviews */}
        {submissions.length > 0 && (
          <div className="mt-6 card-gradient p-6 rounded-2xl border border-border">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Entregas Pendentes de Revisão
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex -space-x-3">
                {submissions.slice(0, 4).map((sub) => {
                  const user = users.find((u) => u.id === sub.userId);
                  return (
                    <img
                      key={sub.id}
                      src={user?.avatarUrl}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-card"
                    />
                  );
                })}
              </div>
              <p className="text-sm text-muted-foreground">
                {submissions.length} entregas aguardando revisão
              </p>
              <Link
                to="/reviews"
                className="ml-auto px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
              >
                Revisar agora
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'primary' | 'accent' | 'destructive';
  link: string;
  glow?: boolean;
}

function StatCard({ title, value, icon, color, link, glow }: StatCardProps) {
  const colorClasses = {
    primary: 'bg-primary/20 text-primary',
    accent: 'bg-accent/20 text-accent',
    destructive: 'bg-destructive/20 text-destructive',
  };

  return (
    <Link
      to={link}
      className={`card-gradient p-5 rounded-xl border border-border hover:border-${color}/50 transition-all group ${glow ? 'glow-gold' : ''}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${colorClasses[color]} flex items-center justify-center`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold text-foreground group-hover:text-gradient-gold transition-colors">
        {value}
      </p>
      <p className="text-sm text-muted-foreground mt-1">{title}</p>
    </Link>
  );
}
