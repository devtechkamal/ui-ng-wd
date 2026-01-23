import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'wdc-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button [class]="'px-4 py-2 rounded bg-blue-600 text-white ' + class">
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() class = '';
}
