import {ChangeDetectionStrategy, Component} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'rg-reg-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegPageComponent {

}
