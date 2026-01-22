import { Task, User, Submission } from '@/lib/types';
import { users, submissions as allSubmissions, quests, campaigns, guilds, classRoles } from '@/mocks/data';
import { 
  X, Calendar, Clock, Sparkles, CheckCircle2, Circle, 
  Users as UsersIcon, Eye, Link2, Send, Flame, Target, Shield, Swords 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface TaskModalProps {
  task: Task;
  onClose: () => void;
}

const categoryColors: Record<string, string> = {
  UI: 'bg-category-ui/20 text-category-ui',
  CODIGO: 'bg-category-code/20 text-category-code',
  ARTE: 'bg-category-art/20 text-category-art',
  PESQUISA: 'bg-category-research/20 text-category-research',
  GERAL: 'bg-category-general/20 text-category-general',
};

export function TaskModal({ task, onClose }: TaskModalProps) {
  const [newSubmission, setNewSubmission] = useState('');
  const assignees = task.assignees.map((id) => users.find((u) => u.id === id)).filter(Boolean) as User[];
  const watchers = (task.watchers || []).map((id) => users.find((u) => u.id === id)).filter(Boolean) as User[];
  const taskSubmissions = allSubmissions.filter((s) => s.taskId === task.id);
  
  const quest = task.questId ? quests.find((q) => q.id === task.questId) : null;
  const campaign = task.campaignId ? campaigns.find((c) => c.id === task.campaignId) : null;

  const completedChecklist = task.checklist.filter((c) => c.done).length;
  const totalChecklist = task.checklist.length;

  const getScopeInfo = () => {
    if (!quest) return null;
    if (quest.scope === 'GUILD') {
      const guild = guilds.find((g) => g.id === quest.refId);
      return { type: 'GUILDA', name: guild?.name, icon: <Shield className="w-4 h-4" />, color: guild?.color };
    }
    if (quest.scope === 'CLASS') {
      const classRole = classRoles.find((c) => c.id === quest.refId);
      return { type: 'CLASSE', name: classRole?.name, icon: <Swords className="w-4 h-4" />, color: '#60a5fa' };
    }
    return { type: 'GLOBAL', name: 'Global', icon: <Target className="w-4 h-4" />, color: '#f59e0b' };
  };

  const scopeInfo = getScopeInfo();

  const handleSubmit = () => {
    if (newSubmission.trim()) {
      // In real app, this would call the API
      console.log('Submitting:', newSubmission);
      setNewSubmission('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Modal */}
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {/* Tags */}
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                {task.kind === 'WEEKLY_MISSION' && (
                  <span className="px-2 py-1 rounded-full bg-primary/20 text-primary text-xs font-medium flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Missão Semanal
                  </span>
                )}
                <span className={cn('px-2 py-1 rounded-full text-xs font-medium', categoryColors[task.category])}>
                  {task.category}
                </span>
                <span className={cn(
                  'px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1',
                  task.priority === 'HIGH' && 'bg-priority-high/20 text-priority-high',
                  task.priority === 'MEDIUM' && 'bg-priority-medium/20 text-priority-medium',
                  task.priority === 'LOW' && 'bg-priority-low/20 text-priority-low',
                )}>
                  <Flame className="w-3 h-3" />
                  {task.priority}
                </span>
                {scopeInfo && (
                  <span 
                    className="px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1"
                    style={{ backgroundColor: `${scopeInfo.color}20`, color: scopeInfo.color }}
                  >
                    {scopeInfo.icon}
                    {scopeInfo.type}: {scopeInfo.name}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-foreground">{task.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-secondary transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Description */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-2">Descrição</h3>
                <p className="text-foreground">{task.description}</p>
              </div>

              {/* Campaign & Quest */}
              {(campaign || quest) && (
                <div className="flex items-center gap-4 text-sm">
                  {campaign && (
                    <span className="px-3 py-1.5 rounded-lg bg-secondary text-foreground flex items-center gap-2">
                      <Target className="w-4 h-4 text-primary" />
                      {campaign.name}
                    </span>
                  )}
                  {quest && (
                    <span className="px-3 py-1.5 rounded-lg bg-quest-purple/20 text-quest-purple flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      {quest.name}
                    </span>
                  )}
                </div>
              )}

              {/* Checklist */}
              {task.checklist.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-muted-foreground">
                      Checklist ({completedChecklist}/{totalChecklist})
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {Math.round((completedChecklist / totalChecklist) * 100)}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    {task.checklist.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-lg border transition-colors',
                          item.done 
                            ? 'bg-accent/10 border-accent/30' 
                            : 'bg-secondary border-border'
                        )}
                      >
                        {item.done ? (
                          <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                        ) : (
                          <Circle className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                        <span className={cn('text-sm', item.done && 'line-through text-muted-foreground')}>
                          {item.text}
                        </span>
                        {item.required && !item.done && (
                          <span className="text-xs text-priority-high ml-auto">Obrigatório</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Submissions */}
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground mb-3">Entregas</h3>
                {taskSubmissions.length > 0 ? (
                  <div className="space-y-3">
                    {taskSubmissions.map((sub) => {
                      const user = users.find((u) => u.id === sub.userId);
                      return (
                        <div key={sub.id} className="p-4 rounded-lg bg-secondary border border-border">
                          <div className="flex items-center gap-3 mb-2">
                            <img src={user?.avatarUrl} alt={user?.name} className="w-8 h-8 rounded-full" />
                            <div>
                              <p className="text-sm font-medium text-foreground">{user?.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(sub.createdAt).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm text-foreground mb-2">{sub.text}</p>
                          {sub.links && sub.links.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {sub.links.map((link, i) => (
                                <a
                                  key={i}
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs text-primary hover:underline flex items-center gap-1"
                                >
                                  <Link2 className="w-3 h-3" />
                                  Link {i + 1}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Nenhuma entrega ainda.</p>
                )}

                {/* New Submission */}
                <div className="mt-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSubmission}
                      onChange={(e) => setNewSubmission(e.target.value)}
                      placeholder="Adicionar entrega..."
                      className="flex-1 bg-input px-4 py-2 rounded-lg border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* XP */}
              <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">XP Disponível</span>
                </div>
                <p className="text-3xl font-bold text-gradient-gold">{task.xpValueDefault}</p>
                {task.xpAwarded && (
                  <p className="text-sm text-accent mt-1">+{task.xpAwarded} XP concedido</p>
                )}
              </div>

              {/* Meta */}
              <div className="space-y-4">
                {task.dueDate && (
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground text-xs">Prazo</p>
                      <p className="text-foreground font-medium">
                        {new Date(task.dueDate).toLocaleDateString('pt-BR', { 
                          day: '2-digit', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                  </div>
                )}

                {task.estimatedMinutes && (
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-muted-foreground text-xs">Tempo estimado</p>
                      <p className="text-foreground font-medium">
                        {Math.floor(task.estimatedMinutes / 60)}h {task.estimatedMinutes % 60}min
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Assignees */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <UsersIcon className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-muted-foreground">Responsáveis</span>
                </div>
                <div className="space-y-2">
                  {assignees.map((user) => (
                    <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors">
                      <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="text-sm font-medium text-foreground">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Watchers */}
              {watchers.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Eye className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">Observadores</span>
                  </div>
                  <div className="flex -space-x-2">
                    {watchers.map((user) => (
                      <img
                        key={user.id}
                        src={user.avatarUrl}
                        alt={user.name}
                        className="w-8 h-8 rounded-full border-2 border-card"
                        title={user.name}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
