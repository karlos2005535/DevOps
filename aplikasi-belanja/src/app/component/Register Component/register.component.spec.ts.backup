import 'zone.js';
import 'zone.js/testing';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  let authServiceSpy: {
    isLoggedIn: jest.Mock;
    register: jest.Mock;
    login?: jest.Mock; // Optional jika diperlukan
  };
  let routerSpy: { navigate: jest.Mock };

  beforeEach(async () => {
    authServiceSpy = {
      isLoggedIn: jest.fn(() => false),
      register: jest.fn(() => true),
    };

    routerSpy = {
      navigate: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call register service and navigate to login on success', () => {
    // Setup
    component.username = 'newuser';
    component.password = 'password123';
    component.confirmPassword = 'password123';
    fixture.detectChanges();

    // Action
    component.register();

    // Assert
    expect(authServiceSpy.register).toHaveBeenCalledWith(
      'newuser',
      'password123'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should show alert when passwords do not match', () => {
    // Setup
    component.username = 'newuser';
    component.password = 'password123';
    component.confirmPassword = 'different';
    fixture.detectChanges();

    // Spy on alert
    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

    // Action
    component.register();

    // Assert
    expect(alertSpy).toHaveBeenCalledWith('Mohon lengkapi data dengan benar!');
    expect(authServiceSpy.register).not.toHaveBeenCalled();

    alertSpy.mockRestore();
  });

  it('should navigate to login when goToLogin is called', () => {
    component.goToLogin();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
