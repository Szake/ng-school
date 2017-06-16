import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';
import { Class } from '../../models/class';
import { Teacher } from '../../models/teacher';

import { titleIn, breadcrumbsIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: './teacher.component.html',
  styleUrls: [ './teacher.component.css' ],
  animations: [ titleIn, breadcrumbsIn, contentIn ]
})

export class TeacherComponent implements OnInit {
  title = 'Teacher';
  teacher: Teacher = {
    _id: null,
    firstName: 'No first name',
    lastName: 'No last name',
    middleName: 'No middle name',
    birthday: new Date(0),
    classId: null,
    other: 'No description'
  };
  group: Class;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private classService: ClassService,
    private teacherService: TeacherService
  ) {}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      return this.teacherService.getOne(+params['id']);
    }).subscribe((teacher: Teacher) => {
      this.teacher = teacher;

      if (teacher.classId !== null) {
        this.classService.getOne(teacher.classId).then((group: Class) => {
          this.group = group;
        });
      }
    });
  }

  goToClass(): void {
    this.router.navigate(['/class', this.group._id]);
  }
}
