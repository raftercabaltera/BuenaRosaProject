import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DashboardHomeComponent } from '../dashboard-home/dashboard-home.component';
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
  protected readonly selectedMenu = signal<SidebarSelection | null>(null);

  protected onMenuSelected(selection: SidebarSelection): void {
    if (selection.key === 'dashboard') {
      this.selectedMenu.set(null);
      return;
    }

    this.selectedMenu.set(selection);
  }
}
