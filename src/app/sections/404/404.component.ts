import { Component } from '@angular/core';

@Component({
  template: `
    <h2>{{title}}</h2>
    <p>{{descr}}</p>
  `
})

export class PageNotFoundComponent {
  title = 'Page not found.';
  descr = 'The page You are looking for doesn\'t exist.';
}
