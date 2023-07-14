import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from "rxjs";
import {Post} from "@core/models/post";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "@core/services/post.service";

@Component({
  selector: 'rg-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostPageComponent {
  post$!: Observable<Post>

  constructor(private activateRoute: ActivatedRoute, private postService: PostService) {
    this.post$ = this.postService.getPostById(activateRoute.snapshot.params['id']);
  }
}
