import {Injectable} from '@angular/core';
import {User} from "@core/models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user: User | undefined | null;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user') ?? '') as User | null;
  }

  get isAuth(): boolean {
    console.log(this.user);
    return !!this.user;
  }

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }

  getUser(): User | null | undefined {
    return this.user;
  }
}
