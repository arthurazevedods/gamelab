import { useState } from 'react';
import { X, Sparkles, FileText } from 'lucide-react';
import { campaigns, quests, users, taskTemplates } from '@/mocks/data';
import { TaskCategory, Priority, TaskKind } from '@/lib/types';

interface CreateTaskModalProps {
  onClose: () => void;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onCreate?: (task: any) => void;
}

export function CreateTaskModal({ onClose, onCreate }: CreateTaskModalProps) {
  const [showTemplates, setShowTemplates] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    campaignId: '',
    questId: '',
    kind: 'NORMAL' as TaskKind,
    category: 'GERAL' as TaskCategory,
    priority: 'MEDIUM' as Priority,
    dueDate: '',
    estimatedMinutes: 60,
    assignees: [] as string[],
    xpValueDefault: 50,
    checklist: [] as { text: string; required: boolean }[],
  });

  const [newChecklistItem, setNewChecklistItem] = useState('');

  const filteredQuests = formData.campaignId
    ? quests.filter((q) => q.campaignId === formData.campaignId)
    : quests;

  const applyTemplate = (templateId: string) => {
    const template = taskTemplates.find((t) => t.id === templateId);
    if (template) {
      setFormData({
        ...formData,
        description: template.description,
        category: template.category,
        estimatedMinutes: template.estimatedMinutes,
        xpValueDefault: template.xpValueDefault,
        checklist: template.checklist.map((c) => ({ text: c.text, required: c.required })),
      });
      setShowTemplates(false);
    }
  };

  const addChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setFormData({
        ...formData,
        checklist: [...formData.checklist, { text: newChecklistItem, required: false }],
      });
      setNewChecklistItem('');
    }
  };

  const removeChecklistItem = (index: number) => {
    setFormData({
      ...formData,
      checklist: formData.checklist.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate?.(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">Nova Tarefa</h2>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowTemplates(!showTemplates)}
              className="px-3 py-1.5 text-sm bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Templates
            </button>
            <button onClick={onClose} className="p-2 rounded-lg hover:bg-secondary transition-colors">
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Template Picker */}
        {showTemplates && (
          <div className="p-4 bg-secondary/50 border-b border-border">
            <p className="text-sm text-muted-foreground mb-3">Escolha um template:</p>
            <div className="grid grid-cols-3 gap-2">
              {taskTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => applyTemplate(template.id)}
                  className="p-3 rounded-lg bg-card border border-border hover:border-primary transition-colors text-left"
                >
                  <p className="text-sm font-medium text-foreground">{template.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{template.category}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Título</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-input px-4 py-2 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Descrição</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full bg-input px-4 py-2 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>

          {/* Grid: Campaign, Quest, Kind */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Campaign</label>
              <select
                value={formData.campaignId}
                onChange={(e) => setFormData({ ...formData, campaignId: e.target.value, questId: '' })}
                className="w-full bg-input px-3 py-2 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Nenhuma</option>
                {campaigns.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Quest</label>
              <select
                value={formData.questId}
                onChange={(e) => setFormData({ ...formData, questId: e.target.value })}
                className="w-full bg-input px-3 py-2 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="">Nenhuma</option>
                {filteredQuests.map((q) => (
                  <option key={q.id} value={q.id}>{q.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Tipo</label>
              <select
                value={formData.kind}
                onChange={(e) => setFormData({ ...formData, kind: e.target.value as TaskKind })}
                className="w-full bg-input px-3 py-2 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="NORMAL">Normal</option>
                <option value="WEEKLY_MISSION">Missão Semanal</option>
              </select>
            </div>
          </div>

          {/* Grid: Category, Priority, XP */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as TaskCategory })}
                className="w-full bg-input px-3 py-2 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="UI">UI</option>
                <option value="CODIGO">Código</option>
                <option value="ARTE">Arte</option>
                <option value="PESQUISA">Pesquisa</option>
                <option value="GERAL">Geral</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Prioridade</label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
                className="w-full bg-input px-3 py-2 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <option value="LOW">Baixa</option>
                <option value="MEDIUM">Média</option>
                <option value="HIGH">Alta</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-primary" /> XP
              </label>
              <input
                type="number"
                value={formData.xpValueDefault}
                onChange={(e) => setFormData({ ...formData, xpValueDefault: Number(e.target.value) })}
                min={0}
                className="w-full bg-input px-3 py-2 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Grid: Due Date, Time */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Prazo</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full bg-input px-3 py-2 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">Tempo estimado (min)</label>
              <input
                type="number"
                value={formData.estimatedMinutes}
                onChange={(e) => setFormData({ ...formData, estimatedMinutes: Number(e.target.value) })}
                min={0}
                step={15}
                className="w-full bg-input px-3 py-2 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          {/* Assignees */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Responsáveis</label>
            <div className="flex flex-wrap gap-2">
              {users.map((user) => (
                <button
                  key={user.id}
                  type="button"
                  onClick={() => {
                    const newAssignees = formData.assignees.includes(user.id)
                      ? formData.assignees.filter((id) => id !== user.id)
                      : [...formData.assignees, user.id];
                    setFormData({ ...formData, assignees: newAssignees });
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${
                    formData.assignees.includes(user.id)
                      ? 'bg-primary/20 border-primary text-primary'
                      : 'bg-secondary border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <img src={user.avatarUrl} alt={user.name} className="w-5 h-5 rounded-full" />
                  <span className="text-sm">{user.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Checklist */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1">Checklist</label>
            <div className="space-y-2 mb-2">
              {formData.checklist.map((item, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-secondary rounded-lg">
                  <input
                    type="checkbox"
                    checked={item.required}
                    onChange={() => {
                      const newChecklist = [...formData.checklist];
                      newChecklist[index].required = !newChecklist[index].required;
                      setFormData({ ...formData, checklist: newChecklist });
                    }}
                    className="rounded"
                  />
                  <span className="flex-1 text-sm text-foreground">{item.text}</span>
                  <span className="text-xs text-muted-foreground">{item.required ? 'Obrigatório' : 'Opcional'}</span>
                  <button
                    type="button"
                    onClick={() => removeChecklistItem(index)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                placeholder="Novo item..."
                className="flex-1 bg-input px-3 py-2 rounded-lg border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addChecklistItem())}
              />
              <button
                type="button"
                onClick={addChecklistItem}
                className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors text-sm"
              >
                Adicionar
              </button>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3 pt-4 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Criar Tarefa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
