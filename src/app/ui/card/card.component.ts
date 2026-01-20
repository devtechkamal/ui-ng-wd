import { Component } from '@angular/core';

@Component({
  selector: 'wdc-card',
  imports: [],
  standalone: true,
  template: `
    <div class="card">
      <ng-content></ng-content>
    </div>
  `,
})
export class CardComponent {}
