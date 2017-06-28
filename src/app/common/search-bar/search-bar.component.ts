import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: [ './search-bar.component.scss' ]
})
export class SearchBarComponent {
  @Input() length = 0;
  @Output() query = new EventEmitter<string>();

  constructor() {}

  searchBy(value: string) {
    this.query.emit(value);
  }
}
