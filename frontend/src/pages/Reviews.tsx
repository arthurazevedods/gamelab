import { useState } from 'react';
import { Topbar } from '@/components/layout/Topbar';
import { RubricForm } from '@/components/RubricForm';
import { submissions, users, tasks } from '@/mocks/data';
import { Submission } from '@/lib/types';
import { Link2, Clock } from 'lucide-react';

export default function Reviews() {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  return (
    <div className="flex-1 flex flex-col">
      <Topbar title="Revisões" showFilters={false} />
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-4">
          {submissions.map((sub) => {
            const user = users.find((u) => u.id === sub.userId);
            const task = tasks.find((t) => t.id === sub.taskId);
            
            return (
              <div key={sub.id} className="card-gradient p-6 rounded-xl border border-border">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img src={user?.avatarUrl} alt={user?.name} className="w-12 h-12 rounded-full" />
                    <div>
                      <p className="font-semibold text-foreground">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">{task?.title}</p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {new Date(sub.createdAt).toLocaleString('pt-BR')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSubmission(sub)}
                    className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:bg-accent/90 transition-colors text-sm font-medium"
                  >
                    Revisar
                  </button>
                </div>
                <p className="mt-4 text-sm text-foreground">{sub.text}</p>
                {sub.links && sub.links.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {sub.links.map((link, i) => (
                      <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                        <Link2 className="w-3 h-3" /> Link {i + 1}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {selectedSubmission && (
        <RubricForm
          submission={selectedSubmission}
          onSubmit={(scores, feedback) => console.log('Review submitted:', { scores, feedback })}
          onClose={() => setSelectedSubmission(null)}
        />
      )}
    </div>
  );
}
