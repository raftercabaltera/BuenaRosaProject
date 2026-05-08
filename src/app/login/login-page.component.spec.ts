import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the account step first', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Sign in');
    expect(compiled.querySelector('input')?.getAttribute('formcontrolname')).toBe('accountId');
    expect(compiled.querySelector('button[type="submit"]')?.textContent).toContain('Next');
  });

  it('should show a short back button on the account step', () => {
    const buttons = Array.from<HTMLButtonElement>(fixture.nativeElement.querySelectorAll('button')).map((button) =>
      button.textContent?.trim(),
    );

    expect(buttons).toContain('Back');
    expect(buttons).not.toContain('Back to landing page');
  });

  it('should show required validation for account ID', () => {
    const submitButton = fixture.nativeElement.querySelector('button[type="submit"]') as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Block and lot account ID is required.');
  });

  it('should move to the password step after entering an account ID', () => {
    const component = fixture.componentInstance;

    component['loginForm'].controls.accountId.setValue('admin001');
    component['goToPasswordStep']();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('Welcome back');
    expect(compiled.querySelector('input')?.getAttribute('formcontrolname')).toBe('password');
    expect(compiled.querySelector('button[type="submit"]')?.textContent).toContain('Sign in');
  });

  it('should show validation when the account ID is not a mock account', () => {
    const component = fixture.componentInstance;

    component['loginForm'].controls.accountId.setValue('unknown001');
    component['goToPasswordStep']();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Account ID does not match any mock account.');
  });
});
