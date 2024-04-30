import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private router: Router,
    private service: AuthServiceService,
    private fb: FormBuilder

  ) {}
  navigateToAddReclamation(event: Event): void {
    event.preventDefault(); // Prevent default link behavior
    this.router.navigate(['/ajouter-reclamation']); // Navigate programmatically
  }

  registerForm: FormGroup | any;
  
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', [Validators.required]],
      lastname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]], // Initialize with Validators
      password: ['', [Validators.required]], // Initialize with Validators
      rememberMe: [false], // Example checkbox field

    }, )
  }
  submitForm() {
    console.log(this.registerForm.value);
    this.service.register(this.registerForm.value).subscribe(
      (response) => {
        if (response.id != null) {
          alert("Hello " + response.firstname);
        }
      }
    )
  }


  //Login

  loginForm: FormGroup | any;


  
  LogForm() {
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

}
