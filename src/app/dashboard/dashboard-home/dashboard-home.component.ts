import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeComponent {}
