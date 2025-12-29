// --- WAJIB ADA DI PALING ATAS ---
import 'zone.js';
import 'zone.js/testing';
// -------------------------------

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component'; // Import relatif aman meski folder ada spasi
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: { login: jest.Mock; isLoggedIn: jest.Mock };
  let routerSpy: { navigate: jest.Mock };

  beforeEach(async () => {
    authServiceSpy = { login: jest.fn(), isLoggedIn: jest.fn() };
    routerSpy = { navigate: jest.fn() };

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  // Test sederhana untuk memastikan jalan
  it('should redirect if logged in', () => {
    authServiceSpy.isLoggedIn.mockReturnValue(true);
    fixture.detectChanges();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
