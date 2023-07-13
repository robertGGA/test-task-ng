import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rg-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent {

}
