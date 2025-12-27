import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: any = null;
  private users: { username: string; password: string }[] = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' },
  ];

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      this.currentUser = { username: user.username };
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
      return true;
    }
    return false;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUser = JSON.parse(user);
    }
    return !!this.currentUser;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  register(username: string, password: string): boolean {
    // Cek jika username sudah ada
    if (this.users.find((u) => u.username === username)) {
      return false;
    }

    // Tambah user baru
    this.users.push({ username, password });
    return true;
  }
}
