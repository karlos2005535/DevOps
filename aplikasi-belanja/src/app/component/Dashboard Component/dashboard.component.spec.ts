[file name]: src/app/components/dashboard/dashboard.component.spec.ts
[file content begin]
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceMock: Partial<AuthService>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    authServiceMock = {
      isLoggedIn: jest.fn(),
      getCurrentUser: jest.fn(),
      logout: jest.fn()
    };
    
    routerMock = {
      navigate: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
  });

  const setupLoggedInUser = () => {
    (authServiceMock.isLoggedIn as jest.Mock).mockReturnValue(true);
    (authServiceMock.getCurrentUser as jest.Mock).mockReturnValue({ username: 'testuser' });
    fixture.detectChanges();
  };

  it('should create the component', () => {
    setupLoggedInUser();
    expect(component).toBeTruthy();
  });

  it('should display the correct brand name "Warung Serba Ada"', () => {
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

  it('should navigate to login if not logged in', () => {
    (authServiceMock.isLoggedIn as jest.Mock).mockReturnValue(false);
    component.ngOnInit();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call logout service and navigate to login when logout button is clicked', () => {
    setupLoggedInUser();

    // Cari tombol logout
    const logoutBtn = fixture.debugElement.query(By.css('.btn-logout'));
    
    // Simulasikan klik
    logoutBtn.triggerEventHandler('click', null);

    // Pastikan method authService.logout dipanggil
    expect(authServiceMock.logout).toHaveBeenCalled();

    // Pastikan router mengarahkan ke '/login'
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should initialize with currentUser from auth service', () => {
    (authServiceMock.isLoggedIn as jest.Mock).mockReturnValue(true);
    (authServiceMock.getCurrentUser as jest.Mock).mockReturnValue({ username: 'admin' });
    
    component.ngOnInit();
    
    expect(component.currentUser).toEqual({ username: 'admin' });
  });
});
[file content end]