import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DashboardNavigationItem } from '../models/dashboard-navigation.model';

@Component({
  selector: 'app-section-landing',
  standalone: true,
  templateUrl: './section-landing.component.html',
  styleUrl: './section-landing.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SectionLandingComponent {
  @Input() title = '';
  @Input() breadcrumb: readonly string[] = [];
  @Input() items: readonly DashboardNavigationItem[] = [];

  @Output() readonly itemSelected = new EventEmitter<DashboardNavigationItem>();

  protected selectItem(item: DashboardNavigationItem): void {
    this.itemSelected.emit(item);
  }
}
