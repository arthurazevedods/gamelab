import { Badge, XPTransaction } from '@/lib/types';
import { badges } from '@/mocks/data';
import { Sparkles, TrendingUp } from 'lucide-react';

interface BadgesListProps {
  badgeIds: string[];
}

export function BadgesList({ badgeIds }: BadgesListProps) {
  const userBadges = badgeIds
    .map((id) => badges.find((b) => b.id === id))
    .filter(Boolean) as Badge[];

  if (userBadges.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Nenhuma badge conquistada ainda.</p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {userBadges.map((badge) => (
        <div
          key={badge.id}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/10 border border-primary/30 glow-gold"
        >
          <span className="text-lg">{badge.icon}</span>
          <div>
            <p className="text-sm font-medium text-foreground">{badge.name}</p>
            <p className="text-xs text-muted-foreground">{badge.category}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

interface XPHistoryProps {
  transactions: XPTransaction[];
}

export function XPHistory({ transactions }: XPHistoryProps) {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (sortedTransactions.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">Nenhuma transação de XP ainda.</p>
    );
  }

  return (
    <div className="space-y-2">
      {sortedTransactions.map((tx) => (
        <div
          key={tx.id}
          className="flex items-center justify-between p-3 rounded-lg bg-secondary border border-border"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              {tx.sourceType === 'task' ? (
                <Sparkles className="w-4 h-4 text-primary" />
              ) : (
                <TrendingUp className="w-4 h-4 text-accent" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{tx.note}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(tx.createdAt).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <span className="text-sm font-bold text-primary">+{tx.amount} XP</span>
        </div>
      ))}
    </div>
  );
}
