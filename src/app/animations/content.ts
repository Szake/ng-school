import { trigger, state, keyframes, style, animate, transition } from '@angular/animations';

// Header:
export const headerIn = trigger('headerIn', [
  state('in', style({
    transform: 'translateY(0)'
  })),
  state('void', style({
    transform: 'translateY(-100%)'
  })),
  transition('* => *', animate('200ms ease-in-out'))
]);

// Title:
export const titleIn = trigger('titleIn', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  state('void', style({
    opacity: 0,
    transform: 'translateX(-100px)'
  })),
  transition('void => in', animate('200ms 300ms ease-out'))
]);

// Breadcrumbs:
export const breadcrumbsIn = trigger('breadcrumbsIn', [
  state('in', style({
    opacity: 1,
    transform: 'translateX(0)'
  })),
  state('void', style({
    opacity: 0,
    transform: 'translateX(-100px)'
  })),
  transition('void => in', animate('200ms 500ms ease-out'))
]);

// Table:
export const contentIn = trigger('contentIn', [
  state('in', style({
    opacity: 1,
    transform: 'translateY(0)'
  })),
  state('void', style({
    opacity: 0,
    transform: 'translateY(80px)'
  })),
  transition('void => in', animate('500ms ease-out'))
]);

// Footer:
export const footerIn = trigger('footerIn', [
  state('in', style({
    transform: 'translateY(0)'
  })),
  state('void', style({
    transform: 'translateY(100%)'
  })),
  transition('* => *', animate('200ms ease-in-out'))
]);
