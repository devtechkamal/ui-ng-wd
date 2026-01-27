import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from '@wdcoders/ui-ng/button/button.component';
import { IconComponent } from '@wdcoders/ui-ng/icon/icon.component';
import { SIDEBAR_COMPONENTS } from '@wdcoders/ui-ng/sidebar/sidebar.component';

@Component({
  selector: 'wdc-admin',
  imports: [RouterOutlet, SIDEBAR_COMPONENTS, ButtonComponent, IconComponent],
  templateUrl: './admin.layout.html',
  styleUrl: './admin.layout.css',
})
export class AdminLayout {}

// import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { SIDEBAR_COMPONENTS } from '../ui/sidebar/sidebar.component';
// import { ButtonComponent } from '../ui/button/button.component'; // For logout button

// @Component({
//   selector: 'app-admin-layout',
//   standalone: true,
//   imports: [RouterOutlet, SIDEBAR_COMPONENTS, ButtonComponent],
//   template: ``,
// })
// export class AdminLayoutComponent {}
