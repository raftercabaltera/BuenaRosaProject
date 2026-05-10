import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output, inject } from '@angular/core';
import {
  AbstractControl,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import {
  CreateHomeownerRequest,
  HomeownerAccountStatus,
  HomeownerResidentType,
} from '../models/homeowner.model';

@Component({
  selector: 'app-homeowner-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './homeowner-form.component.html',
  styleUrl: './homeowner-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeownerFormComponent {
  @Output() readonly cancelled = new EventEmitter<void>();
  @Output() readonly submitted = new EventEmitter<CreateHomeownerRequest>();

  private readonly formBuilder = inject(NonNullableFormBuilder);

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
  protected readonly homeownerForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    block: ['', Validators.required],
    lot: ['', Validators.required],
    contactNumber: ['', [Validators.required, this.localPhoneValidator()]],
    email: ['', Validators.email],
    accountStatus: ['', Validators.required],
    residentType: ['', Validators.required],
  });

  protected submit(): void {
    this.homeownerForm.markAllAsTouched();

    if (this.homeownerForm.invalid) {
      return;
    }

    const formValue = this.homeownerForm.getRawValue();

    this.submitted.emit({
      fullName: formValue.fullName.trim(),
      block: formValue.block.trim(),
      lot: formValue.lot.trim(),
      contactNumber: formValue.contactNumber.trim(),
      email: formValue.email.trim(),
      accountStatus: formValue.accountStatus as HomeownerAccountStatus,
      residentType: formValue.residentType as HomeownerResidentType,
    });
  }

  protected cancel(): void {
    this.cancelled.emit();
  }

  protected fieldInvalid(fieldName: keyof typeof this.homeownerForm.controls): boolean {
    const control = this.homeownerForm.controls[fieldName];

    return control.invalid && (control.dirty || control.touched);
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

  private localPhoneValidator(): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors | null => {
      const value = control.value.trim();

      if (!value) {
        return null;
      }

      const normalizedValue = value.replace(/[\s-]/g, '');
      const isValid = /^(\+63|0)\d{9,10}$/.test(normalizedValue);

      return isValid ? null : { localPhone: true };
    };
  }
}
