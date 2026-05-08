import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

type LoginStep = 'account' | 'password';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPageComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  protected readonly logoPath = '/Images/buenarosa9-nobg.png';
  protected readonly currentStep = signal<LoginStep>('account');
  protected readonly accountLookupError = signal('');
  protected readonly loginForm = this.formBuilder.group({
    accountId: ['', Validators.required],
    password: ['', Validators.required],
  });

  protected get isPasswordStep(): boolean {
    return this.currentStep() === 'password';
  }

  protected get accountIdInvalid(): boolean {
    const control = this.loginForm.controls.accountId;

    return (control.invalid && (control.dirty || control.touched)) || Boolean(this.accountLookupError());
  }

  protected get passwordInvalid(): boolean {
    const control = this.loginForm.controls.password;

    return control.invalid && (control.dirty || control.touched);
  }

  protected get selectedAccountLabel(): string {
    return this.loginForm.controls.accountId.value.trim() || 'Selected account';
  }

  protected onSubmit(): void {
    if (!this.isPasswordStep) {
      this.goToPasswordStep();
      return;
    }

    const password = this.loginForm.controls.password;

    password.markAsTouched();

    if (password.invalid) {
      return;
    }

    const profile = this.authService.login(this.loginForm.controls.accountId.value);

    if (!profile) {
      this.currentStep.set('account');
      this.accountLookupError.set('Account ID does not match any mock account.');
      return;
    }

    void this.router.navigateByUrl('/dashboard');
  }

  protected goToPasswordStep(): void {
    const accountId = this.loginForm.controls.accountId;

    this.accountLookupError.set('');
    accountId.markAsTouched();

    if (accountId.invalid) {
      return;
    }

    if (!this.authService.findMockProfile(accountId.value)) {
      this.accountLookupError.set('Account ID does not match any mock account.');
      return;
    }

    this.currentStep.set('password');
  }

  protected goBackToAccount(): void {
    this.currentStep.set('account');
  }

  protected clearAccountLookupError(): void {
    this.accountLookupError.set('');
  }

  protected goToLanding(): void {
    void this.router.navigateByUrl('/');
  }

  protected onCardPointerMove(event: PointerEvent): void {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
    card.style.setProperty('--rx', `${(((y / rect.height) - 0.5) * -5).toFixed(2)}deg`);
    card.style.setProperty('--ry', `${(((x / rect.width) - 0.5) * 5).toFixed(2)}deg`);
  }

  protected resetCard(event: PointerEvent): void {
    const card = event.currentTarget as HTMLElement;

    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  }
}
