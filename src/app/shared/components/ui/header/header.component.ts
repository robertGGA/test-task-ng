import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {AuthService} from "@core/services/auth.service";

@Component({
  selector: 'rg-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  authService = inject(AuthService); //Можно было конечно написать директиву на отображения контента, но ради отображение нескольких кнопок не стал

  get isUserAuthorized(): boolean {
    return this.authService.isAuthorized;
  }

  logout(): void {
    this.authService.logout();
  }
}
