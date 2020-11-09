import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { PxbAuthConfig, PXB_AUTH_CONFIG } from '../../config/auth-config';
import { LOGIN_ROUTE } from '../../config/route-names';
import { PxbAuthUIActionsService, PxbSecurityService } from '../..';

class CrossFieldErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

@Component({
    selector: 'pxb-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss'],
})
export class PxbResetPasswordComponent implements OnInit {
    @Input() email = 'testemail@email.com';
    @Input() successTitle = 'Your password was successfully reset.';
    @Input() code: string = '';
    @Input() successDescription =
        "Your password was successfully updated! To ensure your account's security, you will need to log in to the application with your updated credentials.";
    passwordResetSuccess = false;
    passwordFormGroup: FormGroup;
    newPasswordVisible = false;
    confirmPasswordVisible = false;
    errorMatcher = new CrossFieldErrorMatcher();
    passLength = false;
    specialFlag = false;
    numberFlag = false;
    upperFlag = false;
    lowerFlag = false;
    isLoading = false;

    constructor(
        @Inject(PXB_AUTH_CONFIG) private readonly _config: PxbAuthConfig,
        private readonly _router: Router,
        private readonly _pxbAuthUIActionsService: PxbAuthUIActionsService,
        private readonly _securityService: PxbSecurityService,
        private readonly _formBuilder: FormBuilder
    ) {
        this.passwordFormGroup = this._formBuilder.group(
            {
                newPassword: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
                confirmPassword: ['', Validators.required],
            },
            {
                validator: this.checkPasswords,
            }
        );
    }

    ngOnInit(): void {}

    toggleNewPasswordVisibility(): void {
        this.newPasswordVisible = !this.newPasswordVisible;
    }

    toggleConfirmPasswordVisibility(): void {
        this.confirmPasswordVisible = !this.confirmPasswordVisible;
    }

    checkPasswordStrength(password: string): void {
        this.passLength = /^.{8,16}$/.test(password);
        this.specialFlag = /[!"#$%&'()*+,-./:;<=>?@[\]^`{|}~]+/.test(password);
        this.numberFlag = /[0-9]/.test(password);
        this.upperFlag = /[A-Z]/.test(password);
        this.lowerFlag = /[a-z]/.test(password);
    }

    checkPasswords(group: FormGroup): any {
        const pass = group.get('newPassword').value;
        const confirmPass = group.get('confirmPassword').value;
        return pass === confirmPass ? null : { passwordsDoNotMatch: true };
    }

    isPasswordGroupValid(): boolean {
        return (
            this.passwordFormGroup.get('newPassword').value &&
            this.passLength &&
            this.specialFlag &&
            this.numberFlag &&
            this.upperFlag &&
            this.lowerFlag &&
            this.passwordFormGroup.get('confirmPassword').value &&
            this.passwordFormGroup.valid
        );
    }

    done(): void {
        this.navigateToLogin();
        this.passwordResetSuccess = false;
        this.passwordFormGroup.reset();
    }

    navigateToLogin(): void {
        void this._router.navigate([`${this._config.authRoute}/${LOGIN_ROUTE}`]);
    }

    // TODO: How should the email and code be supplied to this service?
    // Two options, via securityService, Input variables, or should we parse URL (assuming info is supplied).
    resetPassword(): void {
        const password = this.passwordFormGroup.value.confirmPassword;
        this.isLoading = true;
        this._pxbAuthUIActionsService
            .setPassword(this.code, password, this.email)
            .then(() => {
                console.log('reset password success');
                this.passwordResetSuccess = true;
            })
            .catch(() => {
                console.log('reset password failed');
            })
            .then(() => {
                this.isLoading = false;
            });
    }
}
