import {Injectable} from '@angular/core';
import {User} from "@core/models/user";
import {BehaviorSubject, merge, mergeMap, Observable, of, throwError, zip} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user$: BehaviorSubject<User | null | undefined> = new BehaviorSubject<User | null | undefined>(null);
  isLoggedIn$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
    this.user$.next(this.parsedUserFromStore());

    if (this.getLoggedInFromStorage()) {
      this.isLoggedIn$.next(Boolean(this.getLoggedInFromStorage()));
    }
  }
  get isAuthorized(): boolean {
    return !!this.user$.value && this.isLoggedIn$.value;
  }
  get isAuthorized$(): Observable<boolean> {
    return this.user$.asObservable().pipe(mergeMap(() => this.isLoggedIn$.asObservable()))
  }

  registration(user: User): Observable<boolean> {
    localStorage.setItem('user', JSON.stringify(user));
    this.user$.next(user);
    return of(true);
  }

  getUser(): User | null | undefined {
    return this.user$.value;
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
      this.user$.next(currentUser);
      return of(true);
    }

    return throwError('Неверный логин или пароль');
  }

  logout(): void {
    this.user$.next(null);
    this.isLoggedIn$.next(false);
    localStorage.removeItem('isAuth');
    this.router.navigate(['login'])
  }
}
