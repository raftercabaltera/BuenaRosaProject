import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ResidentFormComponent } from '../resident-form/resident-form.component';
import {
  CreateResidentRequest,
  Resident,
  ResidentAccountStatus,
  ResidentPhase,
  ResidentType,
} from '../models/resident.model';
import { ResidentService } from '../services/resident.service';

@Component({
  selector: 'app-residents-list',
  standalone: true,
  imports: [ResidentFormComponent],
  templateUrl: './residents-list.component.html',
  styleUrl: './residents-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResidentsListComponent {
  @Input() breadcrumb: readonly string[] = [];

  private readonly residentService = inject(ResidentService);

  protected readonly searchTerm = signal('');
  protected readonly selectedPhase = signal('');
  protected readonly selectedBlock = signal('');
  protected readonly selectedAccountStatus = signal('');
  protected readonly selectedResidentType = signal('');
  protected readonly isAddResidentOpen = signal(false);
  protected readonly phaseOptions: readonly ResidentPhase[] = ['phase-1', 'phase-2'];
  protected readonly accountStatusOptions: readonly ResidentAccountStatus[] = [
    'active',
    'pending',
    'inactive',
    'suspended',
  ];
  protected readonly residentTypeOptions: readonly ResidentType[] = [
    'homeowner',
    'renter',
    'authorized-occupant',
  ];
  protected readonly residents = toSignal(this.residentService.getResidents(), {
    initialValue: [] as readonly Resident[],
  });
  protected readonly displayedResidents = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const phase = this.selectedPhase();
    const block = this.selectedBlock();
    const accountStatus = this.selectedAccountStatus();
    const residentType = this.selectedResidentType();

    return this.residents().filter((resident) => {
      const matchesSearch =
        !search ||
        [
          resident.fullName,
          this.formatPhase(resident.phase),
          resident.block,
          resident.lot,
          resident.contactNumber,
          resident.email,
        ].some((value) => value.toLowerCase().includes(search));
      const matchesPhase = !phase || resident.phase === phase;
      const matchesBlock = !block || resident.block === block;
      const matchesAccountStatus = !accountStatus || resident.accountStatus === accountStatus;
      const matchesResidentType = !residentType || resident.residentType === residentType;

      return matchesSearch && matchesPhase && matchesBlock && matchesAccountStatus && matchesResidentType;
    });
  });
  protected readonly blockOptions = computed(() =>
    Array.from(new Set(this.residents().map((resident) => resident.block))).sort(),
  );
  protected readonly displayedCount = computed(() => this.displayedResidents().length);
  protected readonly footerText = computed(() => {
    const displayedCount = this.displayedCount();

    if (!displayedCount) {
      return '0 residents';
    }

    if (displayedCount === 1) {
      return 'Showing 1 of 1 resident';
    }

    return `Showing 1\u2013${displayedCount} of ${displayedCount} residents`;
  });

  protected updateSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  protected updatePhase(event: Event): void {
    this.selectedPhase.set((event.target as HTMLSelectElement).value);
  }

  protected updateBlock(event: Event): void {
    this.selectedBlock.set((event.target as HTMLSelectElement).value);
  }

  protected updateAccountStatus(event: Event): void {
    this.selectedAccountStatus.set((event.target as HTMLSelectElement).value);
  }

  protected updateResidentType(event: Event): void {
    this.selectedResidentType.set((event.target as HTMLSelectElement).value);
  }

  protected clearFilters(): void {
    this.searchTerm.set('');
    this.selectedPhase.set('');
    this.selectedBlock.set('');
    this.selectedAccountStatus.set('');
    this.selectedResidentType.set('');
  }

  protected openAddResident(): void {
    this.isAddResidentOpen.set(true);
  }

  protected closeAddResident(): void {
    this.isAddResidentOpen.set(false);
  }

  protected createResident(resident: CreateResidentRequest): void {
    this.residentService.createResident(resident).subscribe(() => {
      this.clearFilters();
      this.closeAddResident();
    });
  }

  protected formatPhase(phase: ResidentPhase): string {
    return phase === 'phase-1' ? 'Phase 1' : 'Phase 2';
  }

  protected formatAccountStatus(resident: Resident): string {
    return this.formatStatus(resident.accountStatus);
  }

  protected formatResidentType(resident: Resident): string {
    return this.formatStatus(resident.residentType);
  }

  protected formatStatus(status: string): string {
    return status
      .split('-')
      .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
      .join(' ');
  }
}
