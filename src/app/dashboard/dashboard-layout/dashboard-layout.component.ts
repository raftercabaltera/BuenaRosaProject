import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DashboardHomeComponent } from '../dashboard-home/dashboard-home.component';
import { DashboardSummaryCardTarget } from '../models/dashboard-summary-card.model';
import { SidebarComponent, SidebarSelection } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard-layout',
  standalone: true,
  imports: [SidebarComponent, DashboardHomeComponent],
  templateUrl: './dashboard-layout.component.html',
  styleUrl: './dashboard-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardLayoutComponent {
  protected readonly selectedSidebarKey = signal('dashboard');
  protected readonly selectedMenu = signal<SidebarSelection | null>(null);

  protected onMenuSelected(selection: SidebarSelection): void {
    this.selectedSidebarKey.set(selection.key);

    if (selection.key === 'dashboard') {
      this.selectedMenu.set(null);
      return;
    }

    this.selectedMenu.set(selection);
  }

  protected onSummaryCardSelected(target: DashboardSummaryCardTarget): void {
    this.selectedSidebarKey.set(target.key);
    this.selectedMenu.set(target);
  }
}
