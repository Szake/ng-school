import { Component } from '@angular/core';

import { titleIn, contentIn } from '../../animations/content';

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ],
  animations: [ titleIn, contentIn ]
})

export class DashboardComponent {
  title = 'Dashboard';
  slides = [
    {
      title: 'Slide #1',
      descr: 'Some text...',
      state: 'slide-1'
    },
    {
      title: 'Slide #2',
      descr: 'Some text...',
      state: 'slide-2'
    },
    {
      title: 'Slide #3',
      descr: 'Some text...',
      state: 'slide-3'
    },
    {
      title: 'Slide #4',
      descr: 'Some text...',
      state: 'slide-4'
    },
    {
      title: 'Slide #5',
      descr: 'Some text...',
      state: 'slide-5'
    }
  ];
}
