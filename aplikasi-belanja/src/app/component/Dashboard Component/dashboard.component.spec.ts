// src/app/components/dashboard/dashboard.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    // Create spies
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

    // Setup spy returns
    authServiceSpy.isLoggedIn.and.returnValue(true);
    authServiceSpy.getCurrentUser.and.returnValue({ username: 'testuser' });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get current user on init', () => {
    expect(component.currentUser).toEqual({ username: 'testuser' });
  });

  it('should navigate to login if not logged in', () => {
    authServiceSpy.isLoggedIn.and.returnValue(false);

    // Re-create component dengan kondisi baru
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.ngOnInit();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should call logout method', () => {
    component.logout();
    expect(authServiceSpy.logout).toHaveBeenCalled();
  });
});
