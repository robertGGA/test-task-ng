import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {PostService} from "@core/services/post.service";
import {Observable} from "rxjs";
import {Post} from "@core/models/post";

@Component({
  selector: 'rg-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostsComponent {
  posts$: Observable<Array<Post>>

  constructor(private postService: PostService) {
    this.posts$ = postService.getAllPosts();
  }

}
