import { NavLink } from '@/components/NavLink';
import {
  LayoutDashboard,
  Columns3,
  Users,
  Swords,
  Shield,
  ScrollText,
  ClipboardCheck,
  Calendar,
  Sparkles,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/boards', label: 'Quadro', icon: Columns3 },
  { to: '/guilds', label: 'Guildas', icon: Shield },
  { to: '/classes', label: 'Classes', icon: Swords },
  { to: '/members', label: 'Membros', icon: Users },
  { to: '/quests', label: 'Quests', icon: ScrollText },
  { to: '/reviews', label: 'Revisões', icon: ClipboardCheck },
  { to: '/calendar', label: 'Calendário', icon: Calendar },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'h-screen sticky top-0 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center glow-gold">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          {!collapsed && (
            <div className="animate-fade-in">
              <h1 className="font-bold text-foreground text-lg leading-tight">Game Lab</h1>
              <p className="text-xs text-muted-foreground">Task Manager</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all duration-200 group',
              collapsed && 'justify-center px-2'
            )}
            activeClassName="bg-sidebar-accent text-primary glow-gold"
          >
            <item.icon className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform" />
            {!collapsed && (
              <span className="font-medium text-sm animate-fade-in">{item.label}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-sidebar-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-all"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Recolher</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}
