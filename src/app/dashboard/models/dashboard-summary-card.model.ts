export interface DashboardSummaryCardTarget {
  readonly key: string;
  readonly label: string;
  readonly path: readonly string[];
}

export interface DashboardSummaryCard {
  readonly id: string;
  readonly label: string;
  readonly value: number;
  readonly icon: string;
  readonly accentColor: string;
  readonly iconBackground: string;
  readonly decorativeBackground: string;
  readonly target: DashboardSummaryCardTarget;
}
