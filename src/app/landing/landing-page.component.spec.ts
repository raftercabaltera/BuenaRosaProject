import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingPageComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the landing content', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain('A simpler way to stay connected');
    expect(compiled.querySelector('a')?.textContent).toContain('Open Portal');
  });
});
