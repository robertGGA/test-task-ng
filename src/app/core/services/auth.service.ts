import {Injectable} from '@angular/core';
import {User} from "@core/models/user";
import {BehaviorSubject, map, Observable, of, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User | null | undefined = null;
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.user = this.parsedUserFromStore();

    if (this.getLoggedInFromStorage()) {
      this.isLoggedIn$.next(Boolean(this.getLoggedInFromStorage()));
    }
  }

  get isAuthorized(): boolean {
    return !!this.user && this.isLoggedIn$.value;
  }

  get isAuthorized$(): Observable<boolean> {
    return this.isLoggedIn$.asObservable().pipe(map(isAuth => Boolean(isAuth && this.user)))
  }

  registration(user: User): Observable<boolean> {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    return of(true);
  }

  private getUserFromStorage(): string | null {
    return localStorage.getItem('user');
  }

  private parsedUserFromStore(): User | null {
    if (this.getUserFromStorage()) {
      return JSON.parse(this.getUserFromStorage()!) as User;
    }
    return null;
  }


  private getLoggedInFromStorage(): string | null {
    return localStorage.getItem('isAuth');
  }

  login(user: User): Observable<boolean> {
    const currentUser = this.parsedUserFromStore();
    if (user?.password === currentUser?.password && user?.email === currentUser?.email) {
      localStorage.setItem('isAuth', String(true));
      this.isLoggedIn$.next(true);
      this.user = currentUser;
      return of(true);
    }

    return throwError('Неверный логин или пароль');
  }

  logout(): void {
    this.user = null;
    this.isLoggedIn$.next(false);
    localStorage.removeItem('isAuth');
    this.router.navigate(['login'])
  }
}
