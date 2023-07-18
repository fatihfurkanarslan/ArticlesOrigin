import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserAgreementComponent } from '../user-agreement/user-agreement.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  
  model: any = {};
  successMessage: string;
  errorMessage: string;

  form: FormGroup;

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private authService: AuthService) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      termsAgreed: [false, Validators.requiredTrue]
    });
  }


  ngOnInit() {
    document.body.classList.add('imageback');
  }

  ngOnDestroy() {
    document.body.classList.remove('imageback');
  }

  register() {

    this.authService.register(this.model).subscribe(result => {
      if (result != null){
        this.successMessage = 'Registration is successfull.<br/> Please check your email box to activate your account.';

      }else {
        this.errorMessage = 'Username or email is already taken.<br/> Please try another one.';
      }
    }, error => {console.log(error);
    });

  }

  openUserAgreement() {
    const dialogRef = this.dialog.open(UserAgreementComponent, {
      width: '80vw', height:'80vh'
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'accepted') {
        this.form.controls['termsAgreed'].setValue(true);
      }
    });
  }

}
