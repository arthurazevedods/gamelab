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
  { id: 'guild-1', name: 'Guardiões do Código', color: '#10b981', icon: '🛡️' },
  { id: 'guild-2', name: 'Artesãos Digitais', color: '#f59e0b', icon: '🎨' },
  { id: 'guild-3', name: 'Exploradores de UX', color: '#8b5cf6', icon: '🔍' },
];

// Class Roles
export const classRoles: ClassRole[] = [
  { id: 'class-1', name: 'Mago' },
  { id: 'class-2', name: 'Bardo' },
  { id: 'class-3', name: 'Clérigo' },
  { id: 'class-4', name: 'Guerreiro' },
  { id: 'class-5', name: 'Arqueiro' },
  { id: 'class-6', name: 'Paladino' },
];

// Users
export const users: User[] = [
  { id: 'user-1', name: 'Lucas Silva', role: 'ADMIN', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucas', guildId: 'guild-1', classes: [classRoles[0], classRoles[3]], xpTotal: 2850 },
  { id: 'user-2', name: 'Marina Costa', role: 'MENTOR', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marina', guildId: 'guild-1', classes: [classRoles[2]], xpTotal: 3200 },
  { id: 'user-3', name: 'Pedro Santos', role: 'MEMBRO', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro', guildId: 'guild-2', classes: [classRoles[1], classRoles[4]], xpTotal: 1540 },
  { id: 'user-4', name: 'Ana Oliveira', role: 'MEMBRO', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana', guildId: 'guild-2', classes: [classRoles[0]], xpTotal: 1820 },
  { id: 'user-5', name: 'Carlos Mendes', role: 'MEMBRO', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos', guildId: 'guild-3', classes: [classRoles[5]], xpTotal: 980 },
  { id: 'user-6', name: 'Julia Ferreira', role: 'MENTOR', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Julia', guildId: 'guild-3', classes: [classRoles[1], classRoles[2]], xpTotal: 2650 },
  { id: 'user-7', name: 'Rafael Almeida', role: 'MEMBRO', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rafael', guildId: 'guild-1', classes: [classRoles[3]], xpTotal: 1120 },
  { id: 'user-8', name: 'Beatriz Lima', role: 'MEMBRO', avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beatriz', guildId: 'guild-2', classes: [classRoles[4], classRoles[0]], xpTotal: 890 },
];

// Campaigns
export const campaigns: Campaign[] = [
  { id: 'camp-1', name: 'Sprint Game Jam', startDate: '2024-01-15', endDate: '2024-02-15', status: 'ACTIVE' },
  { id: 'camp-2', name: 'Site Guardiões', startDate: '2024-02-01', endDate: '2024-03-30', status: 'ACTIVE' },
];

// Quests
export const quests: Quest[] = [
  { id: 'quest-1', campaignId: 'camp-1', name: 'Protótipo Jogável', scope: 'GLOBAL', description: 'Criar um protótipo jogável com mecânica básica funcional' },
  { id: 'quest-2', campaignId: 'camp-1', name: 'Arte Conceitual', scope: 'GUILD', refId: 'guild-2', description: 'Desenvolver arte conceitual para personagens e cenários' },
  { id: 'quest-3', campaignId: 'camp-1', name: 'Sound Design', scope: 'CLASS', refId: 'class-2', description: 'Criar efeitos sonoros e música de fundo' },
  { id: 'quest-4', campaignId: 'camp-2', name: 'Landing Page', scope: 'GLOBAL', description: 'Desenvolver landing page do projeto Guardiões' },
  { id: 'quest-5', campaignId: 'camp-2', name: 'Sistema de Login', scope: 'GUILD', refId: 'guild-1', description: 'Implementar autenticação segura' },
];

// Boards
export const boards: Board[] = [
  { id: 'board-1', name: 'Quadro Geral', scope: 'GLOBAL' },
  { id: 'board-2', name: 'Guardiões do Código', scope: 'GUILD', refId: 'guild-1' },
  { id: 'board-3', name: 'Artesãos Digitais', scope: 'GUILD', refId: 'guild-2' },
  { id: 'board-4', name: 'Exploradores de UX', scope: 'GUILD', refId: 'guild-3' },
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
    id: 'task-1', title: 'Criar wireframes da tela inicial', description: 'Desenvolver wireframes low-fi para a tela inicial do jogo',
    boardId: 'board-1', columnId: 'col-1', campaignId: 'camp-1', questId: 'quest-1',
    kind: 'NORMAL', category: 'UI', priority: 'MEDIUM', dueDate: '2024-02-10',
    estimatedMinutes: 120, assignees: ['user-5'], xpValueDefault: 50,
    checklist: [
      { id: 'cl-1', text: 'Esboço inicial em papel', required: true, done: false },
      { id: 'cl-2', text: 'Digitalizar no Figma', required: true, done: false },
      { id: 'cl-3', text: 'Validar com equipe', required: false, done: false },
    ],
  },
  {
    id: 'task-2', title: 'Pesquisa de referências visuais', description: 'Compilar referências de jogos similares',
    boardId: 'board-1', columnId: 'col-1', campaignId: 'camp-1', questId: 'quest-2',
    kind: 'NORMAL', category: 'PESQUISA', priority: 'LOW', dueDate: '2024-02-08',
    estimatedMinutes: 90, assignees: ['user-3', 'user-4'], xpValueDefault: 30,
    checklist: [
      { id: 'cl-4', text: 'Coletar 20+ referências', required: true, done: false },
      { id: 'cl-5', text: 'Criar moodboard', required: true, done: false },
    ],
  },
  {
    id: 'task-3', title: 'Implementar sistema de inventário', description: 'Criar lógica de inventário com slots e drag-drop',
    boardId: 'board-1', columnId: 'col-1', campaignId: 'camp-1', questId: 'quest-1',
    kind: 'NORMAL', category: 'CODIGO', priority: 'HIGH', dueDate: '2024-02-12',
    estimatedMinutes: 300, assignees: ['user-1', 'user-7'], xpValueDefault: 100,
    checklist: [
      { id: 'cl-6', text: 'Estrutura de dados', required: true, done: false },
      { id: 'cl-7', text: 'UI de slots', required: true, done: false },
      { id: 'cl-8', text: 'Drag and drop', required: true, done: false },
      { id: 'cl-9', text: 'Persistência local', required: false, done: false },
    ],
  },
  // Em andamento
  {
    id: 'task-4', title: 'Sprites do personagem principal', description: 'Criar sprite sheet com animações básicas',
    boardId: 'board-1', columnId: 'col-2', campaignId: 'camp-1', questId: 'quest-2',
    kind: 'NORMAL', category: 'ARTE', priority: 'HIGH', dueDate: '2024-02-05',
    estimatedMinutes: 480, assignees: ['user-3'], xpValueDefault: 150,
    checklist: [
      { id: 'cl-10', text: 'Idle animation (8 frames)', required: true, done: true },
      { id: 'cl-11', text: 'Walk animation (12 frames)', required: true, done: true },
      { id: 'cl-12', text: 'Jump animation (6 frames)', required: true, done: false },
      { id: 'cl-13', text: 'Attack animation (10 frames)', required: true, done: false },
    ],
  },
  {
    id: 'task-5', title: 'Configurar projeto React', description: 'Setup inicial do projeto Site Guardiões',
    boardId: 'board-1', columnId: 'col-2', campaignId: 'camp-2', questId: 'quest-4',
    kind: 'NORMAL', category: 'CODIGO', priority: 'MEDIUM', dueDate: '2024-02-06',
    estimatedMinutes: 60, assignees: ['user-1'], xpValueDefault: 40,
    checklist: [
      { id: 'cl-14', text: 'Inicializar Vite + React', required: true, done: true },
      { id: 'cl-15', text: 'Configurar Tailwind', required: true, done: true },
      { id: 'cl-16', text: 'Estruturar pastas', required: true, done: false },
    ],
  },
  // Em revisão
  {
    id: 'task-6', title: 'Design da logo', description: 'Criar logo vetorial para o projeto',
    boardId: 'board-1', columnId: 'col-3', campaignId: 'camp-2', questId: 'quest-4',
    kind: 'NORMAL', category: 'ARTE', priority: 'MEDIUM', dueDate: '2024-02-03',
    estimatedMinutes: 180, assignees: ['user-4'], xpValueDefault: 80,
    checklist: [
      { id: 'cl-17', text: '3 propostas iniciais', required: true, done: true },
      { id: 'cl-18', text: 'Refinar escolhida', required: true, done: true },
      { id: 'cl-19', text: 'Exportar em SVG e PNG', required: true, done: true },
    ],
  },
  {
    id: 'task-7', title: 'Documento de Game Design', description: 'Escrever GDD completo do protótipo',
    boardId: 'board-1', columnId: 'col-3', campaignId: 'camp-1', questId: 'quest-1',
    kind: 'NORMAL', category: 'PESQUISA', priority: 'HIGH', dueDate: '2024-02-02',
    estimatedMinutes: 240, assignees: ['user-2', 'user-6'], xpValueDefault: 120,
    checklist: [
      { id: 'cl-20', text: 'Conceito e narrativa', required: true, done: true },
      { id: 'cl-21', text: 'Mecânicas principais', required: true, done: true },
      { id: 'cl-22', text: 'Fluxo de jogo', required: true, done: true },
      { id: 'cl-23', text: 'Referências e assets', required: false, done: true },
    ],
  },
  // Concluído
  {
    id: 'task-8', title: 'Setup do repositório', description: 'Configurar GitHub com branch protection',
    boardId: 'board-1', columnId: 'col-4', campaignId: 'camp-1', questId: 'quest-1',
    kind: 'NORMAL', category: 'CODIGO', priority: 'HIGH', dueDate: '2024-01-20',
    estimatedMinutes: 30, assignees: ['user-1'], xpValueDefault: 20, xpAwarded: 20,
    checklist: [
      { id: 'cl-24', text: 'Criar repositório', required: true, done: true },
      { id: 'cl-25', text: 'Configurar .gitignore', required: true, done: true },
      { id: 'cl-26', text: 'Branch protection', required: true, done: true },
    ],
  },
  // Weekly Missions
  {
    id: 'task-9', title: 'Standup semanal', description: 'Participar do standup e atualizar status',
    boardId: 'board-1', columnId: 'col-1', kind: 'WEEKLY_MISSION', category: 'GERAL',
    priority: 'MEDIUM', dueDate: '2024-02-09', estimatedMinutes: 15,
    assignees: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6', 'user-7', 'user-8'],
    xpValueDefault: 10,
    checklist: [{ id: 'cl-27', text: 'Comparecer ao standup', required: true, done: false }],
  },
  {
    id: 'task-10', title: 'Code Review', description: 'Revisar pelo menos 2 PRs da semana',
    boardId: 'board-1', columnId: 'col-2', kind: 'WEEKLY_MISSION', category: 'CODIGO',
    priority: 'MEDIUM', dueDate: '2024-02-09', estimatedMinutes: 60,
    assignees: ['user-1', 'user-2', 'user-7'],
    xpValueDefault: 25,
    checklist: [
      { id: 'cl-28', text: 'Revisar PR #1', required: true, done: true },
      { id: 'cl-29', text: 'Revisar PR #2', required: true, done: false },
    ],
  },
  // More tasks
  {
    id: 'task-11', title: 'Paleta de cores do jogo', description: 'Definir paleta principal e secundária',
    boardId: 'board-1', columnId: 'col-4', campaignId: 'camp-1', questId: 'quest-2',
    kind: 'NORMAL', category: 'ARTE', priority: 'LOW', dueDate: '2024-01-25',
    estimatedMinutes: 60, assignees: ['user-4'], xpValueDefault: 35, xpAwarded: 35,
    checklist: [
      { id: 'cl-30', text: 'Pesquisa de tendências', required: false, done: true },
      { id: 'cl-31', text: 'Criar paleta no Coolors', required: true, done: true },
    ],
  },
  {
    id: 'task-12', title: 'Protótipo de áudio', description: 'Gravar samples de SFX',
    boardId: 'board-1', columnId: 'col-2', campaignId: 'camp-1', questId: 'quest-3',
    kind: 'NORMAL', category: 'ARTE', priority: 'MEDIUM', dueDate: '2024-02-15',
    estimatedMinutes: 180, assignees: ['user-6'], xpValueDefault: 75,
    checklist: [
      { id: 'cl-32', text: 'SFX de pulo', required: true, done: true },
      { id: 'cl-33', text: 'SFX de coleta', required: true, done: false },
      { id: 'cl-34', text: 'SFX de dano', required: true, done: false },
    ],
  },
  {
    id: 'task-13', title: 'Testes de usabilidade', description: 'Conduzir testes com 5 usuários',
    boardId: 'board-1', columnId: 'col-1', campaignId: 'camp-2', questId: 'quest-4',
    kind: 'NORMAL', category: 'PESQUISA', priority: 'HIGH', dueDate: '2024-02-20',
    estimatedMinutes: 300, assignees: ['user-5', 'user-6'], xpValueDefault: 100,
    checklist: [
      { id: 'cl-35', text: 'Preparar roteiro', required: true, done: false },
      { id: 'cl-36', text: 'Recrutar participantes', required: true, done: false },
      { id: 'cl-37', text: 'Conduzir sessões', required: true, done: false },
      { id: 'cl-38', text: 'Compilar resultados', required: true, done: false },
    ],
  },
  {
    id: 'task-14', title: 'Componente de Header', description: 'Criar header responsivo',
    boardId: 'board-1', columnId: 'col-3', campaignId: 'camp-2', questId: 'quest-4',
    kind: 'NORMAL', category: 'UI', priority: 'MEDIUM', dueDate: '2024-02-08',
    estimatedMinutes: 90, assignees: ['user-7'], xpValueDefault: 45,
    checklist: [
      { id: 'cl-39', text: 'Desktop version', required: true, done: true },
      { id: 'cl-40', text: 'Mobile hamburger', required: true, done: true },
      { id: 'cl-41', text: 'Animações', required: false, done: true },
    ],
  },
  {
    id: 'task-15', title: 'API de autenticação', description: 'Integrar Firebase Auth',
    boardId: 'board-1', columnId: 'col-1', campaignId: 'camp-2', questId: 'quest-5',
    kind: 'NORMAL', category: 'CODIGO', priority: 'HIGH', dueDate: '2024-02-18',
    estimatedMinutes: 240, assignees: ['user-1', 'user-2'], xpValueDefault: 120,
    checklist: [
      { id: 'cl-42', text: 'Setup Firebase', required: true, done: false },
      { id: 'cl-43', text: 'Login com email', required: true, done: false },
      { id: 'cl-44', text: 'Login social', required: false, done: false },
      { id: 'cl-45', text: 'Proteção de rotas', required: true, done: false },
    ],
  },
  // More weekly missions
  {
    id: 'task-16', title: 'Documentar progresso', description: 'Atualizar wiki do projeto',
    boardId: 'board-1', columnId: 'col-1', kind: 'WEEKLY_MISSION', category: 'GERAL',
    priority: 'LOW', dueDate: '2024-02-09', estimatedMinutes: 30,
    assignees: ['user-2', 'user-6'], xpValueDefault: 15,
    checklist: [{ id: 'cl-46', text: 'Atualizar seção de progresso', required: true, done: false }],
  },
  {
    id: 'task-17', title: 'Feedback de arte', description: 'Dar feedback em 3 assets',
    boardId: 'board-1', columnId: 'col-2', kind: 'WEEKLY_MISSION', category: 'ARTE',
    priority: 'MEDIUM', dueDate: '2024-02-09', estimatedMinutes: 45,
    assignees: ['user-3', 'user-4', 'user-8'], xpValueDefault: 20,
    checklist: [
      { id: 'cl-47', text: 'Asset 1', required: true, done: true },
      { id: 'cl-48', text: 'Asset 2', required: true, done: false },
      { id: 'cl-49', text: 'Asset 3', required: true, done: false },
    ],
  },
  {
    id: 'task-18', title: 'Pair programming', description: 'Sessão de pair com colega',
    boardId: 'board-1', columnId: 'col-4', kind: 'WEEKLY_MISSION', category: 'CODIGO',
    priority: 'LOW', dueDate: '2024-02-02', estimatedMinutes: 60,
    assignees: ['user-1', 'user-7'], xpValueDefault: 30, xpAwarded: 30,
    checklist: [{ id: 'cl-50', text: 'Completar sessão de 1h', required: true, done: true }],
  },
  // Additional tasks
  {
    id: 'task-19', title: 'Tileset do cenário', description: 'Criar tileset para fase 1',
    boardId: 'board-1', columnId: 'col-2', campaignId: 'camp-1', questId: 'quest-2',
    kind: 'NORMAL', category: 'ARTE', priority: 'HIGH', dueDate: '2024-02-10',
    estimatedMinutes: 360, assignees: ['user-8'], xpValueDefault: 130,
    checklist: [
      { id: 'cl-51', text: 'Tiles de chão', required: true, done: true },
      { id: 'cl-52', text: 'Tiles de parede', required: true, done: false },
      { id: 'cl-53', text: 'Objetos decorativos', required: false, done: false },
    ],
  },
  {
    id: 'task-20', title: 'Sistema de colisão', description: 'Implementar física básica',
    boardId: 'board-1', columnId: 'col-1', campaignId: 'camp-1', questId: 'quest-1',
    kind: 'NORMAL', category: 'CODIGO', priority: 'HIGH', dueDate: '2024-02-14',
    estimatedMinutes: 240, assignees: ['user-7'], xpValueDefault: 90,
    checklist: [
      { id: 'cl-54', text: 'Collision detection', required: true, done: false },
      { id: 'cl-55', text: 'Gravity', required: true, done: false },
      { id: 'cl-56', text: 'Platforming', required: true, done: false },
    ],
  },
  {
    id: 'task-21', title: 'Footer do site', description: 'Criar footer com links e social',
    boardId: 'board-1', columnId: 'col-1', campaignId: 'camp-2', questId: 'quest-4',
    kind: 'NORMAL', category: 'UI', priority: 'LOW', dueDate: '2024-02-12',
    estimatedMinutes: 60, assignees: ['user-5'], xpValueDefault: 25,
    checklist: [
      { id: 'cl-57', text: 'Layout responsivo', required: true, done: false },
      { id: 'cl-58', text: 'Links funcionais', required: true, done: false },
    ],
  },
  {
    id: 'task-22', title: 'Análise de competidores', description: 'Estudar 5 jogos similares',
    boardId: 'board-1', columnId: 'col-4', campaignId: 'camp-1', questId: 'quest-1',
    kind: 'NORMAL', category: 'PESQUISA', priority: 'MEDIUM', dueDate: '2024-01-28',
    estimatedMinutes: 180, assignees: ['user-6'], xpValueDefault: 60, xpAwarded: 60,
    checklist: [
      { id: 'cl-59', text: 'Jogo 1', required: true, done: true },
      { id: 'cl-60', text: 'Jogo 2', required: true, done: true },
      { id: 'cl-61', text: 'Jogo 3', required: true, done: true },
      { id: 'cl-62', text: 'Relatório final', required: true, done: true },
    ],
  },
  {
    id: 'task-23', title: 'Mentoria semanal', description: 'Conduzir sessão de mentoria',
    boardId: 'board-1', columnId: 'col-2', kind: 'WEEKLY_MISSION', category: 'GERAL',
    priority: 'HIGH', dueDate: '2024-02-09', estimatedMinutes: 60,
    assignees: ['user-2', 'user-6'], xpValueDefault: 40,
    checklist: [
      { id: 'cl-63', text: 'Preparar pauta', required: true, done: true },
      { id: 'cl-64', text: 'Conduzir sessão', required: true, done: false },
    ],
  },
  {
    id: 'task-24', title: 'UI Kit base', description: 'Criar componentes base no Figma',
    boardId: 'board-1', columnId: 'col-3', campaignId: 'camp-2', questId: 'quest-4',
    kind: 'NORMAL', category: 'UI', priority: 'HIGH', dueDate: '2024-02-05',
    estimatedMinutes: 240, assignees: ['user-5'], xpValueDefault: 100,
    checklist: [
      { id: 'cl-65', text: 'Botões', required: true, done: true },
      { id: 'cl-66', text: 'Inputs', required: true, done: true },
      { id: 'cl-67', text: 'Cards', required: true, done: true },
      { id: 'cl-68', text: 'Modais', required: true, done: true },
    ],
  },
  {
    id: 'task-25', title: 'Daily sketch', description: 'Praticar desenho diário',
    boardId: 'board-1', columnId: 'col-4', kind: 'WEEKLY_MISSION', category: 'ARTE',
    priority: 'LOW', dueDate: '2024-02-02', estimatedMinutes: 30,
    assignees: ['user-3', 'user-4', 'user-8'], xpValueDefault: 15, xpAwarded: 15,
    checklist: [{ id: 'cl-69', text: 'Postar sketch no canal', required: true, done: true }],
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
