import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'login',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    // Jangan detectChanges dulu di sini jika kita ingin mengetes kondisi awal berbeda
  });

  it('should create', () => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display "Warung Serba Ada" as store name', () => {
    fixture.detectChanges();
    const storeName = fixture.debugElement.query(By.css('.store-name'));
    expect(storeName.nativeElement.textContent).toContain('Warung Serba Ada');
  });

  it('should display tagline "Apapun yang kamu cari pasti ada"', () => {
    fixture.detectChanges();
    const tagline = fixture.debugElement.query(By.css('.store-tagline'));
    expect(tagline.nativeElement.textContent).toContain(
      'Apapun yang kamu cari pasti ada'
    );
  });

  it('should redirect to dashboard if already logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    component.ngOnInit(); // Manual trigger ngOnInit
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should call login method when form is submitted with valid data', () => {
    fixture.detectChanges();
    authServiceSpy.isLoggedIn.and.returnValue(false);
    authServiceSpy.login.and.returnValue(true);

    component.username = 'testuser';
    component.password = 'password123';

    // Simulate form submit
    const form = fixture.debugElement.query(By.css('form'));
    form.triggerEventHandler('submit', null);

    expect(authServiceSpy.login).toHaveBeenCalledWith(
      'testuser',
      'password123'
    );
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not call login service if fields are empty', () => {
    fixture.detectChanges();
    spyOn(window, 'alert'); // Mock alert agar tidak muncul popup saat test

    component.username = '';
    component.password = '';

    component.login();

    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalled();
  });
});
