import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  CreateOfficerRequest,
  OFFICER_POSITION_LIMITS,
  OFFICER_POSITION_OPTIONS,
  Officer,
  OfficerPosition,
} from '../models/officer.model';
import { Resident } from '../models/resident.model';

@Component({
  selector: 'app-officer-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './officer-form.component.html',
  styleUrl: './officer-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OfficerFormComponent {
  @Input() residents: readonly Resident[] = [];
  @Input() officers: readonly Officer[] = [];
  @Output() readonly cancelled = new EventEmitter<void>();
  @Output() readonly submitted = new EventEmitter<CreateOfficerRequest>();

  private readonly formBuilder = inject(NonNullableFormBuilder);

  protected readonly positionOptions = OFFICER_POSITION_OPTIONS;
  protected readonly officerForm = this.formBuilder.group(
    {
      residentId: ['', Validators.required],
      position: ['', Validators.required],
      termStart: [''],
      termEnd: [''],
    },
    { validators: this.termRangeValidator() },
  );

  protected submit(): void {
    this.officerForm.markAllAsTouched();

    if (this.officerForm.invalid || this.residentAssignmentError() || this.positionLimitError()) {
      return;
    }

    const resident = this.selectedResident();

    if (!resident) {
      return;
    }

    const formValue = this.officerForm.getRawValue();

    this.submitted.emit({
      residentId: resident.id,
      fullName: resident.fullName,
      position: formValue.position as OfficerPosition,
      phase: resident.phase,
      block: resident.block,
      lot: resident.lot,
      contactNumber: resident.contactNumber,
      email: resident.email,
      termStart: formValue.termStart || undefined,
      termEnd: formValue.termEnd || undefined,
    });
  }

  protected cancel(): void {
    this.cancelled.emit();
  }

  protected selectedResident(): Resident | undefined {
    const residentId = this.officerForm.controls.residentId.value;

    return this.residents.find((resident) => resident.id === residentId);
  }

  protected fieldInvalid(fieldName: keyof typeof this.officerForm.controls): boolean {
    const control = this.officerForm.controls[fieldName];

    return control.invalid && (control.dirty || control.touched);
  }

  protected termRangeInvalid(): boolean {
    const termStart = this.officerForm.controls.termStart;
    const termEnd = this.officerForm.controls.termEnd;

    return this.officerForm.hasError('termRange') && (termStart.dirty || termStart.touched || termEnd.dirty || termEnd.touched);
  }

  protected termStartRequiredForTermEndInvalid(): boolean {
    const termEnd = this.officerForm.controls.termEnd;

    return this.officerForm.hasError('termStartRequiredForTermEnd') && (termEnd.dirty || termEnd.touched);
  }

  protected residentAssignmentError(): string {
    const residentId = this.officerForm.controls.residentId.value;

    if (!residentId) {
      return '';
    }

    return this.officers.some((officer) => officer.residentId === residentId && officer.officerStatus === 'active')
      ? 'Resident is already assigned as an officer'
      : '';
  }

  protected positionLimitError(): string {
    const position = this.officerForm.controls.position.value as OfficerPosition | '';

    if (!position) {
      return '';
    }

    const activeOfficerCount = this.officers.filter(
      (officer) => officer.position === position && officer.officerStatus === 'active',
    ).length;
    const positionLimit = OFFICER_POSITION_LIMITS[position];

    if (activeOfficerCount < positionLimit) {
      return '';
    }

    return position === 'board-of-directors'
      ? 'Board of Directors (BOD) already has 2 assigned officers'
      : 'This position has already reached the allowed number of assigned officers';
  }

  protected formatPhase(phase: string): string {
    return phase === 'phase-1' ? 'Phase 1' : 'Phase 2';
  }

  protected onBackdropClick(): void {
    this.cancel();
  }

  @HostListener('document:keydown.escape', ['$event'])
  protected onEscape(event: Event): void {
    event.preventDefault();
    this.cancel();
  }

  private termRangeValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const termStart = control.get('termStart')?.value;
      const termEnd = control.get('termEnd')?.value;

      if (!termEnd) {
        return null;
      }

      if (!termStart) {
        return { termStartRequiredForTermEnd: true };
      }

      return termEnd < termStart ? { termRange: true } : null;
    };
  }
}
