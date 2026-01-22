// User roles
export type UserRole = 'ADMIN' | 'MENTOR' | 'MEMBRO';

// Status types
export type CampaignStatus = 'PLANNED' | 'ACTIVE' | 'CLOSED';
export type Scope = 'GLOBAL' | 'GUILD' | 'CLASS';
export type TaskKind = 'NORMAL' | 'WEEKLY_MISSION';
export type TaskCategory = 'UI' | 'CODIGO' | 'ARTE' | 'PESQUISA' | 'GERAL';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';
export type CalendarEventType = 'DEADLINE' | 'MEETING' | 'MILESTONE';
export type RubricCriterionName = 'Clareza' | 'Entrega' | 'Colaboração' | 'Qualidade';

// User
export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  guildId?: string;
  classes?: ClassRole[];
  xpTotal: number;
}

// Guild
export interface Guild {
  id: string;
  name: string;
  color: string;
  icon?: string;
}

// Class Role (RPG classes)
export interface ClassRole {
  id: string;
  name: string;
}

// Campaign
export interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: CampaignStatus;
}

// Quest
export interface Quest {
  id: string;
  campaignId: string;
  name: string;
  scope: Scope;
  refId?: string;
  description: string;
}

// Board
export interface Board {
  id: string;
  name: string;
  scope: Scope;
  refId?: string;
}

// Column
export interface Column {
  id: string;
  boardId: string;
  name: string;
  order: number;
}

// Checklist Item
export interface ChecklistItem {
  id: string;
  text: string;
  required: boolean;
  done?: boolean;
}

// Task
export interface Task {
  id: string;
  title: string;
  description: string;
  boardId: string;
  columnId: string;
  campaignId?: string;
  questId?: string;
  kind: TaskKind;
  category: TaskCategory;
  priority: Priority;
  dueDate?: string;
  estimatedMinutes?: number;
  assignees: string[];
  watchers?: string[];
  xpValueDefault: number;
  xpAwarded?: number;
  badgesSuggested?: string[];
  checklist: ChecklistItem[];
  statusLabel?: string;
}

// Submission
export interface Submission {
  id: string;
  taskId: string;
  userId: string;
  text: string;
  links?: string[];
  createdAt: string;
}

// Rubric Criterion
export interface RubricCriterion {
  id: string;
  name: RubricCriterionName;
  maxScore: number;
  weight: number;
}

// Rubric
export interface Rubric {
  id: string;
  name: string;
  criteria: RubricCriterion[];
}

// Review
export interface Review {
  id: string;
  submissionId: string;
  reviewerId: string;
  rubricId: string;
  scores: Record<string, number>;
  finalScore: number;
  feedback: string;
  xpAwarded: number;
}

// Badge
export interface Badge {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

// XP Transaction
export interface XPTransaction {
  id: string;
  userId: string;
  amount: number;
  sourceType: string;
  createdAt: string;
  note?: string;
}

// Calendar Event
export interface CalendarEvent {
  id: string;
  title: string;
  startAt: string;
  endAt: string;
  type: CalendarEventType;
  campaignId?: string;
  questId?: string;
  scope: Scope;
  refId?: string;
}

// Task Template
export interface TaskTemplate {
  id: string;
  name: string;
  category: TaskCategory;
  description: string;
  checklist: Omit<ChecklistItem, 'id' | 'done'>[];
  estimatedMinutes: number;
  xpValueDefault: number;
}
