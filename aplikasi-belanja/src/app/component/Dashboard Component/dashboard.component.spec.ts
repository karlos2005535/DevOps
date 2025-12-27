import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    authServiceSpy = jasmine.createSpyObj('AuthService', [
      'isLoggedIn',
      'getCurrentUser',
      'logout',
    ]);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  const setupLoggedInUser = () => {
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getCurrentUser.and.returnValue({ username: 'testuser' });
    fixture.detectChanges();
  };

  it('should create the app', () => {
    setupLoggedInUser();
    expect(component).toBeTruthy();
  });

  it('should render the correct brand name "Warung Serba Ada"', () => {
    setupLoggedInUser();
    const brandElement = fixture.debugElement.query(
      By.css('.brand span:last-child')
    );
    expect(brandElement.nativeElement.textContent).toContain(
      'Warung Serba Ada'
    );
  });

  it('should display the correct tagline in photo caption', () => {
    setupLoggedInUser();
    const captionElement = fixture.debugElement.query(
      By.css('.photo-caption p')
    );
    expect(captionElement.nativeElement.textContent).toContain(
      'Apapun yang kamu cari pasti ada'
    );
  });

  it('should display username in welcome section', () => {
    setupLoggedInUser();
    const welcomeH1 = fixture.debugElement.query(By.css('.welcome-section h1'));
    expect(welcomeH1.nativeElement.textContent).toContain(
      'Selamat Datang, testuser!'
    );
  });

  it('should navigate to login if not logged in (Guard Check)', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);
    component.ngOnInit();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  // UPDATE PADA BAGIAN INI
  it('should call logout service and navigate to login when logout button is clicked', () => {
    setupLoggedInUser();

    // 1. Cari tombol logout
    const logoutBtn = fixture.debugElement.query(By.css('.btn-logout'));

    // 2. Simulasikan klik
    logoutBtn.triggerEventHandler('click', null);

    // 3. Pastikan method authService.logout dipanggil
    expect(authServiceSpy.logout).toHaveBeenCalled();

    // 4. Pastikan router mengarahkan ke '/login'
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });
});
