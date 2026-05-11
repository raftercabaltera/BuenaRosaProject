import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { OfficerFormComponent } from '../officer-form/officer-form.component';
import {
  CreateOfficerRequest,
  OFFICER_POSITION_OPTIONS,
  OFFICER_STATUS_OPTIONS,
  Officer,
  OfficerPhase,
  OfficerPosition,
} from '../models/officer.model';
import { Resident } from '../models/resident.model';
import { OfficerService } from '../services/officer.service';
import { ResidentService } from '../services/resident.service';

@Component({
  selector: 'app-officers-list',
  standalone: true,
  imports: [OfficerFormComponent],
  templateUrl: './officers-list.component.html',
  styleUrl: './officers-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficersListComponent {
  @Input() breadcrumb: readonly string[] = [];

  private readonly officerService = inject(OfficerService);
  private readonly residentService = inject(ResidentService);

  protected readonly searchTerm = signal('');
  protected readonly selectedPosition = signal('');
  protected readonly selectedAccountStatus = signal('');
  protected readonly isAddOfficerOpen = signal(false);
  protected readonly positionOptions = OFFICER_POSITION_OPTIONS;
  protected readonly accountStatusOptions = OFFICER_STATUS_OPTIONS;
  protected readonly officers = toSignal(this.officerService.getOfficers(), {
    initialValue: [] as readonly Officer[],
  });
  protected readonly residents = toSignal(this.residentService.getResidents(), {
    initialValue: [] as readonly Resident[],
  });
  protected readonly displayedOfficers = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const position = this.selectedPosition();
    const accountStatus = this.selectedAccountStatus();

    return this.officers().filter((officer) => {
      const matchesSearch =
        !search ||
        [
          officer.fullName,
          this.formatPosition(officer.position),
          this.formatPhase(officer.phase),
          officer.block,
          officer.lot,
          officer.contactNumber,
          officer.email,
        ].some((value) => value.toLowerCase().includes(search));
      const matchesPosition = !position || officer.position === (position as OfficerPosition);
      const matchesAccountStatus = !accountStatus || officer.officerStatus === accountStatus;

      return matchesSearch && matchesPosition && matchesAccountStatus;
    });
  });
  protected readonly displayedCount = computed(() => this.displayedOfficers().length);
  protected readonly footerText = computed(() => {
    const displayedCount = this.displayedCount();

    if (!displayedCount) {
      return '0 officers';
    }

    if (displayedCount === 1) {
      return 'Showing 1 of 1 officer';
    }

    return `Showing 1\u2013${displayedCount} of ${displayedCount} officers`;
  });

  protected updateSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected updatePosition(event: Event): void {
    this.selectedPosition.set((event.target as HTMLSelectElement).value);
  }

  protected updateAccountStatus(event: Event): void {
    this.selectedAccountStatus.set((event.target as HTMLSelectElement).value);
  }

  protected clearFilters(): void {
    this.searchTerm.set('');
    this.selectedPosition.set('');
    this.selectedAccountStatus.set('');
  }

  protected openAddOfficer(): void {
    this.isAddOfficerOpen.set(true);
  }

  protected closeAddOfficer(): void {
    this.isAddOfficerOpen.set(false);
  }

  protected createOfficer(officer: CreateOfficerRequest): void {
    this.officerService.createOfficer(officer).subscribe(() => {
      this.clearFilters();
      this.closeAddOfficer();
    });
  }

  protected formatPhase(phase: OfficerPhase): string {
    return phase === 'phase-1' ? 'Phase 1' : 'Phase 2';
  }

  protected formatPosition(position: OfficerPosition): string {
    return this.positionOptions.find((option) => option.value === position)?.label ?? this.formatStatus(position);
  }

  protected formatAccountStatus(officer: Officer): string {
    return this.formatStatus(officer.officerStatus);
  }

  protected formatStatus(status: string): string {
    return status
      .split('-')
      .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
      .join(' ');
  }
}
