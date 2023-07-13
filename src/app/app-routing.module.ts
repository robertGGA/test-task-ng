import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "@shared/components/ui/layout/layout.component";
import {LoginPageComponent} from "@public/login-page/login-page.component";
import {RegPageComponent} from "@public/reg-page/reg-page.component";
import {authGuard} from "@core/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login'
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'registration',
        component: RegPageComponent
      },
      {
        path: 'profile',
        loadChildren: () => import('@app/user/user.module').then(m => m.UserModule),
        canActivate: [authGuard]
      }
    ]
  },
  {
    path: "**",
    pathMatch: 'full',
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
