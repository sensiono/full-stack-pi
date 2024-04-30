import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;

  constructor(
    private service: AuthServiceService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }
  submitForm() {
    this.service.login(this.loginForm.value).subscribe((response) => {
      console.log(response);
      if (response.access_token) {
        console.log('JWT Token:', response.access_token); // Check the value of JWT token
        const jwtToken = response.access_token;
        localStorage.setItem('jwt', jwtToken);
        this.router.navigateByUrl('/');
      }
    });
  }
  isLoggedIn(): boolean {
    // Check if user is logged in by verifying if JWT token exists in local storage
    return localStorage.getItem('jwt') !== null;
  }

}
