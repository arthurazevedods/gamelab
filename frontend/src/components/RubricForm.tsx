import { useState } from 'react';
import { Submission, RubricCriterion } from '@/lib/types';
import { users, tasks, rubrics } from '@/mocks/data';
import { Star, CheckCircle, Sparkles } from 'lucide-react';

interface RubricFormProps {
  submission: Submission;
  onSubmit: (scores: Record<string, number>, feedback: string) => void;
  onClose: () => void;
}

export function RubricForm({ submission, onSubmit, onClose }: RubricFormProps) {
  const rubric = rubrics[0]; // Using default rubric
  const task = tasks.find((t) => t.id === submission.taskId);
  const user = users.find((u) => u.id === submission.userId);
  
  const [scores, setScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    rubric.criteria.forEach((c) => {
      initial[c.id] = Math.floor(c.maxScore / 2);
    });
    return initial;
  });
  const [feedback, setFeedback] = useState('');

  const calculateFinalScore = () => {
    let total = 0;
    rubric.criteria.forEach((c) => {
      const normalizedScore = (scores[c.id] / c.maxScore) * 10;
      total += normalizedScore * c.weight;
    });
    return Math.round(total * 10) / 10;
  };

  const finalScore = calculateFinalScore();
  const xpAwarded = Math.round(task?.xpValueDefault || 0 * (finalScore / 10));

  const handleSubmit = () => {
    onSubmit(scores, feedback);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-scale-in">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground mb-2">Revisão de Entrega</h2>
          <div className="flex items-center gap-3">
            <img src={user?.avatarUrl} alt={user?.name} className="w-10 h-10 rounded-full" />
            <div>
              <p className="font-medium text-foreground">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{task?.title}</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] space-y-6">
          {/* Submission Content */}
          <div className="p-4 rounded-lg bg-secondary border border-border">
            <p className="text-sm text-foreground">{submission.text}</p>
            {submission.links && submission.links.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {submission.links.map((link, i) => (
                  <a
                    key={i}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline"
                  >
                    📎 Link {i + 1}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Rubric Criteria */}
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-4">Critérios de Avaliação</h3>
            <div className="space-y-4">
              {rubric.criteria.map((criterion) => (
                <CriterionSlider
                  key={criterion.id}
                  criterion={criterion}
                  value={scores[criterion.id]}
                  onChange={(value) => setScores({ ...scores, [criterion.id]: value })}
                />
              ))}
            </div>
          </div>

          {/* Score Summary */}
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Nota Final</p>
                <p className="text-3xl font-bold text-gradient-gold">{finalScore}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">XP a Conceder</p>
                <p className="text-2xl font-bold text-primary flex items-center gap-1">
                  <Sparkles className="w-5 h-5" />
                  {xpAwarded}
                </p>
              </div>
            </div>
          </div>

          {/* Feedback */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Feedback</label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              placeholder="Escreva um feedback construtivo..."
              className="w-full bg-input px-4 py-3 rounded-lg border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors font-medium flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Aprovar e Conceder XP
          </button>
        </div>
      </div>
    </div>
  );
}

interface CriterionSliderProps {
  criterion: RubricCriterion;
  value: number;
  onChange: (value: number) => void;
}

function CriterionSlider({ criterion, value, onChange }: CriterionSliderProps) {
  return (
    <div className="p-4 rounded-lg bg-secondary border border-border">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-medium text-foreground">{criterion.name}</p>
          <p className="text-xs text-muted-foreground">Peso: {criterion.weight * 100}%</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: criterion.maxScore }, (_, i) => (
            <button
              key={i}
              onClick={() => onChange(i + 1)}
              className="p-0.5"
            >
              <Star
                className={`w-5 h-5 transition-colors ${
                  i < value ? 'text-primary fill-primary' : 'text-muted-foreground'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">0</span>
        <span className="font-medium text-primary">{value}/{criterion.maxScore}</span>
        <span className="text-muted-foreground">{criterion.maxScore}</span>
      </div>
    </div>
  );
}
