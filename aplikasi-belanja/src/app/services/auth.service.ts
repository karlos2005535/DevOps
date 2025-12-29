import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly STORAGE_KEY = 'aplikasi_belanja_users';
  private readonly CURRENT_USER_KEY = 'current_user';
  private users: Array<{ username: string; password: string }> = [];
  private currentUser: any = null;

  constructor() {
    this.loadUsersFromStorage();
    this.loadCurrentUser();
  }

  private loadUsersFromStorage(): void {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    this.users = stored
      ? JSON.parse(stored)
      : [
          { username: 'admin', password: 'admin123' },
          { username: 'user', password: 'user123' },
        ];
  }

  private loadCurrentUser(): void {
    const stored = localStorage.getItem(this.CURRENT_USER_KEY);
    this.currentUser = stored ? JSON.parse(stored) : null;
  }

  private saveUsers(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
  }

  private saveCurrentUser(): void {
    if (this.currentUser) {
      localStorage.setItem(
        this.CURRENT_USER_KEY,
        JSON.stringify(this.currentUser)
      );
    } else {
      localStorage.removeItem(this.CURRENT_USER_KEY);
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  getCurrentUser(): any {
    return this.currentUser;
  }

  login(username: string, password: string): boolean {
    const user = this.users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      this.currentUser = { username: user.username };
      this.saveCurrentUser();
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {
    // Cek jika username sudah ada
    if (this.users.some((u) => u.username === username)) {
      return false;
    }

    this.users.push({ username, password });
    this.saveUsers();
    return true;
  }

  logout(): void {
    this.currentUser = null;
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
}
