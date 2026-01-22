import { Search, Bell, Filter } from 'lucide-react';
import { campaigns, quests } from '@/mocks/data';
import { useState } from 'react';

interface TopbarProps {
  title: string;
  showFilters?: boolean;
  onCampaignChange?: (campaignId: string) => void;
  onQuestChange?: (questId: string) => void;
  onSearch?: (query: string) => void;
}

export function Topbar({ 
  title, 
  showFilters = true, 
  onCampaignChange,
  onQuestChange,
  onSearch,
}: TopbarProps) {
  const [selectedCampaign, setSelectedCampaign] = useState('');
  const [selectedQuest, setSelectedQuest] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleCampaignChange = (value: string) => {
    setSelectedCampaign(value);
    setSelectedQuest('');
    onCampaignChange?.(value);
  };

  const handleQuestChange = (value: string) => {
    setSelectedQuest(value);
    onQuestChange?.(value);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const filteredQuests = selectedCampaign 
    ? quests.filter(q => q.campaignId === selectedCampaign)
    : quests;

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Title */}
        <h1 className="text-xl font-semibold text-foreground">{title}</h1>

        {/* Filters & Search */}
        <div className="flex items-center gap-3">
          {showFilters && (
            <>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                
                <select
                  value={selectedCampaign}
                  onChange={(e) => handleCampaignChange(e.target.value)}
                  className="bg-secondary text-sm text-foreground px-3 py-1.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Todas Campaigns</option>
                  {campaigns.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>

                <select
                  value={selectedQuest}
                  onChange={(e) => handleQuestChange(e.target.value)}
                  className="bg-secondary text-sm text-foreground px-3 py-1.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Todas Quests</option>
                  {filteredQuests.map((q) => (
                    <option key={q.id} value={q.id}>{q.name}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="bg-secondary text-sm text-foreground pl-9 pr-4 py-1.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 w-48"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-lg hover:bg-secondary transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
}
