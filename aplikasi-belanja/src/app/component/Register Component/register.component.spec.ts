import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  // Definisi tipe Mock untuk Jest agar TypeScript mengenali method-nya
  let authServiceSpy: { isLoggedIn: jest.Mock; register: jest.Mock };
  let routerSpy: { navigate: jest.Mock };

  beforeEach(async () => {
    // 1. Setup Mock menggunakan jest.fn() pengganti jasmine.createSpyObj
    authServiceSpy = {
      isLoggedIn: jest.fn(),
      register: jest.fn(),
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

    // Catatan: Saya menghapus fixture.detectChanges() dari sini
    // agar kita bisa mengatur nilai mock 'isLoggedIn' sebelum ngOnInit berjalan otomatis.
  });

  it('should create', () => {
    fixture.detectChanges(); // Jalankan inisialisasi komponen di sini
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard if already logged in', () => {
    // 2. Gunakan mockReturnValue (Syntax Jest)
    // Set user seolah-olah sudah login SEBELUM komponen dimulai
    authServiceSpy.isLoggedIn.mockReturnValue(true);

    // Trigger deteksi perubahan (ini akan menjalankan ngOnInit)
    fixture.detectChanges();

    // Cek apakah router melakukan navigasi
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
