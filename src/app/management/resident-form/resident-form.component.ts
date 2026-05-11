import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  CreateResidentRequest,
  ResidentAccountStatus,
  ResidentPhase,
  ResidentType,
} from '../models/resident.model';

@Component({
  selector: 'app-resident-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './resident-form.component.html',
  styleUrl: './resident-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResidentFormComponent {
  @Output() readonly cancelled = new EventEmitter<void>();
  @Output() readonly submitted = new EventEmitter<CreateResidentRequest>();

  private readonly formBuilder = inject(NonNullableFormBuilder);

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
  protected readonly residentForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    phase: ['', Validators.required],
    block: ['', Validators.required],
    lot: ['', Validators.required],
    contactNumber: ['', Validators.required],
    email: ['', Validators.email],
    accountStatus: ['', Validators.required],
    residentType: ['', Validators.required],
  });

  protected submit(): void {
    this.residentForm.markAllAsTouched();

    if (this.residentForm.invalid) {
      return;
    }

    const formValue = this.residentForm.getRawValue();

    this.submitted.emit({
      fullName: formValue.fullName.trim(),
      phase: formValue.phase as ResidentPhase,
      block: formValue.block.trim(),
      lot: formValue.lot.trim(),
      contactNumber: formValue.contactNumber.trim(),
      email: formValue.email.trim(),
      accountStatus: formValue.accountStatus as ResidentAccountStatus,
      residentType: formValue.residentType as ResidentType,
    });
  }

  protected cancel(): void {
    this.cancelled.emit();
  }

  protected fieldInvalid(fieldName: keyof typeof this.residentForm.controls): boolean {
    const control = this.residentForm.controls[fieldName];

    return control.invalid && (control.dirty || control.touched);
  }

  protected formatPhase(phase: ResidentPhase): string {
    return phase === 'phase-1' ? 'Phase 1' : 'Phase 2';
  }

  protected formatStatus(status: string): string {
    return status
      .split('-')
      .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
      .join(' ');
  }

  protected onBackdropClick(): void {
    this.cancel();
  }

  @HostListener('document:keydown.escape', ['$event'])
  protected onEscape(event: Event): void {
    event.preventDefault();
    this.cancel();
  }
}
