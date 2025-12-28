[file name]: src/main.ts
[file content begin]
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', loadComponent: () => import('./app/components/login/login.component').then(m => m.LoginComponent) },
      { path: 'register', loadComponent: () => import('./app/components/register/register.component').then(m => m.RegisterComponent) },
      { path: 'dashboard', loadComponent: () => import('./app/components/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: '**', redirectTo: '/login' }
    ])
  ]
}).catch(err => console.error(err));
[file content end]