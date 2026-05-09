import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, inject } from '@angular/core';
import { DashboardSummaryCard, DashboardSummaryCardTarget } from '../models/dashboard-summary-card.model';
import { DashboardOverviewService } from '../services/dashboard-overview.service';
import { DashboardSummaryService } from '../services/dashboard-summary.service';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardHomeComponent {
  @Output() readonly summaryCardSelected = new EventEmitter<DashboardSummaryCardTarget>();

  private readonly dashboardOverviewService = inject(DashboardOverviewService);
  private readonly dashboardSummaryService = inject(DashboardSummaryService);

  readonly overview$ = this.dashboardOverviewService.getOverview();
  readonly summaryCards$ = this.dashboardSummaryService.getSummaryCards();

  protected onSummaryCardSelected(card: DashboardSummaryCard): void {
    this.onDashboardTargetSelected(card.target);
  }

  protected onDashboardTargetSelected(target: DashboardSummaryCardTarget): void {
    this.summaryCardSelected.emit(target);
  }
}
