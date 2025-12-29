// HANYA ini
import 'jest-preset-angular/setup-jest';

// Mock sederhana
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
  value: '<!DOCTYPE html>',
});
