import {
  Component,
  input,
  computed,
  inject,
  ElementRef,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { cva } from 'class-variance-authority';
import { cn } from '@shared/utils/cn';
import { SidebarService } from './sidebar.service';

// --- 1. SIDEBAR LAYOUT (Root Wrapper) ---
@Component({
  selector: 'wdc-sidebar-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex min-h-screen w-full bg-background">
      <ng-content select="wdc-sidebar"></ng-content>

      <main class="flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out">
        <ng-content></ng-content>
      </main>
    </div>
  `,
})
export class SidebarLayoutComponent {}

// --- 2. SIDEBAR (The Aside Element) ---
const sidebarVariants = cva(
  'fixed inset-y-0 z-40 flex h-full flex-col border-r bg-sidebar transition-transform duration-300 ease-in-out md:static md:translate-x-0',
  {
    variants: {
      side: {
        left: 'left-0 border-r',
        right: 'right-0 border-l', // Right side sidebar support
      },
      state: {
        open: 'translate-x-0',
        closed: '-translate-x-full', // Mobile hidden state
      },
    },
    defaultVariants: {
      side: 'left',
    },
  },
);

@Component({
  selector: 'wdc-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (sidebar.isMobile() && sidebar.isOpen()) {
      <div
        (click)="sidebar.setOpen(false)"
        class="fixed inset-0 z-30 bg-black/80 md:hidden animate-in fade-in-0"
      ></div>
    }

    <aside [class]="computedClasses()">
      <ng-content select="wdc-sidebar-header"></ng-content>

      <div class="flex-1 overflow-auto py-2">
        <ng-content></ng-content>
      </div>

      <ng-content select="wdc-sidebar-footer"></ng-content>
    </aside>
  `,
})
export class SidebarComponent {
  sidebar = inject(SidebarService);
  side = input<'left' | 'right'>('left');
  class = input('');

  computedClasses = computed(() => {
    // Agar Right side hai aur closed hai, to +translate-x-full hona chahiye
    const closedTransform = this.side() === 'left' ? '-translate-x-full' : 'translate-x-full';

    // Manual State handling for class merging
    const stateClass = this.sidebar.isOpen() ? 'translate-x-0' : closedTransform;

    return cn(
      'fixed inset-y-0 z-40 flex h-full w-64 flex-col bg-sidebar border-sidebar-border transition-transform duration-300 ease-in-out md:static md:translate-x-0',
      this.side() === 'right' ? 'right-0 border-l' : 'left-0 border-r',
      stateClass,
      this.class(),
    );
  });
}

// --- 3. SIDEBAR TRIGGER (Hamburger) ---
@Component({
  selector: 'wdc-sidebar-trigger',
  standalone: true,
  template: `
    <button
      (click)="sidebar.toggle()"
      class="inline-flex items-center justify-center rounded-md p-2 hover:bg-accent hover:text-accent-foreground md:hidden"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
      <span class="sr-only">Toggle Sidebar</span>
    </button>
  `,
})
export class SidebarTriggerComponent {
  sidebar = inject(SidebarService);
}

// --- 4. SIDEBAR ITEM (Link) ---
@Component({
  selector: 'wdc-sidebar-item',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <a
      [routerLink]="href()"
      routerLinkActive="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
      [routerLinkActiveOptions]="{ exact: exact() }"
      (click)="handleClick()"
      class="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground mx-2 mb-1 cursor-pointer"
    >
      <ng-content select="[icon]"></ng-content>
      <ng-content></ng-content>
    </a>
  `,
})
export class SidebarItemComponent {
  sidebar = inject(SidebarService);
  href = input.required<string>();
  exact = input(false);

  handleClick() {
    // Mobile pe click karne par sidebar close hona chahiye
    this.sidebar.closeMobile();
  }
}

// --- 5. UTILITY COMPONENTS (Header, Footer, Group) ---
@Component({
  selector: 'wdc-sidebar-header',
  standalone: true,
  template: `<div class="flex h-14 items-center border-b border-sidebar-border px-4 font-semibold">
    <ng-content></ng-content>
  </div>`,
})
export class SidebarHeaderComponent {}

@Component({
  selector: 'wdc-sidebar-footer',
  standalone: true,
  template: `<div class="border-t border-sidebar-border p-4"><ng-content></ng-content></div>`,
})
export class SidebarFooterComponent {}

// --- 5. SIDEBAR COLLAPSIBLE (Link) ---
@Component({
  selector: 'wdc-sidebar-collapsible',
  standalone: true,
  imports: [CommonModule, RouterLinkActive], // RouterLinkActive zaroori hai
  template: `
    <div class="px-2 mb-1">
      <button
        (click)="toggle()"
        class="flex w-full items-center justify-between gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground group"
        [class.bg-sidebar-accent]="isOpen()"
        [class.text-sidebar-accent-foreground]="isOpen()"
      >
        <div class="flex items-center gap-3">
          <ng-content select="[icon]"></ng-content>
          <span>{{ label() }}</span>
        </div>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="transition-transform duration-200"
          [class.rotate-90]="isOpen()"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div
        class="grid transition-all duration-300 ease-in-out"
        [class.grid-rows-[1fr]]="isOpen()"
        [class.grid-rows-[0fr]]="!isOpen()"
      >
        <div class="overflow-hidden">
          <div class="mt-1 ml-4 border-l border-sidebar-border pl-2">
            <ng-content></ng-content>
          </div>
        </div>
      </div>
    </div>
  `,
})
export class SidebarCollapsibleComponent {
  label = input.required<string>();
  router = inject(Router);
  // State
  isOpen = signal(false);

  toggle() {
    this.isOpen.update((v) => !v);
  }

  // Auto-Open Logic:
  // Agar page refresh ho aur koi child link active ho, to isse khulna chahiye.
  // Hum RouterLinkActive ka instance inject kar sakte hain agar wrapper pe laga ho,
  // ya phir manually check kar sakte hain. Simple approach:
  // User ko initial state set karne do ya Router events listen karo.
  // For now, let's allow manual input:
  startOpen = input(false);

  constructor() {
    // Listen to Route Changes
    // this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
    //   this.checkActive();
    // });

    // Agar input true hai to start open
    if (this.startOpen()) {
      this.isOpen.set(true);
    }
  }

  // checkActive() {}
}

@Component({
  selector: 'wdc-sidebar-group-label',
  standalone: true,
  template: `<div
    class="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-4"
  >
    <ng-content></ng-content>
  </div>`,
})
export class SidebarGroupLabelComponent {}

// Export Array
export const SIDEBAR_COMPONENTS = [
  SidebarLayoutComponent,
  SidebarComponent,
  SidebarTriggerComponent,
  SidebarItemComponent,
  SidebarHeaderComponent,
  SidebarFooterComponent,
  SidebarGroupLabelComponent,
  SidebarCollapsibleComponent,
] as const;
