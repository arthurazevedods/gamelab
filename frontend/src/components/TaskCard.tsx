import { Task, User } from '@/lib/types';
import { users } from '@/mocks/data';
import { Calendar, Clock, Flame, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const categoryColors: Record<string, string> = {
  UI: 'bg-category-ui/20 text-category-ui border-category-ui/30',
  CODIGO: 'bg-category-code/20 text-category-code border-category-code/30',
  ARTE: 'bg-category-art/20 text-category-art border-category-art/30',
  PESQUISA: 'bg-category-research/20 text-category-research border-category-research/30',
  GERAL: 'bg-category-general/20 text-category-general border-category-general/30',
};

const priorityIcons: Record<string, React.ReactNode> = {
  HIGH: <Flame className="w-3.5 h-3.5 text-priority-high" />,
  MEDIUM: <Flame className="w-3.5 h-3.5 text-priority-medium" />,
  LOW: <Flame className="w-3.5 h-3.5 text-priority-low" />,
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  const assignees = task.assignees
    .map((id) => users.find((u) => u.id === id))
    .filter(Boolean) as User[];

  const completedChecklist = task.checklist.filter((c) => c.done).length;
  const totalChecklist = task.checklist.length;
  const checklistProgress = totalChecklist > 0 ? (completedChecklist / totalChecklist) * 100 : 0;

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
  const isWeeklyMission = task.kind === 'WEEKLY_MISSION';

  return (
    <div
      onClick={onClick}
      className={cn(
        'card-gradient p-4 rounded-xl border cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-lg group',
        isWeeklyMission ? 'border-primary/30 hover:border-primary/50' : 'border-border hover:border-primary/30',
        isOverdue && 'border-priority-high/50'
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {isWeeklyMission && (
            <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Missão
            </span>
          )}
          <span className={cn('px-2 py-0.5 rounded-full text-xs font-medium border', categoryColors[task.category])}>
            {task.category}
          </span>
        </div>
        {priorityIcons[task.priority]}
      </div>

      {/* Title */}
      <h3 className="font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
        {task.title}
      </h3>

      {/* Checklist Progress */}
      {totalChecklist > 0 && (
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {completedChecklist}/{totalChecklist}
            </span>
            <span>{Math.round(checklistProgress)}%</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent rounded-full transition-all duration-300"
              style={{ width: `${checklistProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        {/* Date & Time */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          {task.dueDate && (
            <span className={cn('flex items-center gap-1', isOverdue && 'text-priority-high')}>
              <Calendar className="w-3.5 h-3.5" />
              {new Date(task.dueDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
            </span>
          )}
          {task.estimatedMinutes && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {Math.floor(task.estimatedMinutes / 60)}h
            </span>
          )}
        </div>

        {/* XP & Assignees */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-primary flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {task.xpValueDefault} XP
          </span>

          {/* Avatars */}
          <div className="flex -space-x-2">
            {assignees.slice(0, 3).map((user) => (
              <img
                key={user.id}
                src={user.avatarUrl}
                alt={user.name}
                className="w-6 h-6 rounded-full border-2 border-card"
                title={user.name}
              />
            ))}
            {assignees.length > 3 && (
              <div className="w-6 h-6 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-xs text-muted-foreground">
                +{assignees.length - 3}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
