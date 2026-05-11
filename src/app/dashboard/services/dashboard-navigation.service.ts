import { Injectable } from '@angular/core';
import { DashboardNavigationItem, DashboardNavigationSelection } from '../models/dashboard-navigation.model';

const ICONS = {
  dashboard: 'M4 13h6V5H4v8ZM14 19h6V5h-6v14ZM4 19h6v-3H4v3Z',
  management: 'M4 20V8l8-5 8 5v12M8 20v-8h8v8M10 16h4',
  profile: 'M8 5h8M10 5v3M14 5v3M6 8h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2ZM9.5 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 18a3.5 3.5 0 0 1 5 0M14.5 12h2.5M14.5 16h2.5',
  homes: 'M3 11 12 4l9 7M5.5 10v10h13V10M9 20v-5h6v5',
  document: 'M7 3.5h7l4 4V20a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5ZM14 3.5V8h4M9 12h6M9 16h4',
  finance: 'M6 3h12v18l-2-1.2-2 1.2-2-1.2-2 1.2-2-1.2L6 21V3ZM9 8h6M9 12h4M13.5 16l1.5 1.5 3-3',
  reports: 'M5 19V5M5 19h15M9 16v-5M13 16V8M17 16v-7',
  communication: 'M4 13h3l8 4V7l-8 4H4v2ZM7 13v5h2.5l1-3.5M17 10.5a3 3 0 0 1 0 3M19 8.5a6 6 0 0 1 0 7',
  calendar: 'M7 3v4M17 3v4M4.5 8h15M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2ZM8 12h3M8 16h5',
  security: 'M12 3 19 6v5c0 4.5-2.8 8.4-7 10-4.2-1.6-7-5.5-7-10V6l7-3ZM9 12l2 2 4-4',
  system: 'M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM4 12h2M18 12h2M12 4v2M12 18v2M6.6 6.6 8 8M16 16l1.4 1.4M17.4 6.6 16 8M8 16l-1.4 1.4',
  account: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4.5 20a7.5 7.5 0 0 1 15 0',
  logout: 'M9 5H5v14h4M14 8l4 4-4 4M18 12H9',
} as const;

const DASHBOARD_NAVIGATION_ITEMS: readonly DashboardNavigationItem[] = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: ICONS.dashboard,
  },
  {
    key: 'management',
    label: 'Management',
    icon: ICONS.management,
    children: [
      {
        key: 'hoa-profile',
        label: 'HOA Profile',
        icon: ICONS.profile,
        children: [
          { key: 'residents-list', label: 'Residents List', icon: ICONS.homes },
          { key: 'officers-list', label: 'Officers List', icon: ICONS.profile },
        ],
      },
      { key: 'house-records', label: 'House Records', icon: ICONS.homes },
      { key: 'document-records', label: 'Document & Records', icon: ICONS.document },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    icon: ICONS.finance,
    children: [
      {
        key: 'monthly-dues',
        label: 'Monthly Dues',
        icon: ICONS.finance,
        children: [
          { key: 'payment-records', label: 'Payment Records', icon: ICONS.finance },
          { key: 'billing', label: 'Billing', icon: ICONS.document },
          { key: 'unpaid-dues', label: 'Unpaid Dues', icon: ICONS.finance },
        ],
      },
      {
        key: 'financial-reports',
        label: 'Financial Reports',
        icon: ICONS.reports,
        children: [
          { key: 'collection-summary', label: 'Collection Summary', icon: ICONS.reports },
          { key: 'payment-history', label: 'Payment History', icon: ICONS.finance },
        ],
      },
    ],
  },
  {
    key: 'communication',
    label: 'Communication',
    icon: ICONS.communication,
    children: [
      {
        key: 'announcements',
        label: 'Announcements',
        icon: ICONS.communication,
        children: [
          { key: 'all-announcements', label: 'All Announcements', icon: ICONS.communication },
          { key: 'create-announcement', label: 'Create Announcement', icon: ICONS.communication },
          { key: 'archived-announcements', label: 'Archived Announcements', icon: ICONS.document },
        ],
      },
      {
        key: 'events-scheduling',
        label: 'Events/Scheduling',
        icon: ICONS.calendar,
        children: [
          { key: 'calendar', label: 'Calendar', icon: ICONS.calendar },
          { key: 'upcoming-events', label: 'Upcoming Events', icon: ICONS.calendar },
          { key: 'past-events', label: 'Past Events', icon: ICONS.calendar },
        ],
      },
    ],
  },
  {
    key: 'security',
    label: 'Security',
    icon: ICONS.security,
    children: [
      { key: 'visitor-logs', label: 'Visitor Logs', icon: ICONS.account },
      { key: 'incident-reports', label: 'Incident Reports', icon: ICONS.security },
    ],
  },
  {
    key: 'system',
    label: 'System',
    icon: ICONS.system,
    children: [
      { key: 'user-management', label: 'User Management', icon: ICONS.account },
      { key: 'audit-log', label: 'Audit Log', icon: ICONS.document },
      { key: 'settings', label: 'Settings', icon: ICONS.system },
    ],
  },
  {
    key: 'account',
    label: 'Account',
    icon: ICONS.account,
    children: [
      { key: 'profile', label: 'My Profile', icon: ICONS.account },
      { key: 'logout', label: 'Log out', icon: ICONS.logout, action: 'logout' },
    ],
  },
];

@Injectable({
  providedIn: 'root',
})
export class DashboardNavigationService {
  getMenuItems(): readonly DashboardNavigationItem[] {
    return DASHBOARD_NAVIGATION_ITEMS;
  }

  getSelection(key: string): DashboardNavigationSelection | null {
    const item = this.getItem(key);

    if (!item) {
      return null;
    }

    return {
      key: item.key,
      label: item.label,
      path: this.getLabelPath(key),
      children: item.children ?? [],
      action: item.action,
    };
  }

  getItem(key: string): DashboardNavigationItem | null {
    return this.findItem(DASHBOARD_NAVIGATION_ITEMS, key);
  }

  getKeyPath(key: string): readonly string[] {
    return this.findKeyPath(DASHBOARD_NAVIGATION_ITEMS, key) ?? [];
  }

  private getLabelPath(key: string): readonly string[] {
    return this.findLabelPath(DASHBOARD_NAVIGATION_ITEMS, key) ?? [];
  }

  private findItem(items: readonly DashboardNavigationItem[], key: string): DashboardNavigationItem | null {
    for (const item of items) {
      if (item.key === key) {
        return item;
      }

      if (item.children?.length) {
        const childItem = this.findItem(item.children, key);

        if (childItem) {
          return childItem;
        }
      }
    }

    return null;
  }

  private findKeyPath(
    items: readonly DashboardNavigationItem[],
    key: string,
    parentPath: readonly string[] = [],
  ): readonly string[] | null {
    for (const item of items) {
      const currentPath = [...parentPath, item.key];

      if (item.key === key) {
        return currentPath;
      }

      if (item.children?.length) {
        const childPath = this.findKeyPath(item.children, key, currentPath);

        if (childPath) {
          return childPath;
        }
      }
    }

    return null;
  }

  private findLabelPath(
    items: readonly DashboardNavigationItem[],
    key: string,
    parentPath: readonly string[] = [],
  ): readonly string[] | null {
    for (const item of items) {
      const currentPath = [...parentPath, item.label];

      if (item.key === key) {
        return currentPath;
      }

      if (item.children?.length) {
        const childPath = this.findLabelPath(item.children, key, currentPath);

        if (childPath) {
          return childPath;
        }
      }
    }

    return null;
  }
}
