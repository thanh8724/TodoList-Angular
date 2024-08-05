import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../../services/services.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule, RouterLink, HttpClientModule, IonicModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  accounts: any = [];
  accountExits: boolean = true;
  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router, private http: HttpClient) {
    this.dataService.setApiUrl('http://localhost:3080/accounts');
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(36)]]
    });
  }
  ngOnInit(): void {
    this.dataService.getItems().subscribe((data: any) => {
      this.accounts = data.personnel;
    });
  }
  changeTypeMessageSubmit() {
    this.accountExits = true;
  }
  onSubmit() {
    const email: HTMLInputElement | null = document.querySelector('#inputEmail');
    const password: HTMLInputElement | null = document.querySelector('#inputPassword');
    this.accountExits = this.accounts.some(
      (account: any) => account.email === email?.value && account.password === password?.value
    );
    if (this.loginForm.valid && this.accountExits) {
      this.http.post('http://localhost:3080/login', this.loginForm.value).subscribe(        
        (response) => {
          sessionStorage.setItem('role', (response as any).dataJWT.role);
          sessionStorage.setItem('jwt', (response as any).token);
          if((response as any).dataJWT.role == "1") {
            window.location.href = "http://localhost:4200";
          }else {
            window.location.href = "http://localhost:4200/personnels";
          }
        },
        (error) => {
          console.error('Error logging in:', error);
        }
      );
    }
  }
  toggleShowPassword(clickedIcon: any): void {
    const input = clickedIcon.parentElement.querySelector('input');
    input.type = input.type === 'password' ? 'text' : 'password';
    clickedIcon.querySelectorAll("ion-icon").forEach((icon: any) => {
      icon.classList.toggle("eye-active");
    })
  }
}
