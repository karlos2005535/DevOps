// Deklarasi global untuk Angular testing
declare module '@angular/core/testing' {
  export class TestBed {
    static configureTestingModule(config: any): any;
    static createComponent(component: any): any;
    static inject(token: any): any;
  }

  export interface ComponentFixture<T> {
    componentInstance: T;
    nativeElement: HTMLElement;
    debugElement: any;
    detectChanges(): void;
  }
}
