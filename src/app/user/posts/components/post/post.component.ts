import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Post} from "@core/models/post";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'rg-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent {
  @Input() post!: Post;
}
