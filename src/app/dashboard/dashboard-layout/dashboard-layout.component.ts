import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { OfficersListComponent } from '../../management/officers-list/officers-list.component';
import { ResidentsListComponent } from '../../management/residents-list/residents-list.component';
import { ConfirmDialogComponent } from '../../shared/components/confirm-dialog/confirm-dialog.component';
import { DashboardHomeComponent } from '../dashboard-home/dashboard-home.component';
import { DashboardNavigationItem, DashboardNavigationSelection } from '../models/dashboard-navigation.model';
import { DashboardSummaryCardTarget } from '../models/dashboard-summary-card.model';
import { SectionLandingComponent } from '../section-landing/section-landing.component';
import { DashboardNavigationService } from '../services/dashboard-navigation.service';
import { SidebarComponent, SidebarSelection } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [
    SidebarComponent,
    DashboardHomeComponent,
    SectionLandingComponent,
    ConfirmDialogComponent,
    OfficersListComponent,
    ResidentsListComponent,
  ],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  private readonly authService = inject(AuthService);
  private readonly navigationService = inject(DashboardNavigationService);
  private readonly router = inject(Router);

  protected readonly selectedSidebarKey = signal('dashboard');
  protected readonly selectedMenu = signal<DashboardNavigationSelection | null>(null);
  protected readonly isLogoutDialogOpen = signal(false);

  protected onMenuSelected(selection: SidebarSelection): void {
    this.selectedSidebarKey.set(selection.key);

    if (selection.key === 'dashboard') {
      this.selectedMenu.set(null);
      return;
    }

    this.selectedMenu.set(selection);
  }

  protected onSummaryCardSelected(target: DashboardSummaryCardTarget): void {
    const selection = this.navigationService.getSelection(target.key) ?? {
      key: target.key,
      label: target.label,
      path: target.path,
      children: [],
    };

    this.selectedSidebarKey.set(selection.key);
    this.selectedMenu.set(selection);
  }

  protected onLandingItemSelected(item: DashboardNavigationItem): void {
    if (item.action === 'logout') {
      this.openLogoutDialog();
      return;
    }

    const selection = this.navigationService.getSelection(item.key);

    if (!selection) {
      return;
    }

    this.selectedSidebarKey.set(selection.key);
    this.selectedMenu.set(selection);
  }

  protected openLogoutDialog(): void {
    this.isLogoutDialogOpen.set(true);
  }

  protected closeLogoutDialog(): void {
    this.isLogoutDialogOpen.set(false);
  }

  protected confirmLogout(): void {
    this.authService.logout();
    this.isLogoutDialogOpen.set(false);
    void this.router.navigateByUrl('/login');
  }
}
