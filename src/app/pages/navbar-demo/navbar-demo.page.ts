import { Component } from '@angular/core';
import { ButtonComponent } from '@wdcoders/ui-ng/button/button.component';
import { IconComponent } from '@wdcoders/ui-ng/icon/icon.component';
import { NAVBAR_COMPONENTS } from '@wdcoders/ui-ng/navbar/navbar.component';

@Component({
  selector: 'wdc-navbar-demo',
  imports: [NAVBAR_COMPONENTS, ButtonComponent, IconComponent],
  templateUrl: './navbar-demo.page.html',
  styleUrl: './navbar-demo.page.css',
})
export class NavbarDemoPage {}
