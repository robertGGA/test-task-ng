import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "@shared/components/ui/header/header.component";

@Component({
  selector: 'rg-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutComponent {

}
