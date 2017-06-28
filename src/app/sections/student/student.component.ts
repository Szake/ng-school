import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ClassService } from '../../services/class.service';
import { StudentService } from '../../services/student.service';
import { Class } from '../../models/class';
import { Student } from '../../models/student';

import { titleIn, breadcrumbsIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: './student.component.html',
  styleUrls: [ './student.component.scss' ],
  animations: [ titleIn, breadcrumbsIn, contentIn ]
})

export class StudentComponent implements OnInit {
  title = 'Student';
  student: Student = {
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
    private studentService: StudentService
  ) {}

  ngOnInit() {
    this.route.params.switchMap((params: Params) => {
      return this.studentService.getOne(+params['id']);
    }).subscribe((student: Student) => {
      this.student = student;

      if (student.classId !== null) {
        this.classService.getOne(student.classId).then((group: Class) => {
          this.group = group;
        });
      }
    });
  }

  goToClass(): void {
    this.router.navigate(['/class', this.group._id]);
  }
}
