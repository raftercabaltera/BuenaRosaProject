import { DashboardSummaryCardTarget } from './dashboard-summary-card.model';

export interface DashboardAttentionItem {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly icon: string;
  readonly accentColor: string;
  readonly iconBackground: string;
  readonly target: DashboardSummaryCardTarget;
}

export interface DashboardQuickAction {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly accentColor: string;
  readonly iconBackground: string;
  readonly target: DashboardSummaryCardTarget;
}

export interface DashboardScheduleItem {
  readonly id: string;
  readonly label: string;
}

export interface DashboardDuesSnapshotMetric {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly icon: string;
  readonly accentColor: string;
  readonly iconBackground: string;
}

export interface DashboardDuesSnapshot {
  readonly metrics: readonly DashboardDuesSnapshotMetric[];
  readonly collectionProgress: number;
}

export interface DashboardActivityItem {
  readonly id: string;
  readonly label: string;
}

export interface DashboardOverview {
  readonly needsAttention: readonly DashboardAttentionItem[];
  readonly quickActions: readonly DashboardQuickAction[];
  readonly upcomingSchedule: readonly DashboardScheduleItem[];
  readonly viewEventsTarget: DashboardSummaryCardTarget;
  readonly monthlyDuesSnapshot: DashboardDuesSnapshot;
  readonly recentActivity: readonly DashboardActivityItem[];
}
