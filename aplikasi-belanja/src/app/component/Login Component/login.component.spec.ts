import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  // Gunakan Partial atau tipe Jest Mock
  let authServiceSpy: { isLoggedIn: jest.Mock; login: jest.Mock };
  let routerSpy: { navigate: jest.Mock };

  beforeEach(async () => {
    // Setup Mock style Jest
    authServiceSpy = {
      isLoggedIn: jest.fn(),
      login: jest.fn(),
    };
    routerSpy = {
      navigate: jest.fn(),
    };

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

  // ... test UI lainnya sama ...

  it('should redirect to dashboard if already logged in', () => {
    authServiceSpy.isLoggedIn.mockReturnValue(true); // Syntax Jest
    component.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should call login method when form is submitted', () => {
    fixture.detectChanges();
    authServiceSpy.isLoggedIn.mockReturnValue(false);
    authServiceSpy.login.mockReturnValue(true);

    component.username = 'testuser';
    component.password = 'password123';

    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(authServiceSpy.login).toHaveBeenCalledWith(
      'testuser',
      'password123'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
