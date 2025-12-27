import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service'; // PERBAIKI DARI '../../services/auth.service'

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login(): void {
    if (!this.username.trim() || !this.password.trim()) {
      alert('Username dan password harus diisi!');
      return;
    }

    const success = this.authService.login(this.username, this.password);

    if (success) {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Login gagal! Username atau password salah.');
    }
  }

  goToRegister(): void {
    this.router.navigate(['/register']);
  }
}
