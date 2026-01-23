import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from './toast.service'; // Relative import is KEY

@Component({
  selector: 'wdc-toaster', // Yeh tag app.component.html mein lagega
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      @for (toast of toastService.toasts(); track toast.id) {
      <div
        class="px-4 py-3 rounded-md shadow-md text-white transition-all transform animate-in slide-in-from-right"
        [ngClass]="{
          'bg-slate-800': toast.type === 'info',
          'bg-green-600': toast.type === 'success',
          'bg-red-600': toast.type === 'error'
        }"
      >
        <div class="flex justify-between items-center gap-4">
          <span>{{ toast.message }}</span>
          <button (click)="toastService.remove(toast.id)" class="text-white/80 hover:text-white">
            ✕
          </button>
        </div>
      </div>
      }
    </div>
  `,
})
export class ToasterComponent {
  toastService = inject(ToastService);
}
