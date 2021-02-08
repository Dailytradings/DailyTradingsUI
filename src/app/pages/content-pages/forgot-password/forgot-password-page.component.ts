import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'app/shared/auth/auth.service';

@Component({
    selector: 'app-forgot-password-page',
    templateUrl: './forgot-password-page.component.html',
    styleUrls: ['./forgot-password-page.component.scss']
})

export class ForgotPasswordPageComponent {
    forgotPassFormSubmitted = false;
    forgotPasswordForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.email]),
          });
    constructor(private router: Router,
        private route: ActivatedRoute,
        private authService: AuthService) { }

        get fpf() {
            return this.forgotPasswordForm.controls;
          }

    // On submit click, reset form fields
    onSubmit() {
        this.forgotPassFormSubmitted = true;
        console.log("submit");
        if (this.forgotPasswordForm.invalid) {
            console.error("form not valid");
            return;
          }
          this.authService.forgotPass(this.forgotPasswordForm.value.email).subscribe(res =>{
            if(res)
               this.onLogin(); 
          });
    }

    // On login link click
    onLogin() {
        this.router.navigate(['login'], { relativeTo: this.route.parent });
    }

    // On registration link click
    onRegister() {
        this.router.navigate(['register'], { relativeTo: this.route.parent });
    }
}
