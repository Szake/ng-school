import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {templateJitUrl} from "@angular/compiler";


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: [ './pagination.component.scss' ]
})

export class PaginationComponent implements OnInit {
  @Input('pages') pages = [];
  @Input('active') current = 1;
  @Output() toPage = new EventEmitter<number>();


  constructor() {}


  ngOnInit() {}

  goToPage(i) {
    const page = i + 1;
    this.toPage.emit(page);
  }
}
