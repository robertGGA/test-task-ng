import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Post} from "@core/models/post";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {
  }

  getAllPosts(): Observable<Array<Post>> {
    return this.http.get<Array<Post>>(this.url + '/posts');
  }

  getPostById(id: number): Observable<Post> {
    return this.http.get<Post>(this.url + `/posts/${id}`);
  }
}
