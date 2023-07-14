import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PostsComponent} from './posts/posts.component';
import {UserRoutingModule} from "@user/user-routing.module";
import {PostComponent} from "@user/posts/components/post/post.component";
import {PostPageComponent} from './post-page/post-page.component';


@NgModule({
  declarations: [
    PostsComponent,
    PostPageComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    PostComponent
  ]
})
export class UserModule {
}
