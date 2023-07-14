import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LayoutComponent} from "@shared/components/ui/layout/layout.component";
import {LoginPageComponent} from "@public/login-page/login-page.component";
import {RegPageComponent} from "@public/reg-page/reg-page.component";
import {authGuard} from "@core/guards/auth.guard";
import {nonAuthGuard} from "@core/guards/non-auth.guard";

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
        component: LoginPageComponent,
        canActivate: [nonAuthGuard]
      },
      {
        path: 'registration',
        component: RegPageComponent,
        canActivate: [nonAuthGuard]
      },
      {
        path: 'posts',
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
