import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-footer-controls',
  templateUrl: './controls.component.html',
  styleUrls: [ './controls.component.scss' ]
})

export class FooterControlsComponent {

  constructor(
    private router: Router,
    private location: Location
  ) {}

  // Methods:
  goBack(): void {
    this.location.back();
  }
  goHome(): void {
    this.router.navigate(['/dashboard']);
  }
}
