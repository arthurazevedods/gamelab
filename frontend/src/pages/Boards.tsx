import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { TaskCard } from '@/components/TaskCard';
import { TaskModal } from '@/components/TaskModal';
import { CreateTaskModal } from '@/components/CreateTaskModal';
import { tasks, columns, guilds, classRoles } from '@/mocks/data';
import { Task } from '@/lib/types';
import { Plus, Filter, ChevronLeft, ChevronRight } from 'lucide-react';

export default function Boards() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filters, setFilters] = useState({
    campaign: '',
    quest: '',
    guild: '',
    classRole: '',
    category: '',
    kind: '',
  });

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    if (filters.campaign && task.campaignId !== filters.campaign) return false;
    if (filters.quest && task.questId !== filters.quest) return false;
    if (filters.category && task.category !== filters.category) return false;
    if (filters.kind && task.kind !== filters.kind) return false;
    return true;
  });

  // Group tasks by column
  const tasksByColumn = columns.reduce((acc, col) => {
    acc[col.id] = filteredTasks.filter((t) => t.columnId === col.id);
    return acc;
  }, {} as Record<string, Task[]>);

  const moveTask = (taskId: string, direction: 'left' | 'right') => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;
    
    const currentColIndex = columns.findIndex((c) => c.id === task.columnId);
    const newColIndex = direction === 'left' ? currentColIndex - 1 : currentColIndex + 1;
    
    if (newColIndex >= 0 && newColIndex < columns.length) {
      // In real app, this would update via API
      task.columnId = columns[newColIndex].id;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <Topbar 
        title="Quadro Geral" 
        onCampaignChange={(id) => setFilters({ ...filters, campaign: id })}
        onQuestChange={(id) => setFilters({ ...filters, quest: id })}
      />
      
      {/* Additional Filters */}
      <div className="px-6 py-3 border-b border-border bg-card/30 flex items-center gap-4 overflow-x-auto">
        <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        
        <select
          value={filters.guild}
          onChange={(e) => setFilters({ ...filters, guild: e.target.value })}
          className="bg-secondary text-sm text-foreground px-3 py-1.5 rounded-lg border border-border"
        >
          <option value="">Todas Guildas</option>
          {guilds.map((g) => (
            <option key={g.id} value={g.id}>{g.name}</option>
          ))}
        </select>

        <select
          value={filters.classRole}
          onChange={(e) => setFilters({ ...filters, classRole: e.target.value })}
          className="bg-secondary text-sm text-foreground px-3 py-1.5 rounded-lg border border-border"
        >
          <option value="">Todas Classes</option>
          {classRoles.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <select
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="bg-secondary text-sm text-foreground px-3 py-1.5 rounded-lg border border-border"
        >
          <option value="">Todas Categorias</option>
          <option value="UI">UI</option>
          <option value="CODIGO">Código</option>
          <option value="ARTE">Arte</option>
          <option value="PESQUISA">Pesquisa</option>
          <option value="GERAL">Geral</option>
        </select>

        <select
          value={filters.kind}
          onChange={(e) => setFilters({ ...filters, kind: e.target.value })}
          className="bg-secondary text-sm text-foreground px-3 py-1.5 rounded-lg border border-border"
        >
          <option value="">Todos Tipos</option>
          <option value="NORMAL">Normal</option>
          <option value="WEEKLY_MISSION">Missão Semanal</option>
        </select>

        <div className="flex-1" />

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-1.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium flex items-center gap-2 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          Nova Tarefa
        </button>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 p-6 overflow-x-auto">
        <div className="flex gap-4 min-w-max h-full">
          {columns.map((column, colIndex) => (
            <div
              key={column.id}
              className="w-80 flex-shrink-0 flex flex-col"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{column.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-secondary text-xs text-muted-foreground">
                    {tasksByColumn[column.id]?.length || 0}
                  </span>
                </div>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-3 overflow-y-auto pr-1">
                {tasksByColumn[column.id]?.map((task) => (
                  <div key={task.id} className="relative group">
                    <TaskCard task={task} onClick={() => setSelectedTask(task)} />
                    
                    {/* Move buttons */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                      {colIndex > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveTask(task.id, 'left');
                          }}
                          className="p-1 bg-secondary/90 rounded hover:bg-secondary"
                        >
                          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                      {colIndex < columns.length - 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            moveTask(task.id, 'right');
                          }}
                          className="p-1 bg-secondary/90 rounded hover:bg-secondary"
                        >
                          <ChevronRight className="w-4 h-4 text-muted-foreground" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {selectedTask && (
        <TaskModal task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
      {showCreateModal && (
        <CreateTaskModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
}
