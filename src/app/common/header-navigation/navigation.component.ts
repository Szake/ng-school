import { Component, OnInit } from '@angular/core';
import { ClassService } from '../../services/class.service';
import { Class } from '../../models/class';

@Component({
  selector: 'app-header-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: [ './navigation.component.css' ]
})

export class HeaderNavigationComponent implements OnInit {
  classes = 0;

  constructor(
    private classService: ClassService
  ) {}

  ngOnInit() {
    this.classService.getClasses().subscribe(list => {
      console.log('asdasda');
      this.classes = list.length;
    });
  }
}
