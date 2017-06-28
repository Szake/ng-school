import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { headerIn, footerIn } from './animations/content';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [ headerIn, footerIn ]
})
export class AppComponent implements OnInit {
  title = 'School';
  loading = true;

  controls = true;

  constructor(
    private router: Router,
  ) {
    router.events.subscribe((state) => {
      this.controls = !~['/', '/dashboard'].indexOf(state['url']);
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
