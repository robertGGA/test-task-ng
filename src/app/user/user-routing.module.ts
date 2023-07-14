import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {PostsComponent} from "@user/posts/posts.component";
import {PostPageComponent} from "@user/post-page/post-page.component";

const routes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: ':id',
    component: PostPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {
}
