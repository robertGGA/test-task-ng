import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterLink} from "@angular/router";
import {AuthService} from "@core/services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'rg-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {

  authService = inject(AuthService); //Можно было конечно написать директиву на отображения контента, но ради отображение нескольких кнопок не стал
  auth$!: Observable<any>

  ngOnInit() {
    this.auth$ = this.authService.isAuthorized$

  }

  logout(): void {
    this.authService.logout();
  }
}
