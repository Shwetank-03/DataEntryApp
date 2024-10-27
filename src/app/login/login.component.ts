import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;

      this.http.get<any>('http://localhost:3000/signup').subscribe(
        (res) => {
          const user = res.find((a: any) => {
            return a.email === email && a.password === password;
          });

          if (user) {
            alert('Successfully logged in');
            this.loginForm.reset();
            this.router.navigate(['student']);
          } else {
            alert('User not found with these credentials');
          }
        },
        (err) => {
          alert('Something went wrong');
        }
      );
    } else {
      // Handle form validation errors
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.get(key)?.markAsTouched();
      });
    }
  }
}
