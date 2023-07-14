import {ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {emailRegex} from "@core/utils/form-helper";
import {AuthService} from "@core/services/auth.service";
import {User} from "@core/models/user";
import {DestroyService} from "@core/services/destroy.service";
import {catchError, takeUntil, throwError} from "rxjs";

@Component({
  selector: 'rg-login-page',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class LoginPageComponent implements OnInit {

  loginGroup!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroy$ = inject(DestroyService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.loginGroup = this.fb.group({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(emailRegex)
      ]),
      password: new FormControl<string>('', [
        Validators.required
      ])
    })
  }

  onSubmit(): void {
    this.authService.login(this.loginGroup.value as User)
      .pipe(
        takeUntil(this.destroy$),
        catchError(err => throwError(err))
      ).subscribe(() => {
        console.log('navigated')
      this.router.navigateByUrl('/posts');
    }, err => {
      this.loginGroup.setErrors({
        'pseudoServerError': err
      });
    })
  }

  get emailControl(): AbstractControl {
    return this.loginGroup.get('email')!;
  }

  get passwordControl(): AbstractControl {
    return this.loginGroup.get('password')!;
  }

  get hasNoErrors(): boolean {
    return !(!this.passwordControl.errors && !this.emailControl.errors)
  }
}
