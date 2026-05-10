import { ChangeDetectionStrategy, Component, Input, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { HomeownerFormComponent } from '../homeowner-form/homeowner-form.component';
import {
  CreateHomeownerRequest,
  Homeowner,
  HomeownerAccountStatus,
  HomeownerResidentType,
} from '../models/homeowner.model';
import { HomeownerService } from '../services/homeowner.service';

@Component({
  selector: 'app-homeowners-list',
  standalone: true,
  imports: [HomeownerFormComponent],
  templateUrl: './homeowners-list.component.html',
  styleUrl: './homeowners-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeownersListComponent {
  @Input() breadcrumb: readonly string[] = [];

  private readonly homeownerService = inject(HomeownerService);

  protected readonly searchTerm = signal('');
  protected readonly selectedBlock = signal('');
  protected readonly selectedAccountStatus = signal('');
  protected readonly selectedResidentType = signal('');
  protected readonly isAddHomeownerOpen = signal(false);
  protected readonly accountStatusOptions: readonly HomeownerAccountStatus[] = [
    'active',
    'pending',
    'inactive',
    'suspended',
  ];
  protected readonly residentTypeOptions: readonly HomeownerResidentType[] = [
    'homeowner',
    'renter',
    'occupant',
  ];
  protected readonly homeowners = toSignal(this.homeownerService.getHomeowners(), {
    initialValue: [] as readonly Homeowner[],
  });
  protected readonly displayedHomeowners = computed(() => {
    const search = this.searchTerm().trim().toLowerCase();
    const block = this.selectedBlock();
    const accountStatus = this.selectedAccountStatus();
    const residentType = this.selectedResidentType();

    return this.homeowners().filter((homeowner) => {
      const matchesSearch =
        !search ||
        [homeowner.fullName, homeowner.block, homeowner.lot, homeowner.contactNumber, homeowner.email].some((value) =>
          value.toLowerCase().includes(search),
        );
      const matchesBlock = !block || homeowner.block === block;
      const matchesAccountStatus = !accountStatus || homeowner.accountStatus === accountStatus;
      const matchesResidentType = !residentType || homeowner.residentType === residentType;

      return matchesSearch && matchesBlock && matchesAccountStatus && matchesResidentType;
    });
  });
  protected readonly blockOptions = computed(() =>
    Array.from(new Set(this.homeowners().map((homeowner) => homeowner.block))).sort(),
  );
  protected readonly displayedCount = computed(() => this.displayedHomeowners().length);
  protected readonly footerText = computed(() => {
    const displayedCount = this.displayedCount();

    if (!displayedCount) {
      return '0 homeowners';
    }

    if (displayedCount === 1) {
      return 'Showing 1 of 1 homeowner';
    }

    return `Showing 1–${displayedCount} of ${displayedCount} homeowners`;
  });

  protected updateSearchTerm(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
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
    this.selectedBlock.set('');
    this.selectedAccountStatus.set('');
    this.selectedResidentType.set('');
  }

  protected openAddHomeowner(): void {
    this.isAddHomeownerOpen.set(true);
  }

  protected closeAddHomeowner(): void {
    this.isAddHomeownerOpen.set(false);
  }

  protected createHomeowner(homeowner: CreateHomeownerRequest): void {
    this.homeownerService.createHomeowner(homeowner).subscribe(() => {
      this.clearFilters();
      this.closeAddHomeowner();
    });
  }

  protected formatAccountStatus(homeowner: Homeowner): string {
    return this.formatStatus(homeowner.accountStatus);
  }

  protected formatResidentType(homeowner: Homeowner): string {
    return this.formatStatus(homeowner.residentType);
  }

  protected formatStatus(status: string): string {
    return status
      .split('-')
      .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
      .join(' ');
  }
}
