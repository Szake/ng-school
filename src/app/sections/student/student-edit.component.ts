import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import 'rxjs/add/operator/switchMap';

import { ClassService } from '../../services/class.service';
import { TeacherService } from '../../services/teacher.service';
import { StudentService } from '../../services/student.service';

import { StudentEntity } from '../../models/student-constructor';

import { Class } from '../../models/class';
import { Teacher } from '../../models/teacher';
import { Student } from '../../models/student';

import { titleIn, contentIn } from '../../animations/content';


@Component({
  templateUrl: './student-form.component.html',
  styleUrls: [ './student.component.css' ],
  animations: [ titleIn, contentIn ]
})

export class StudentEditComponent implements OnInit {
  title = 'Edit the student';
  student = new StudentEntity(null, '', '', '', null, null, '');
  groups: Class[];
  load = 'out';

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
      if (typeof student === 'undefined') {
        this.router.navigate(['/students']);
      }
      this.student = { ...student };
      this.load = 'in';
    });

    this.classService.getAll().then(data => {
      this.groups = data;
    });
  }

  // String result:
  get diagnostic() { return JSON.stringify(this.student); }

  // Push the new student to the store:
  submitForm() {
    const edited_student = { ...this.student };
    this.studentService.editOne(edited_student).then(result => {
      this.classService.addStudent(edited_student).then(result => {
        this.router.navigate(['/students']);
      });
    });
  }
}
