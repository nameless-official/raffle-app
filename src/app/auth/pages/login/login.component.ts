import { Component, ElementRef, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { InputSwitchOnChangeEvent } from 'primeng/inputswitch';
import { getFieldError, isValidField } from 'src/app/shared/utils/forms-validators.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @ViewChild('inputPassword') inputPassword: ElementRef

  private formBuilder = inject(FormBuilder)
  private authService = inject(AuthService)
  private router = inject(Router)


  protected formData: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(8)]]
  })

  login(): void {
    const { username, password } = this.formData.value
    this.authService.login(username, btoa(password)).subscribe({
      next: () => this.router.navigateByUrl('/admin'),
    })
  }

  onChangePasswordType(eventChangeInputPassword: InputSwitchOnChangeEvent): void {
    if (eventChangeInputPassword.checked) {
      this.inputPassword.nativeElement.type = 'text'
      return
    }
    this.inputPassword.nativeElement.type = 'password'
  }

  verifyValidatedField(field: string): boolean | null {
    return isValidField(field, this.formData);
  }

  getMessageErrorByField(field: string): string | null {
    return getFieldError(field, this.formData);
  }
}
