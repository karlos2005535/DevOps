// File: src/app/services/auth.service.mock.ts
export class AuthServiceMock {
  private users = [
    { username: 'admin', password: 'admin123' },
    { username: 'user', password: 'user123' },
  ];

  private currentUser: any = null;

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
    return true;
  }

  logout(): void {
    this.currentUser = null;
  }
}
