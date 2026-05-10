import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

type ConfirmButtonTone = 'primary' | 'danger';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements AfterViewInit {
  private static nextId = 0;

  @Input() title = '';
  @Input() message = '';
  @Input() cancelLabel = 'Cancel';
  @Input() confirmLabel = 'Confirm';
  @Input() confirmButtonTone: ConfirmButtonTone = 'primary';

  @Output() readonly cancelled = new EventEmitter<void>();
  @Output() readonly confirmed = new EventEmitter<void>();

  @ViewChild('cancelButton') private readonly cancelButton?: ElementRef<HTMLButtonElement>;

  protected readonly dialogId = `confirm-dialog-${ConfirmDialogComponent.nextId++}`;
  protected readonly titleId = `${this.dialogId}-title`;
  protected readonly messageId = `${this.dialogId}-message`;

  ngAfterViewInit(): void {
    queueMicrotask(() => this.cancelButton?.nativeElement.focus());
  }

  protected onBackdropClick(): void {
    this.cancel();
  }

  protected cancel(): void {
    this.cancelled.emit();
  }

  protected confirm(): void {
    this.confirmed.emit();
  }

  @HostListener('document:keydown.escape', ['$event'])
  protected onEscape(event: Event): void {
    event.preventDefault();
    this.cancel();
  }
}
