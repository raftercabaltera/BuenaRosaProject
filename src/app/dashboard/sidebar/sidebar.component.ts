import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, MockUserProfile } from '../../auth/auth.service';

export interface SidebarSelection {
  key: string;
  label: string;
  path: string[];
}

interface SidebarMenuItem {
  key: string;
  label: string;
  action?: 'logout';
  children?: SidebarMenuItem[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Output() readonly menuSelected = new EventEmitter<SidebarSelection>();

  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly activeKey = signal('dashboard');
  protected readonly expandedKeys = signal<ReadonlySet<string>>(new Set<string>());
  protected readonly currentUser: MockUserProfile = this.authService.getCurrentUser() ?? {
    displayName: 'Mock User',
    role: 'officer',
    community: 'Buena Rosa 9',
  };

  protected readonly menuItems: SidebarMenuItem[] = [
    {
      key: 'dashboard',
      label: 'Dashboard',
    },
    {
      key: 'management',
      label: 'Management',
      children: [
        {
          key: 'hoa-profile',
          label: 'HOA Profile',
          children: [
            { key: 'homeowners-list', label: 'Homeowners List' },
            { key: 'officers-list', label: 'Officers List' },
            { key: 'user-details', label: 'User Details' },
          ],
        },
        { key: 'house-records', label: 'House Records' },
        { key: 'document-records', label: 'Document & Records' },
      ],
    },
    {
      key: 'finance',
      label: 'Finance',
      children: [
        {
          key: 'monthly-dues',
          label: 'Monthly Dues',
          children: [
            { key: 'payment-records', label: 'Payment Records' },
            { key: 'billing', label: 'Billing' },
            { key: 'unpaid-dues', label: 'Unpaid Dues' },
          ],
        },
        {
          key: 'financial-reports',
          label: 'Financial Reports',
          children: [
            { key: 'collection-summary', label: 'Collection Summary' },
            { key: 'payment-history', label: 'Payment History' },
          ],
        },
      ],
    },
    {
      key: 'communication',
      label: 'Communication',
      children: [
        {
          key: 'announcements',
          label: 'Announcements',
          children: [
            { key: 'all-announcements', label: 'All Announcements' },
            { key: 'create-announcement', label: 'Create Announcement' },
            { key: 'archived-announcements', label: 'Archived Announcements' },
          ],
        },
        {
          key: 'events-scheduling',
          label: 'Events/Scheduling',
          children: [
            { key: 'calendar', label: 'Calendar' },
            { key: 'upcoming-events', label: 'Upcoming Events' },
            { key: 'past-events', label: 'Past Events' },
          ],
        },
      ],
    },
    {
      key: 'security',
      label: 'Security',
      children: [
        { key: 'visitor-logs', label: 'Visitor Logs' },
        { key: 'incident-reports', label: 'Incident Reports' },
      ],
    },
    {
      key: 'system',
      label: 'System',
      children: [
        { key: 'user-management', label: 'User Management' },
        { key: 'audit-log', label: 'Audit Log' },
        { key: 'settings', label: 'Settings' },
      ],
    },
    {
      key: 'account',
      label: 'Account',
      children: [
        { key: 'profile', label: 'Profile' },
        { key: 'logout', label: 'Log out', action: 'logout' },
      ],
    },
  ];

  protected isExpanded(key: string): boolean {
    return this.expandedKeys().has(key);
  }

  protected isActive(key: string): boolean {
    return this.activeKey() === key;
  }

  protected onMenuClick(item: SidebarMenuItem): void {
    if (item.action === 'logout') {
      this.authService.logout();
      void this.router.navigateByUrl('/login');
      return;
    }

    this.activeKey.set(item.key);

    if (item.children?.length) {
      this.toggleExpanded(item.key);
    }

    this.menuSelected.emit({
      key: item.key,
      label: item.label,
      path: this.getMenuPath(item.key),
    });
  }

  private getMenuPath(key: string): string[] {
    return this.findMenuPath(this.menuItems, key) ?? [];
  }

  private findMenuPath(items: SidebarMenuItem[], key: string, parentPath: string[] = []): string[] | null {
    for (const item of items) {
      const currentPath = [...parentPath, item.label];

      if (item.key === key) {
        return currentPath;
      }

      if (item.children?.length) {
        const childPath = this.findMenuPath(item.children, key, currentPath);

        if (childPath) {
          return childPath;
        }
      }
    }

    return null;
  }

  private toggleExpanded(key: string): void {
    const nextKeys = new Set(this.expandedKeys());

    if (nextKeys.has(key)) {
      nextKeys.delete(key);
    } else {
      nextKeys.add(key);
    }

    this.expandedKeys.set(nextKeys);
  }
}
