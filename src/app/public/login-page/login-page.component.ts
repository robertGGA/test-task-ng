import {ChangeDetectionStrategy, Component, inject, OnInit,} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {emailRegex} from "@core/utils/form-helper";

@Component({
  selector: 'rg-login-page',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatButtonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {

  loginGroup!: FormGroup;
  private fb = inject(FormBuilder);

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
    console.log(this.loginGroup.value);
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
