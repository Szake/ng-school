import { trigger, state, keyframes, style, animate, transition } from '@angular/animations';

export const slideState = trigger('slideState', [
  // 'Fade' animation:
  state('fade-in-prev',  style({ zIndex: 1, opacity: 1 })),
  state('fade-in-next',  style({ zIndex: 1, opacity: 1 })),
  state('fade-out-prev', style({ zIndex: 0, opacity: 0 })),
  state('fade-out-next', style({ zIndex: 0, opacity: 0 })),

  transition('fade-out-prev => fade-in-prev', animate('500ms ease')),
  transition('fade-out-next => fade-in-prev', animate('500ms ease')),
  transition('fade-out-prev => fade-in-next', animate('500ms ease')),
  transition('fade-out-next => fade-in-next', animate('500ms ease')),

  transition('fade-in-prev => fade-out-prev', animate('500ms ease')),
  transition('fade-in-next => fade-out-prev', animate('500ms ease')),
  transition('fade-in-prev => fade-out-next', animate('500ms ease')),
  transition('fade-in-next => fade-out-next', animate('500ms ease')),


  // 'Move' animation:
  state('move-in-prev',  style({ transform: 'translateX(0)' })),
  state('move-in-next',  style({ transform: 'translateX(0)' })),
  state('move-out-prev', style({ transform: 'translateX(-100%)' })),
  state('move-out-next', style({ transform: 'translateX(100%)' })),

  transition('move-out-prev => move-in-prev', [
    animate('500ms ease', keyframes([
      style({ transform: 'translateX(-100%)', offset: 0 }),
      style({ transform: 'translateX(0)', offset: 1 })
    ]))
  ]),
  transition('move-out-next => move-in-prev', [
    animate('500ms ease', keyframes([
      style({ transform: 'translateX(-100%)', offset: 0 }),
      style({ transform: 'translateX(0)', offset: 1 })
    ]))
  ]),
  transition('move-out-prev => move-in-next', [
    animate('500ms ease', keyframes([
      style({ transform: 'translateX(100%)', offset: 0 }),
      style({ transform: 'translateX(0)', offset: 1 })
    ]))
  ]),
  transition('move-out-next => move-in-next', [
    animate('500ms ease', keyframes([
      style({ transform: 'translateX(100%)', offset: 0 }),
      style({ transform: 'translateX(0)', offset: 1 })
    ]))
  ]),

  transition('move-in-prev => move-out-prev', [
    animate('500ms ease', keyframes([
      style({ transform: 'translateX(0)', offset: 0 }),
      style({ transform: 'translateX(100%)', offset: 1 })
    ]))
  ]),
  transition('move-in-next => move-out-prev', [
    animate('500ms ease', keyframes([
      style({ transform: 'translateX(0)', offset: 0 }),
      style({ transform: 'translateX(100%)', offset: 1 })
    ]))
  ]),
  transition('move-in-prev => move-out-next', [
    animate('500ms ease', keyframes([
      style({ transform: 'translateX(0)', offset: 0 }),
      style({ transform: 'translateX(-100%)', offset: 1 })
    ]))
  ]),
  transition('move-in-next => move-out-next', [
    animate('500ms ease', keyframes([
      style({ transform: 'translateX(0)', offset: 0 }),
      style({ transform: 'translateX(-100%)', offset: 1 })
    ]))
  ])
]);
