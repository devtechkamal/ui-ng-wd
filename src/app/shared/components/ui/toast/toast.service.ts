import { Injectable, signal } from '@angular/core';

export interface Toast {
  id: number;
  message: string;
  type?: 'success' | 'error' | 'info';
}

@Injectable({
  providedIn: 'root', // Important: Taaki user ko provider setup na karna pade
})
export class ToastService {
  // Signals use kar rahe hain for reactivity
  toasts = signal<Toast[]>([]);

  show(message: string, type: Toast['type'] = 'info') {
    const id = Date.now();
    const newToast: Toast = { id, message, type };

    this.toasts.update((old) => [...old, newToast]);

    // 3 second baad auto remove
    setTimeout(() => {
      this.remove(id);
    }, 3000);
  }

  remove(id: number) {
    this.toasts.update((old) => old.filter((t) => t.id !== id));
  }
}
