import { Component, Input, OnInit } from '@angular/core';

import { slideState } from '../../animations/slider';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: [ './slider.component.scss' ],
  animations: [ slideState ]
})

export class SliderComponent implements OnInit {
  @Input() data;
  @Input() type;

  slides;
  animation; direction;
  active_slide; active_index;

  constructor() {}

  ngOnInit() {
    this.slides = this.data || [];
    this.animation = ['move', 'fade'].indexOf(this.type) !== -1 ? this.type : 'move';
    this.direction = 'next'; // 'next' or 'prev'
    this.active_slide = this.slides[0];
    this.active_index = 0;
  }

  // Controls:
  toPrev() {
    let index = this.slides.indexOf(this.active_slide);

    if (index === 0) { index = this.slides.length - 1; }
    else if (index === -1) { index = 0; }
    else { index--; }

    this.direction = 'prev';
    this.active_index = index;
    this.active_slide = this.slides[index];
  }
  toNext() {
    let index = this.slides.indexOf(this.active_slide);

    if (index === this.slides.length - 1) { index = 0; }
    else if (index === -1) { index = this.slides.length - 1; }
    else { index++; }

    this.direction = 'next';
    this.active_index = index;
    this.active_slide = this.slides[index];
  }
  toSlide(slide, index) {
    if (this.active_slide === slide) { return; }

    this.direction = this.active_index > index ? 'prev' : 'next';
    this.active_index = index;
    this.active_slide = slide;
  }
}
