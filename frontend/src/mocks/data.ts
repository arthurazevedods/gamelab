import type {
  User,
  Guild,
  ClassRole,
  Campaign,
  Quest,
  Board,
  Column,
  Task,
  Submission,
  Rubric,
  Review,
  Badge,
  XPTransaction,
  CalendarEvent,
  TaskTemplate,
} from '@/lib/types';

// Guilds
export const guilds: Guild[] = [
  { id: 'guild-0', name: 'Superintendência', color: '#10b981', icon: '🛡️' },
  { id: 'guild-1', name: 'SLZ Aberta', color: '#10b981', icon: '🛡️' },
  { id: 'guild-2', name: 'Digitação', color: '#f59e0b', icon: '🎨' },
];

// Class Roles
export const classRoles: ClassRole[] = [
  { id: 'class-1', name: 'Mago' },
  { id: 'class-2', name: 'Bardo' },
  { id: 'class-3', name: 'Clérigo' },
  { id: 'class-4', name: 'Alquimista' },
  { id: 'class-5', name: 'Ferreiro' },
  { id: 'class-6', name: 'Artifíce' },
  { id: 'class-7', name: 'Arauto' },
];

// Users
export const users: User[] = [
  { id: 'user-1', name: 'Arthur Silva', role: 'ADMIN', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas', guildId: 'guild-0', classes: [classRoles[0], classRoles[3]], xpTotal: 2850 },
  { id: 'user-2', name: 'Victor Hugo', role: 'MENTOR', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marina', guildId: 'guild-0', classes: [classRoles[2], classRoles[6]], xpTotal: 3200 },
  { id: 'user-3', name: 'Daniel Mafra', role: 'MEMBRO', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro', guildId: 'guild-1', classes: [classRoles[1], classRoles[4]], xpTotal: 1540 },
  { id: 'user-4', name: 'Alexsander', role: 'MEMBRO', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', guildId: 'guild-1', classes: [classRoles[0]], xpTotal: 1820 },
  { id: 'user-5', name: 'Yasmin', role: 'MEMBRO', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', guildId: 'guild-1', classes: [classRoles[5]], xpTotal: 980 },
  { id: 'user-6', name: 'Eduane', role: 'MENTOR', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia', guildId: 'guild-2', classes: [classRoles[1], classRoles[2]], xpTotal: 2650 },
  { id: 'user-7', name: 'Malu', role: 'MEMBRO', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael', guildId: 'guild-2', classes: [classRoles[3]], xpTotal: 1120 },
  { id: 'user-8', name: 'Sofia', role: 'MEMBRO', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz', guildId: 'guild-2', classes: [classRoles[4], classRoles[0]], xpTotal: 890 },
];

// Campaigns
export const campaigns: Campaign[] = [
  { id: 'camp-1', name: 'Pokedex', startDate: '2025-12-15', endDate: '2026-02-15', status: 'ACTIVE' },
  { id: 'camp-2', name: 'Febrace', startDate: '2025-10-10', endDate: '2026-03-10', status: 'ACTIVE' },
];

// Quests
export const quests: Quest[] = [
  { id: 'quest-1', campaignId: 'camp-1', name: 'Pokedex', scope: 'GLOBAL', description: 'Criar uma pokedex com informações sobre os pokemons e consumo de API' },
  { id: 'quest-2', campaignId: 'camp-2', name: 'Baixar e Instalar Projeto', scope: 'GUILD', refId: 'guild-2', description: 'Baixar e instalar o projeto SLZ Aberta (clonar do Github_' },
  
];

// Boards
export const boards: Board[] = [
  { id: 'board-1', name: 'Quadro Geral', scope: 'GLOBAL' },
  { id: 'board-2', name: 'SLZ Aberta', scope: 'GUILD', refId: 'guild-1' },
  { id: 'board-3', name: 'Digitação', scope: 'GUILD', refId: 'guild-2' },
  
];

// Columns
export const columns: Column[] = [
  { id: 'col-1', boardId: 'board-1', name: 'Backlog', order: 0 },
  { id: 'col-2', boardId: 'board-1', name: 'Em andamento', order: 1 },
  { id: 'col-3', boardId: 'board-1', name: 'Em revisão', order: 2 },
  { id: 'col-4', boardId: 'board-1', name: 'Concluído', order: 3 },
];

// Tasks
export const tasks: Task[] = [
  // Backlog
  {
    id: 'task-1', title: 'Pokedex', description: 'Desenvolver uma Pokedex com informações sobre os pokemons e consumo de API',
    boardId: 'board-1', columnId: 'col-1', campaignId: 'camp-1', questId: 'quest-1',
    kind: 'NORMAL', category: 'UI', priority: 'LOW', dueDate: '2024-02-10',
    estimatedMinutes: 120, assignees: ['user-5'], xpValueDefault: 50,
    checklist: [
      { id: 'cl-1', text: 'Achar um vídeo no Youtube sobre a Pokedex', required: true, done: false },
      { id: 'cl-2', text: 'Entender a estrutura da Pokedex', required: true, done: false },
      { id: 'cl-3', text: 'Entender a estrutura da API', required: false, done: false },
      { id: 'cl-4', text: 'Criar o projeto', required: true, done: false },
      { id: 'cl-5', text: 'Desenvolver em HTML, CSS e JavaScript', required: true, done: false },
      { id: 'cl-6', text: 'Colocar no Github', required: true, done: false },
      { id: 'cl-7', text: 'Fazer Deploy no Vercel ou Github Pages', required: true, done: false }
    ],
  },
  {
    id: 'task-2', title: 'Baixar e Instalar Projeto', description: 'Baixar e instalar o projeto SLZ Aberta (clonar do Github)',
    boardId: 'board-1', columnId: 'col-1', campaignId: 'camp-1', questId: 'quest-2',
    kind: 'NORMAL', category: 'CODIGO', priority: 'MEDIUM', dueDate: '2024-02-08',
    estimatedMinutes: 90, assignees: ['user-3', 'user-4'], xpValueDefault: 30,
    checklist: [
      { id: 'cl-4', text: 'Clonar o repositório do Github', required: true, done: false },
      { id: 'cl-5', text: 'Fazer o build do projeto', required: true, done: false },
    ],
  },
];

// Submissions (for tasks in review)
export const submissions: Submission[] = [
  { id: 'sub-1', taskId: 'task-6', userId: 'user-4', text: 'Logo finalizada! Segue o arquivo em SVG e PNG.', links: ['https://figma.com/file/logo-guardioes'], createdAt: '2024-02-03T14:30:00Z' },
  { id: 'sub-2', taskId: 'task-7', userId: 'user-2', text: 'GDD completo com 15 páginas. Pronto para revisão.', links: ['https://docs.google.com/document/gdd'], createdAt: '2024-02-02T18:00:00Z' },
  { id: 'sub-3', taskId: 'task-14', userId: 'user-7', text: 'Header responsivo implementado com animações suaves.', links: ['https://github.com/guardioes/pr/42'], createdAt: '2024-02-08T10:15:00Z' },
  { id: 'sub-4', taskId: 'task-24', userId: 'user-5', text: 'UI Kit base com todos os componentes solicitados.', links: ['https://figma.com/file/ui-kit-guardioes'], createdAt: '2024-02-05T16:45:00Z' },
];

// Rubrics
export const rubrics: Rubric[] = [
  {
    id: 'rubric-1',
    name: 'Rubrica Padrão',
    criteria: [
      { id: 'crit-1', name: 'Clareza', maxScore: 10, weight: 0.25 },
      { id: 'crit-2', name: 'Entrega', maxScore: 10, weight: 0.30 },
      { id: 'crit-3', name: 'Colaboração', maxScore: 10, weight: 0.20 },
      { id: 'crit-4', name: 'Qualidade', maxScore: 10, weight: 0.25 },
    ],
  },
];

// Reviews (example completed reviews)
export const reviews: Review[] = [
  {
    id: 'review-1', submissionId: 'sub-existing', reviewerId: 'user-2', rubricId: 'rubric-1',
    scores: { 'crit-1': 9, 'crit-2': 10, 'crit-3': 8, 'crit-4': 9 },
    finalScore: 9.1, feedback: 'Excelente trabalho! Código limpo e bem documentado.', xpAwarded: 100,
  },
];

// Badges
export const badges: Badge[] = [
  { id: 'badge-1', name: 'Primeiro Commit', category: 'Código', icon: '🚀' },
  { id: 'badge-2', name: 'Artista Digital', category: 'Arte', icon: '🎨' },
  { id: 'badge-3', name: 'Pesquisador', category: 'Pesquisa', icon: '🔍' },
  { id: 'badge-4', name: 'Mentor do Mês', category: 'Colaboração', icon: '⭐' },
  { id: 'badge-5', name: 'Streak de 7 dias', category: 'Consistência', icon: '🔥' },
  { id: 'badge-6', name: 'Revisão Perfeita', category: 'Qualidade', icon: '💎' },
  { id: 'badge-7', name: 'Trabalho em Equipe', category: 'Colaboração', icon: '🤝' },
  { id: 'badge-8', name: 'Early Bird', category: 'Pontualidade', icon: '🌅' },
];

// XP Transactions
export const xpTransactions: XPTransaction[] = [
  { id: 'xp-1', userId: 'user-1', amount: 100, sourceType: 'task', createdAt: '2024-01-20T12:00:00Z', note: 'Setup do repositório' },
  { id: 'xp-2', userId: 'user-1', amount: 30, sourceType: 'weekly', createdAt: '2024-02-02T12:00:00Z', note: 'Pair programming' },
  { id: 'xp-3', userId: 'user-2', amount: 120, sourceType: 'task', createdAt: '2024-02-02T18:00:00Z', note: 'Documento de Game Design' },
  { id: 'xp-4', userId: 'user-3', amount: 150, sourceType: 'task', createdAt: '2024-02-05T10:00:00Z', note: 'Sprites do personagem' },
  { id: 'xp-5', userId: 'user-4', amount: 35, sourceType: 'task', createdAt: '2024-01-25T14:00:00Z', note: 'Paleta de cores' },
  { id: 'xp-6', userId: 'user-4', amount: 80, sourceType: 'task', createdAt: '2024-02-03T14:30:00Z', note: 'Design da logo' },
  { id: 'xp-7', userId: 'user-5', amount: 100, sourceType: 'task', createdAt: '2024-02-05T16:45:00Z', note: 'UI Kit base' },
  { id: 'xp-8', userId: 'user-6', amount: 60, sourceType: 'task', createdAt: '2024-01-28T16:00:00Z', note: 'Análise de competidores' },
  { id: 'xp-9', userId: 'user-7', amount: 45, sourceType: 'task', createdAt: '2024-02-08T10:15:00Z', note: 'Componente de Header' },
  { id: 'xp-10', userId: 'user-8', amount: 15, sourceType: 'weekly', createdAt: '2024-02-02T09:00:00Z', note: 'Daily sketch' },
  { id: 'xp-11', userId: 'user-1', amount: 25, sourceType: 'weekly', createdAt: '2024-02-05T11:00:00Z', note: 'Code Review' },
  { id: 'xp-12', userId: 'user-2', amount: 40, sourceType: 'weekly', createdAt: '2024-02-07T15:00:00Z', note: 'Mentoria semanal' },
];

// Calendar Events
export const calendarEvents: CalendarEvent[] = [
  { id: 'evt-1', title: 'Kickoff Sprint Game Jam', startAt: '2024-01-15T10:00:00Z', endAt: '2024-01-15T11:00:00Z', type: 'MILESTONE', campaignId: 'camp-1', scope: 'GLOBAL' },
  { id: 'evt-2', title: 'Reunião de Arte', startAt: '2024-02-06T14:00:00Z', endAt: '2024-02-06T15:00:00Z', type: 'MEETING', scope: 'GUILD', refId: 'guild-2' },
  { id: 'evt-3', title: 'Demo Day', startAt: '2024-02-15T18:00:00Z', endAt: '2024-02-15T20:00:00Z', type: 'MILESTONE', campaignId: 'camp-1', scope: 'GLOBAL' },
  { id: 'evt-4', title: 'Review Sprint', startAt: '2024-02-09T10:00:00Z', endAt: '2024-02-09T11:30:00Z', type: 'MEETING', scope: 'GLOBAL' },
  { id: 'evt-5', title: 'Deadline Landing Page', startAt: '2024-02-28T23:59:00Z', endAt: '2024-02-28T23:59:00Z', type: 'DEADLINE', campaignId: 'camp-2', questId: 'quest-4', scope: 'GLOBAL' },
];

// Task Templates
export const taskTemplates: TaskTemplate[] = [
  {
    id: 'tpl-1', name: 'Pesquisa de Referências', category: 'PESQUISA',
    description: 'Template para pesquisa e compilação de referências visuais ou técnicas.',
    checklist: [
      { text: 'Definir escopo da pesquisa', required: true },
      { text: 'Coletar referências (mínimo 10)', required: true },
      { text: 'Organizar em moodboard/documento', required: true },
      { text: 'Apresentar para equipe', required: false },
    ],
    estimatedMinutes: 120, xpValueDefault: 40,
  },
  {
    id: 'tpl-2', name: 'Implementação de Feature', category: 'CODIGO',
    description: 'Template para desenvolvimento de nova funcionalidade.',
    checklist: [
      { text: 'Planejar arquitetura', required: true },
      { text: 'Implementar lógica core', required: true },
      { text: 'Escrever testes', required: true },
      { text: 'Code review', required: true },
      { text: 'Documentar', required: false },
    ],
    estimatedMinutes: 240, xpValueDefault: 80,
  },
  {
    id: 'tpl-3', name: 'Criação de Arte', category: 'ARTE',
    description: 'Template para criação de assets visuais.',
    checklist: [
      { text: 'Sketch inicial', required: true },
      { text: 'Aprovação do sketch', required: true },
      { text: 'Arte finalizada', required: true },
      { text: 'Exportar nos formatos necessários', required: true },
    ],
    estimatedMinutes: 180, xpValueDefault: 60,
  },
];

// User badges (mapping user to their earned badges)
export const userBadges: Record<string, string[]> = {
  'user-1': ['badge-1', 'badge-5', 'badge-7'],
  'user-2': ['badge-4', 'badge-6'],
  'user-3': ['badge-2', 'badge-5'],
  'user-4': ['badge-2'],
  'user-5': ['badge-3'],
  'user-6': ['badge-3', 'badge-4', 'badge-7'],
  'user-7': ['badge-1', 'badge-8'],
  'user-8': ['badge-2'],
};
