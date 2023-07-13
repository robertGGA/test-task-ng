import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  Validators
} from "@angular/forms";
import {emailRegex} from "@core/utils/form-helper";
import {MatButtonModule} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "@core/services/auth.service";
import {User} from "@core/models/user";
import {DestroyService} from "@core/services/destroy.service";
import {takeUntil} from "rxjs";

@Component({
  selector: 'rg-reg-page',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, MatButtonModule, RouterLink],
  templateUrl: './reg-page.component.html',
  styleUrls: ['./reg-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService]
})
export class RegPageComponent implements OnInit {
  regGroup!: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private destroy$ = inject(DestroyService);

  ngOnInit(): void {
    this.regGroup = this.fb.group({
      email: new FormControl<string>('', [
        Validators.required,
        Validators.pattern(emailRegex),
        Validators.minLength(5)
      ]),
      password: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(5)
      ]),
      repeatPassword: new FormControl<string>('', [
        Validators.required,
      ])
    });
    this.regGroup.addValidators(this.checkRepeatedPasswordValidator);
  }

  onSubmit(): void {
    const user: User = {
      email: this.emailControl.value,
      password: this.passwordControl.value
    } as User;
    this.authService.registration(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => {
          if (value) {
            this.router.navigate(['/login'])
          }
        }
      )
  }

  get emailControl(): AbstractControl {
    return this.regGroup.get('email')!;
  }

  get passwordControl(): AbstractControl {
    return this.regGroup.get('password')!;
  }

  get repeatPasswordControl(): AbstractControl {
    return this.regGroup.get('repeatPassword')!;
  }

  get hasNoErrors(): boolean {
    return !(!this.passwordControl.errors && !this.emailControl.errors && !this.isPasswordsSame)
  }

  get isPasswordsSame(): boolean {
    console.log(this.regGroup.errors?.['notSame']);
    return this.regGroup.errors?.['notSame'];
  }

  private checkRepeatedPasswordValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password');
    const repeatPassword = group.get('repeatPassword');
    return password?.value === repeatPassword?.value ? null : {'notSame': true}
  }
}
