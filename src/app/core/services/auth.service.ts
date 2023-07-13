import {Injectable} from '@angular/core';
import {User} from "@core/models/user";
import {BehaviorSubject, Observable, of, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(null);
  private isLoggedIn!: boolean;

  constructor(private router: Router) {
    if (this.getUserFromStorage()) {
      this.user$.next(JSON.parse(this.getUserFromStorage()!) as User);
    }

    if (this.getLoggedInFromStorage()) {
      this.isLoggedIn = Boolean(this.getLoggedInFromStorage());
    }
  }

  get isAuthorized(): boolean {
    return !!this.user$.value && this.isLoggedIn;
  }

  registration(user: User): Observable<boolean> {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isAuth', String(false));
    this.user$.next(user);

    return of(true);
  }

  getUser(): User | null | undefined {
    return this.user$.value;
  }

  private getUserFromStorage(): string | null {
    return localStorage.getItem('user');
  }

  private getLoggedInFromStorage(): string | null {
    return localStorage.getItem('isAuth');
  }

  login(user: User): Observable<boolean> {
    const currentUser = this.user$.value;

    if (user?.password === currentUser?.password && user?.email === currentUser?.email) {
      localStorage.setItem('isAuth', String(true));
      return of(true);
    }

    return throwError('Неверный логин или пароль');
  }

  logout(): void {
    this.user$.next(null);
    localStorage.removeItem('isAuth');
    this.router.navigate(['login'])
  }
}
