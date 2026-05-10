import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { AuthService, MockUserProfile } from '../../auth/auth.service';
import { DashboardNavigationItem, DashboardNavigationSelection } from '../models/dashboard-navigation.model';
import { DashboardNavigationService } from '../services/dashboard-navigation.service';

export type SidebarSelection = DashboardNavigationSelection;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Output() readonly menuSelected = new EventEmitter<SidebarSelection>();
  @Output() readonly logoutRequested = new EventEmitter<void>();

  @Input() set selectedKey(key: string | null) {
    if (!key) {
      return;
    }

    this.activeKey.set(key);
    this.expandParentMenus(key);
  }

  private readonly authService = inject(AuthService);
  private readonly navigationService = inject(DashboardNavigationService);

  protected readonly activeKey = signal('dashboard');
  protected readonly expandedKeys = signal<ReadonlySet<string>>(new Set<string>());
  protected readonly currentUser: MockUserProfile = this.authService.getCurrentUser() ?? {
    displayName: 'Mock User',
    role: 'officer',
    community: 'Buena Rosa 9',
  };
  protected readonly menuItems = this.navigationService.getMenuItems();

  protected isExpanded(key: string): boolean {
    return this.expandedKeys().has(key);
  }

  protected isActive(key: string): boolean {
    return this.activeKey() === key;
  }

  protected onMenuClick(item: DashboardNavigationItem): void {
    if (item.action === 'logout') {
      this.logoutRequested.emit();
      return;
    }

    this.activeKey.set(item.key);

    if (item.children?.length) {
      this.toggleExpanded(item.key);
    }

    const selection = this.navigationService.getSelection(item.key);

    if (selection) {
      this.menuSelected.emit(selection);
    }
  }

  private expandParentMenus(key: string): void {
    const keyPath = this.navigationService.getKeyPath(key);

    if (!keyPath.length) {
      return;
    }

    this.expandedKeys.set(new Set(keyPath.slice(0, -1)));
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
