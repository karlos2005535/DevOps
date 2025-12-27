import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  onPasswordInput(): void {
    // Logika real-time validation
  }

  isFormValid(): boolean {
    return (
      this.username.trim() !== '' &&
      this.password.trim() !== '' &&
      this.confirmPassword.trim() !== '' &&
      this.password === this.confirmPassword &&
      this.password.length >= 3
    );
  }

  register(event?: Event): void {
    if (event) event.preventDefault();

    if (!this.isFormValid()) {
      alert('Mohon lengkapi data dengan benar!');
      return;
    }

    const success = this.authService.register(this.username, this.password);

    if (success) {
      alert('Registrasi berhasil! Silakan login.');
      this.router.navigate(['/login']);
    } else {
      alert('Username sudah digunakan! Silakan pilih username lain.');
    }
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  getPasswordStrength(): string {
    if (!this.password) return 'weak';
    if (this.password.length < 4) return 'weak';
    if (this.password.length < 8) return 'medium';
    return 'strong';
  }

  getPasswordMatchClass(): string {
    if (!this.confirmPassword) return 'empty';
    return this.password === this.confirmPassword ? 'match' : 'mismatch';
  }

  getPasswordMatchText(): string {
    if (!this.confirmPassword) return 'Harap konfirmasi password Anda';
    return this.password === this.confirmPassword ? 'Password cocok' : 'Password tidak cocok';
  }
}
