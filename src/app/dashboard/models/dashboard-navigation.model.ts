export type DashboardNavigationAction = 'logout';

export interface DashboardNavigationItem {
  readonly key: string;
  readonly label: string;
  readonly icon: string;
  readonly action?: DashboardNavigationAction;
  readonly children?: readonly DashboardNavigationItem[];
}

export interface DashboardNavigationSelection {
  readonly key: string;
  readonly label: string;
  readonly path: readonly string[];
  readonly children: readonly DashboardNavigationItem[];
  readonly action?: DashboardNavigationAction;
}
